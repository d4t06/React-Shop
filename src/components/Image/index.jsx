import { useEffect, useRef, useState } from "react";
import Skeleton from "../Skeleton";
import classNames from "classnames/bind";

import styles from '@/components/Skeleton/Skeleton.module.scss'
const cx = classNames.bind(styles)

export default function Image({ src, classNames, onError }) {
   const [imageLoaded, setImageLoaded] = useState(false);
   const imageRef = useRef(null);

   const handleLoadImage = async() => {
      setImageLoaded(true);
      imageRef.current.style.display = 'block'
      
      if (!src) return;
      if (src?.includes("blob")) {
         console.log("revoke");
         URL.revokeObjectURL(src);
      }
   };

   const defaultHandleError = () => {
      const imageEle = imageRef.current;
      imageEle.src = "https://placehold.co/100";
      setImageLoaded(true);
   };

   const handleError = () => {
      !!onError ? [onError(), defaultHandleError()] : defaultHandleError();
   };

   useEffect(() => {
      // if no have image (use default placeholder png)
      if (!src) {
         defaultHandleError();
         return;
      }

      const imageEle = imageRef.current;

      if (imageEle) {
         imageEle.addEventListener("load", handleLoadImage);
         imageEle.addEventListener("error", handleError);
      }

      return () => {
         if (imageEle) {
            imageEle.removeEventListener("load", handleLoadImage);
            imageEle.removeEventListener("error", handleError);
         }
      };
   }, []);

   const className = cx(classNames)
   return (
      <>
         {!imageLoaded && <Skeleton className={cx("slider-image-skeleton")} />}
         <img
         style={{display: "none"}}
            className={className}
            src={src || "https://placehold.co/100"}
            ref={imageRef}
            onLoad={() => handleLoadImage()}
         />
      </>
   );
}
