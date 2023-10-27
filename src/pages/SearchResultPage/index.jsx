import classNames from "classnames/bind";
import styles from "../Products/Products.module.scss";
import { Button, ProductItem } from "../../components";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectedAllProduct, selectedAllFilter, getMoreProducts } from "../../store";

import ProductSort from "../../components/ProductSort";
import NoProduct from "../Products/NoProduct";
import ProductSkeleton from "@/components/Skeleton/ProductSkeleton";

const cx = classNames.bind(styles);

function SearchResultPage() {
   const dispatchRedux = useDispatch();
   const { sort, filters } = useSelector(selectedAllFilter);
   const { products, page, category, status, count, pageSize } = useSelector(selectedAllProduct);

   // state
   const [isLoading, setIsLoading] = useState(false);

   // use hooks
   let { key } = useParams();

   const remaining = useMemo(() => count - products.length, [products]);

   const renderProducts = () => {
      return products.map((product, index) => {
         return (
            <div key={index} className={cx("col col-3")}>
               <ProductItem key={index} data={product} />
            </div>
         );
      });
   };

   const renderSkeletons = () => {
      return [...Array(8).keys()].map((index) => {
         return (
            <div key={index} className={cx("col col-3")}>
               <ProductSkeleton />
            </div>
         );
      });
   };

   const handleGetMore = () => {
      // dùng extra reducer thay vì dùng action
      dispatchRedux(getMoreProducts({ category, sort, page: page + 1, filters }));
   };

   useEffect(() => {
      setIsLoading(true);
      dispatchRedux(fetchProducts({ category: `search=${key}`, sort, filters }));
   }, [key]);

   return (
      <div className={cx("product-container")}>
         <div className={cx("product-body", "row")}>
            <div className="col col-full">
               {!isLoading ? (
                  <h1 className={cx("search-page-title")}>
                     Tìm thấy <span style={{ color: "#cd1818" }}>{products?.count || 0}</span> kết
                     quả cho từ khóa "{key}"
                  </h1>
               ) : (
                  <h1>Kết quả tìm kiếm cho từ khóa "{key}"</h1>
               )}

               {isLoading && <i className={cx("material-icons", "loading-btn", "mt-10")}></i>}

               <ProductSort />
               <div className="products-container">
                  <div className="row">
                     {status !== "loading" && (
                        <>{!!products.length ? renderProducts() : <NoProduct />}</>
                     )}
                     {(status === "loading" || status === "more-loading") && renderSkeletons()}
                  </div>
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
         {!products.length && status !== "loading" && <NoProduct />}
      </div>
   );
}
export default SearchResultPage;
