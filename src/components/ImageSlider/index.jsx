import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from "./ImageSlider.module.scss";
import useSlider from "@/hooks/useSlider";

const cx = classNames.bind(styles);

function ImageSlider({ banner, data }) {
   const [isDrag, setIsDrag] = useState(false);
   const [curIndex, setCurIndex] = useState(1);
   const [isEnter, setIsEnter] = useState(false);

   const imageSliderRef = useRef();
   const scrollRef = useRef(0);
   const prevPageXRef = useRef(0);

   // use hooks
   const { imageWidth, images, maxScroll, prevScrollRef } = useSlider({
      imageSliderRef,
      data,
      curIndex,
      isEnter,
   });

   const handleStartDrag = (e) => {
      e.preventDefault();

      const isFinish = checkIsScrollFinish();
      if (!isFinish) return;

      setIsDrag(true);

      prevPageXRef.current = e.pageX;
      imageSliderRef.current.style.scrollBehavior = "auto";
   };

   const getNewIndex = () => {
      let newIndex = curIndex;
      const distance = scrollRef.current - prevScrollRef.current;
      const minimum = imageWidth / 4;

      console.log("check distance", distance);

      if (distance > 0) {
         if (newIndex === images.length) newIndex -= 1;
         else if (Math.abs(distance) > minimum) newIndex += 1;
      } else if (distance < 0) {
         if (newIndex === 1) newIndex += 1;
         else if (Math.abs(distance) > minimum) newIndex -= 1;
      }

      return newIndex;
   };

   const handleMouseLeave = () => {
      setIsEnter(false);
      if (isDrag) handleStopDrag();
   };

   const handleDrag = (e) => {
      if (!isDrag) return;

      setIsDrag(true);
      const distance = e.pageX - prevPageXRef.current;
      let newScroll = prevScrollRef.current - distance;

      const isValid = newScroll > 0 && newScroll < maxScroll;

      if (isValid) {
         imageSliderRef.current.scrollLeft = newScroll;
         scrollRef.current = newScroll;
      }
   };

   const handleStopDrag = () => {
      if (!isDrag) return;
      setIsDrag(false);

      if (scrollRef.current === prevScrollRef.current) return;
      if (scrollRef.current === 0 || scrollRef.current === maxScroll) return;

      const sliderEle = imageSliderRef.current;
      sliderEle.style.scrollBehavior = "smooth";

      const newIndex = getNewIndex();
      if (newIndex === curIndex) {
         sliderEle.scrollLeft = prevScrollRef.current;
      } else {
         setCurIndex(newIndex);
      }

      scrollRef.current = 0;
   };

   const checkIsScrollFinish = () => {
      const sliderEle = imageSliderRef.current;
      const expectScroll = (curIndex - 1) * imageWidth;

      return Math.ceil(sliderEle.scrollLeft) === Math.ceil(expectScroll);
   };

   const nextImage = () => {
      const sliderEle = imageSliderRef.current;
      sliderEle.style.scrollBehavior = "smooth";

      const isFinish = checkIsScrollFinish();
      if (!isFinish) return;

      if (curIndex === images.length) {
         setCurIndex(1);
      } else {
         setCurIndex((prev) => prev + 1);
      }
   };

   const previousImage = () => {
      const sliderEle = imageSliderRef.current;
      sliderEle.style.scrollBehavior = "smooth";

      const isFinish = checkIsScrollFinish();
      if (!isFinish) return;

      if (curIndex === 1) {
         setCurIndex(images.length);
      } else {
         setCurIndex((prev) => prev - 1);
      }
   };

   const classes = cx("image-slider", {
      banner,
   });

   return (
      <div
         className={cx("image-slider-frame")}
         onMouseDown={(e) => handleStartDrag(e)}
         onMouseUp={(e) => handleStopDrag(e)}
         onMouseMove={(e) => handleDrag(e)}
         onMouseEnter={() => setIsEnter(true)}
         onMouseLeave={() => handleMouseLeave()}
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
