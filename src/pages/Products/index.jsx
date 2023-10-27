import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
   ProductFilter,
   ImageSlider,
   ProductItem,
   QuickFilter,
   Button,
   ProductSort,
} from "../../components";
import NoProduct from "./NoProduct";
import { banner } from "../../assets/data";

import { fetchProducts, selectedAllProduct, getMoreProducts, selectedAllFilter } from "../../store";
import ProductSkeleton from "../../components/Skeleton/ProductSkeleton";

const cx = classNames.bind(styles);

export default function Product() {
   // use store
   const dispatchRedux = useDispatch();
   const { count, page, pageSize, products, status } = useSelector(selectedAllProduct);
   const { filters, sort } = useSelector(selectedAllFilter);

   // ref
   const firstTimeRender = useRef(true);
   const prevCat = useRef("");

   // use hooks
   const { category } = useParams();
   const remaining = useMemo(() => count - products.length, [products]);

   const handleGetMore = () => {
      dispatchRedux(getMoreProducts({ category, sort, filters, page: page + 1 }));
   };

   // <div className={cx("col", searchResultPage ? "col-3" : preview ? "col-9" : "col-4")}>
   //    <ProductItem key={product.name} data={product} />;
   // </div>;

   const renderProducts = () => {
      return products.map((product, index) => {
         return (
            <div key={index} className={cx("col col-4")}>
               <ProductItem data={product} />
            </div>
         );
      });
   };

   const renderSkeletons = () => {
      return [...Array(6).keys()].map((index) => {
         return (
            <div key={index} className={cx("col col-4")}>
               <ProductSkeleton />
            </div>
         );
      });
   };

   useEffect(() => {
      if (firstTimeRender.current || prevCat.current !== category) {
         dispatchRedux(fetchProducts({ category, page: 1, sort, filters }));
      }

      return () => {
         firstTimeRender.current = false;
         prevCat.current = category;
      };
   }, [category]);

   return (
      <div className={cx("product-container")}>
         <ImageSlider banner data={banner[category]} />

         <div className={cx("product-body", "row")}>
            <div className="col col-9">
               <QuickFilter />
               <ProductSort />

               <div className={cx("product-container")}>
                  <div className="row">
                     {status !== "loading" && (
                        <>{!!products.length ? renderProducts() : <NoProduct />}</>
                     )}
                     {(status === "loading" || status === "more-loading") && renderSkeletons()}
                  </div>
                  {status !== "loading" && !!products.length && (
                     <div className={cx("pagination", { disable: remaining === 0 })}>
                        <Button
                           disable={status === "loading" || status === "more-loading"}
                           outline
                           rounded
                           mgauto
                           count={remaining}
                           onClick={() => handleGetMore()}
                           describe="sản phẩm"
                        >
                           Xem thêm
                        </Button>
                     </div>
                  )}
               </div>
            </div>

            <ProductFilter category={category} />
         </div>
      </div>
   );
}
