import { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";

import Button from "../../Button";

import styles from "./Gallery.module.scss";
import usePrivateRequest from "../../../hooks/usePrivateRequest";

const cx = classNames.bind(styles);

function Gallery({ handleInput }) {
   const [images, setImages] = useState({});
   const [active, setActive] = useState("");

   const privateRequest = usePrivateRequest();

   const handleChoose = () => {
      handleInput(rows[active].image_path);
   };

   const handleImage = (e) => {
      const imageFile = e.target.files[0];

      handleUploadImages(imageFile);
   };

   const units = ["bytes", "KiB", "MiB"];

   function formatByte(x) {
      let l = 0,
         n = parseInt(x, 10) || 0;

      while (n >= 1024 && ++l) {
         n = n / 1024;
      }

      return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
   }

   const handleUploadImages = async (imageFile) => {
      console.log("upload image");
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
         const controller = new AbortController();

         await privateRequest.post("/images", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            signal: controller.signal,
         });

         getImages();

         return () => {
            controller.abort();
         };
      } catch (error) {
         console.log({ message: error });
      }
   };

   const hanleDeleteImage = async (fileName) => {
      try {
         const controller = new AbortController();

         await privateRequest.get(`/images/delete/${fileName}`, {
            signal: controller.signal,
         });

         getImages();

         return () => {
            controller.abort();
         };
      } catch (error) {
         console.log({ message: error });
      }
   };
   const getImages = async () => {
      console.log("get images");
      const res = await privateRequest.get("/images"); //res.data

      setImages(res.data);
   };

   useEffect(() => {
      getImages();
   }, []);

   const { rows, count } = images;

   return (
      <div className={cx("gallery")}>
         <div className={cx("gallery__top")}>
            <h1>Media</h1>

            <div>
               <Button primary fill rounded>
                  <label htmlFor="input-file">Upload</label>
               </Button>
               <input className={cx("input-file")} id="input-file" type="file" onChange={(e) => handleImage(e)} />
            </div>
         </div>
         <div className={cx("gallery__body")}>
            <div className={cx("row", "container")}>
               <div className="col col-8">
                  <div className="row">
                     {!!rows?.length &&
                        rows?.map((item, index) => {
                           return (
                              <div key={item.image_path} className={cx("col col-3", "gallery-item")}>
                                 <div className={cx("image-frame")}>
                                    <img
                                       className={cx(index === active && "active")}
                                       src={item.image_path}
                                       alt="img"
                                       onClick={() => setActive(index)}
                                    />
                                 </div>
                              </div>
                           );
                        })}
                  </div>
               </div>
               <div className={cx("col col-4", "image-info-container")}>
                  {!!rows?.length && rows[active]?.name && (
                     <div className={cx("image-info")}>
                        <h2>{rows[active].name}</h2>
                        <ul>
                           <li>
                              <h4>Image path:</h4>{" "}
                              <a target="blank" href={rows[active].image_path}>
                                 {rows[active].image_path}
                              </a>
                           </li>
                           <li>
                              <h4>Type:</h4> {rows[active].type}
                           </li>
                           <li>
                              <h4>Size:</h4> {formatByte(rows[active].size)}
                           </li>
                        </ul>
                        <Button fill rounded onClick={() => hanleDeleteImage(rows[active].name)}>
                           Xóa
                        </Button>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <Button
            className={cx("choose-image-btn")}
            disable={active === "" || rows?.length === 0}
            rounded
            fill
            onClick={() => handleChoose()}
         >
            Chọn
         </Button>
      </div>
   );
}

export default Gallery;
