import { useEffect, useRef, useState } from "react";

export default function useSlider({ data, imageSliderRef, curIndex, isEnter }) {
   const [images, setImages] = useState([]);

   const [imageWidth, setImageWidth] = useState(0);
   const [maxScroll, setMaxScroll] = useState(0);
   const prevScrollRef = useRef(0);

   useEffect(() => {
      const sliderEle = imageSliderRef.current;
      const width = Math.ceil(sliderEle.clientWidth);

      sliderEle.style.width = `${width}px`
      const imageArr = data.slice(0, data.length - 5).split("*and*");

      setImages(imageArr);
      setMaxScroll(width * (imageArr.length - 1));
      setImageWidth(width);
   }, []);

   useEffect(() => {
      const sliderEle = imageSliderRef.current;

      const needToScroll = (curIndex - 1) * imageWidth;
      sliderEle.scrollLeft = needToScroll;
      prevScrollRef.current = needToScroll;
   }, [curIndex, imageWidth]);

   // useEffect(() => {
   //    if (isEnter) return;
   //    const id = setInterval(() => {
   //       nextImage();
   //    }, 10000);

   //    return () => clearInterval(id);
   // }, [isEnter]);

   return {
      images,
      imageWidth,
      maxScroll,
      curIndex,
      prevScrollRef,
   };
}
