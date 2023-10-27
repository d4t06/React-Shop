import { useEffect, useRef, useState } from "react";

export default function useSlider({ data, imageSliderRef, autoSlide }) {
  const [images, setImages] = useState([]);
  const [curIndex, setCurIndex] = useState(1);
  const [isEnter, setIsEnter] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDrag, setIsDrag] = useState(false);

  const prevScrollRef = useRef(0);
  const prevPageXRef = useRef(0);
  const scrollRef = useRef();
  const timerId = useRef();

  const handleStartDrag = (e) => {
    e.preventDefault();

    const isFinish = checkIsScrollFinish(curIndex);
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
    const newScrollLeft = prevScrollRef.current - distance;

    const isValid = newScrollLeft > 0 && newScrollLeft < maxScroll;

    if (isValid) {
      const sliderEle = imageSliderRef.current;
      sliderEle.scrollLeft = newScrollLeft;
    }
    scrollRef.current = newScrollLeft;
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

  const checkIsScrollFinish = (curIndex) => {
    const sliderEle = imageSliderRef.current;
    const expectScroll = (curIndex - 1) * imageWidth;

    // console.log(sliderEle.scrollLeft, expectScroll, curIndex);

    return Math.ceil(sliderEle.scrollLeft) === Math.ceil(expectScroll);
  };

  const nextImage = () => {
    const sliderEle = imageSliderRef.current;
    sliderEle.style.scrollBehavior = "smooth";

    setCurIndex((prev) => {
      const isFinish = checkIsScrollFinish(prev);
      if (isFinish) {
        if (prev === images.length) {
          return 1;
        } else {
          return prev + 1;
        }
      } else return prev
    });
  };

  const previousImage = () => {
    const sliderEle = imageSliderRef.current;
    sliderEle.style.scrollBehavior = "smooth";

    const isFinish = checkIsScrollFinish(curIndex);
    if (!isFinish) return;

    if (curIndex === 1) {
      setCurIndex(images.length);
    } else {
      setCurIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const sliderEle = imageSliderRef.current;
    const width = Math.ceil(sliderEle.clientWidth);

    sliderEle.style.width = `${width}px`;
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


  // problem
  useEffect(() => {
    if (isEnter) return;
    if (!autoSlide) return;
    if (!images.length) return;

    timerId.current = setInterval(() => {
      console.log("auto slide");
      nextImage();
    }, autoSlide);

    return () => {
      if (timerId.current) {
        console.log("clear");
        clearInterval(timerId.current);
      }
    };
  }, [isEnter]);

  const attributeObj = {
    onMouseDown: (e) => handleStartDrag(e),
    onMouseUp: (e) => handleStopDrag(e),
    onMouseMove: (e) => handleDrag(e),
    onMouseEnter: () => setIsEnter(true),
    onMouseLeave: () => handleMouseLeave(),
  };

  return {
    attributeObj,
    nextImage,
    previousImage,
    images,
    curIndex,
  };
}
