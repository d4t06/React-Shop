import { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";

import {moneyFormat} from "@/utils/appHelper";
import InfoItem from "./child/InfoItem";
import {Button, ProductItem, Gallery, Modal} from "@/components";
import usePrivateRequest from "@/hooks/usePrivateRequest";

import classNames from "classnames/bind";
import styles from "../../Login/Login.module.scss";
import stylesMain from "./AddProduct.module.scss";
const cx = classNames.bind(styles);
const cy = classNames.bind(stylesMain);

function AddProduct() {
  const [inputFiels, setInputFields] = useState({
    name: "",
    brand: "",
    category: "",
    old_price: "",
    cur_price: "",
    features: [],
    quantity: "",
    image_path: "",
    featureText: "",
  });
  const nameRef = useRef("");
  const [feature, setFeature] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isContainText, setIsContainText] = useState(false);
  const privateRequest = usePrivateRequest();

  const handleInput = (field, value) => {
    setInputFields({ ...inputFiels, [field]: value });
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(inputFiels.image_path);
    };
  }, [inputFiels.image_path]);

  const checkContainText = (e) => {
    if (e.key == "Backspace") {
      setIsContainText(false);
      return;
    }
    if (e.key >= "A" && e.key <= "z") {
      setIsContainText(true);
      return;
    }
    setIsContainText(false);
  };

  const handleFeatures = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!feature) return;
    const features = [...inputFiels.features, feature];

    let featureText = "";
    features.map((item) => {
      if (!item) return;
      featureText += item + "*and*";
    });

    setInputFields({ ...inputFiels, features, featureText });
    setFeature("");
  };

  const handleDelete = (id) => {
    const newFeatures = [...inputFiels.features];
    newFeatures.splice(id, 1);

    setInputFields({ ...inputFiels, features: newFeatures });
  };

  const handleMoney = (string) => {
    return string.replaceAll(",", "");
  };

  const handleData = () => {
    const productInfo = {
      name: inputFiels.name,
      category: inputFiels.category,
      brand: inputFiels.brand,
      image_path: inputFiels.image_path,
      old_price: +inputFiels.cur_price,
      cur_price: +inputFiels.old_price,
      quantity: +inputFiels.quantity,
    };

    let featureText = "";
    inputFiels.features.map((item) => {
      if (!item) return;
      featureText += item + "*and*";
    });

    let href = inputFiels.name.toLowerCase().replaceAll(" ", "-");
    productInfo["href"] = href;
    productInfo["feature"] = featureText;
  

    return productInfo;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("add product submit");

    const productInfo = handleData();

    try {
      const controller = new AbortController();
      await privateRequest.post("/admin/products", productInfo, {
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      return () => {
        controller.abort();
      };
    } catch (error) {
      console.log({ message: error });
    }
  };
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <>
      <h1 className={cy("title")}>Thêm sản phẩm</h1>
      <div className="row">
        <div className="col col-half">
          <div className={cy("form-wrapper")}>
            <form className={cx("form")} onSubmit={(e) => handleSubmit(e)}>
              <div className={cx("form-group")}>
                <label htmlFor="">Tên sản phẩm</label>
                <input
                  ref={nameRef}
                  name="name"
                  type="text"
                  value={inputFiels.name}
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                />
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="">Hãng sản xuất</label>
                <select
                  name="brand"
                  value={inputFiels.brand}
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                >
                  <option value="">- - -</option>
                  <option value="iphone">Apple</option>
                  <option value="samsung">Samsung</option>
                  <option value="xiaomi">Xiaomi</option>
                  <option value="sony">Sony</option>
                  <option value="nokia">Nokia</option>
                  <option value="realme">Realme</option>
                </select>
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="">Danh mục</label>
                <select
                  name="category"
                  value={inputFiels.category}
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                >
                  <option value="">- - -</option>
                  <option value="dtdd">Điện thoại</option>
                  <option value="laptop">Laptop</option>
                  <option value="phukien">Phụ kiện</option>
                </select>
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="">Ảnh</label>
                {inputFiels.image_path ? (
                  <>
                    <div className={cy("image-frame", "preview-image-frame")}>
                      <img src={inputFiels.image_path} alt="" />
                    </div>
                    <div className="row">
                      <Button
                        fill
                        rounded
                        className={cy("preview-image-btn")}
                        onClick={(e) => {
                          e.preventDefault();
                          handleInput("image_path", "");
                        }}
                      >
                        Xóa
                      </Button>
                      <Button
                        fill
                        rounded
                        className={cy("preview-image-btn")}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowModal(true);
                        }}
                      >
                        Thay
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button
                    half
                    fill
                    rounded
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(true);
                    }}
                  >
                    Chọn ảnh
                  </Button>
                )}
              </div>

              <div className={cx("form-group")}>
                <label htmlFor="">Tính năng nổi bật</label>
                <div className={cy("info-item-container")}>
                  <InfoItem
                    handleDelete={handleDelete}
                    data={inputFiels.features}
                  />
                </div>
                <input
                  value={feature}
                  name="feature"
                  onChange={(e) => setFeature(e.target.value)}
                  type="text"
                />
                <Button half fill rounded onClick={(e) => handleFeatures(e)}>
                  Thêm
                </Button>
              </div>
              <div className="row">
                <div className="col col-half">
                  <div className={cx("form-group")}>
                    <label htmlFor="">Giá cũ</label>

                    <input
                      name="old_price"
                      value={moneyFormat(inputFiels.old_price)}
                      onKeyDown={(e) => {
                        checkContainText(e);
                      }}
                      onChange={(e) => {
                        if (isContainText) return;
                        handleInput(e.target.name, handleMoney(e.target.value));
                      }}
                      type="text"
                      placeholder="₫"
                    />
                  </div>
                </div>
                <div className="col col-half">
                  <div className={cx("form-group")}>
                    <label htmlFor="">Giá mới</label>
                    <input
                      name="cur_price"
                      value={moneyFormat(inputFiels.cur_price)}
                      onKeyDown={(e) => {
                        checkContainText(e);
                      }}
                      onChange={(e) => {
                        if (isContainText) return;
                        handleInput(e.target.name, handleMoney(e.target.value));
                      }}
                      type="text"
                      placeholder="₫"
                    />
                  </div>
                </div>
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="">Số lượng</label>
                <input
                  name="quantity"
                  value={inputFiels.quantity}
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                  type="number"
                />
              </div>
              <button className={cx("submit-btn", "mt-15")} type="submit">
                Tạo mới
              </button>
            </form>
          </div>
        </div>
        <div className="col col-half">
          <div className={cy("row", "preview-container")}>
            <ProductItem preview data={inputFiels} />
          </div>
        </div>
      </div>

      {showModal && ReactDom.createPortal(
        <>
        <Modal setShowModal={setShowModal}>
          <Gallery
            handleInput={(path) => {
              handleInput("image_path", path);
              setShowModal(false);
            }}
          />
        </Modal>
        </>, document.getElementById("portal")
      )}
    </>
  );
}

export default AddProduct;
