import classNames from "classnames/bind";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ImageSlider.module.scss";
import useSlider from "@/hooks/useSlider";
import Image from "../Image";

const cx = classNames.bind(styles);

function ImageSlider({ banner, data }) {
   const imageSliderRef = useRef();

   // use hooks
   const { images, attributeObj, curIndex, nextImage, previousImage, imageWidth } =
      useSlider({
         imageSliderRef,
         data,
      });

   const renderImages = useMemo(() => {
      return images.map((src, index) => {
         return (
            <div key={index} style={{ width: imageWidth }} className={cx("slider-item")}>
               <Image src={src} />
            </div>
         );
      });
   }, [images]);
   const classes = cx("image-slider", {
      banner,
   });

   return (
      <div className={cx("image-slider-frame")} {...attributeObj}>
         <div className={classes} ref={imageSliderRef}>
            <div
               className={cx("left-arrow", "slider-control")}
               onMouseDown={(e) => e.stopPropagation()}
               onClick={previousImage}
            >
               <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div
               className={cx("right-arrow", "slider-control")}
               onMouseDown={(e) => e.stopPropagation()}
               onClick={nextImage}
            >
               <i className="fa-solid fa-chevron-right"></i>
            </div>
            <div className={cx("slider-index")}>
               <span>{curIndex}</span> / <span>{images.length}</span>
            </div>
            {images.length && renderImages}
         </div>
      </div>
   );
}

export default ImageSlider;
