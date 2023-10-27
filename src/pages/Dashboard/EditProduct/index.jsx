import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "../../Login/Login.module.scss";
import stylesMain from "../AddProduct/AddProduct.module.scss";

import {publicRequest} from "@/utils/request";
import {moneyFormat} from "@/utils/appHelper";
import InfoItem from "../AddProduct/child/InfoItem";
import { ProductItem } from "@/components";
import usePrivateRequest from "@/hooks/usePrivateRequest";

const cx = classNames.bind(styles);
const cy = classNames.bind(stylesMain);

function EditProduct() {
  const { href } = useParams();
  const nameRef = useRef("");
  const [feature, setFeature] = useState("");
  const [isContainText, setIsContainText] = useState(false);

  const [inputFiels, setInputFields] = useState({
    name: "",
    brand: "",
    category: "",
    image: "",
    image_path: "",
    old_price: "",
    cur_price: "",
    features: [],
    quantity: "",
  });

  useEffect(() => {
    const fetch = async () => {
      const response = await publicRequest.get(`/admin/products/${href}`);

      const productInfo = response.data[0];

      handleFeaturesToArr(productInfo);
      setInputFields({ ...productInfo });
    };
    // fetch();
  }, []);

  const handleInput = (field, value) => {
    setInputFields({ ...inputFiels, [field]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    handleInput("image", file);
  }

  const handleFeaturesToArr = (productInfo) => {
    const string = productInfo.features;
    if (!string) {
      return (productInfo.features = []);
    }
    const features = string.substring(0, string.length - 5).split("*and*");

    console.log(features);
  };

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
    handleInput("features", [...inputFiels.features, feature]);
    setFeature("");
  };

  const handleDelete = (id) => {
    const newFeatures = [...inputFiels.features];
    newFeatures.splice(id, 1);
    handleInput("features", newFeatures);
  };

  const handleData = () => {
    const productInfo = {
      name: inputFiels.name,
      category: inputFiels.category,
      brand: inputFiels.brand,
      image: inputFiels.image,
      old_price: +inputFiels.cur_price,
      cur_price: +inputFiels.old_price,
      quantity: +inputFiels.quantity,
    };

    let featureText = "";
    inputFiels?.features.map((item) => {
      if (!item) return;
      featureText += item + "*and*";
    });

    let href = inputFiels.name.toLowerCase().replaceAll(" ", "-");
    productInfo["href"] = href;
    productInfo["image_path"] = `http://localhost:3000/uploads/${href}.jpg`;

    productInfo["feature"] = featureText;

    return productInfo;
  };

  const handleMoney = (string) => {
    return string.replaceAll(",", "");
  };

  const privateRequest = usePrivateRequest();


  const handleUploadImages = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", inputFiels.image)
    
    try {
      const controller = new AbortController();
      await privateRequest.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        signal: controller.signal,
      });

      return () => {
        controller.abort();
      };
    } catch (error) {
      console.log({ message: error });
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productInfo = handleData();
    const formData = new FormData();
    formData.append("name", productInfo.name);
    formData.append("href", productInfo.href);
    formData.append("image_path", productInfo.image_path);
    formData.append("brand", productInfo.brand);
    formData.append("category", productInfo.category);
    formData.append("old_price", productInfo.old_price);
    formData.append("feature", productInfo.feature);
    formData.append("cur_price", productInfo.cur_price);
    formData.append("quantity", productInfo.quantity);

    console.log("formdata = ", formData.values);

    try {
      const controller = new AbortController();
      await privateRequest.post("/admin/products/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        signal: controller.signal,
      });

      return () => {
        controller.abort();
      };
    } catch (error) {
      console.log({ message: error });
    }
  };

  console.log(inputFiels.image_path);
  return (
    <>
      <h1 className={cy("title")}>Sửa sản phẩm</h1>
      <div className="row">
        <div className="col col-half">
          <div className={cy("form-wrapper")}>
            <form
              className={cx("form", "mt-15")}
              onSubmit={(e) => handleSubmit(e)}
            >
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
              <form onSubmit={(e) => handleUploadImages(e)} className={cx("form-group")}>
                <label htmlFor="">Ảnh</label>
                {inputFiels?.image_path ? (
                  <div className={cy("image-wrapper")}>
                    <div className={cy("image-frame")}>
                      <img src={inputFiels.image_path} alt="" />
                    </div>
                    <button
                      onClick={(e) => handleInput("image_path", "")}
                      className={cy("add-info-btn", "change-image-btn")}
                    >
                      Xóa
                    </button>
                  </div>
                ) : (
                  <input
                    files={inputFiels.image}
                    name="image"
                    onChange={(e) => handleImage(e)}
                    type="file"
                  />
                )}
              </form>
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
                <button
                  onClick={(e) => handleFeatures(e)}
                  className={cy("add-info-btn")}
                >
                  Thêm
                </button>
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
            {inputFiels.name && <ProductItem preview data={inputFiels} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
