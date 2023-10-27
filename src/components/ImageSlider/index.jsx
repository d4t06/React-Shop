import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from "./ImageSlider.module.scss";
import useSlider from "@/hooks/useSlider";

const cx = classNames.bind(styles);

function ImageSlider({ banner, data }) {
  const imageSliderRef = useRef();

  // use hooks
  const { images, attributeObj, curIndex, nextImage, previousImage } = useSlider({
    imageSliderRef,
    data,
    autoSlide: 6000
  });


  const classes = cx("image-slider", {
    banner,
  });

  return (
    <div
      className={cx("image-slider-frame")}
      {...attributeObj}
    >
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
        {images.length ? (
          images.map((item, index) => {
            return (
              <div key={index} className={cx("slider-item")}>
                <img src={item} alt="" />
              </div>
            );
          })
        ) : (
          <h2>Data is not array</h2>
        )}
      </div>
    </div>
  );
}

export default ImageSlider;
