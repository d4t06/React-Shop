import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import moneyFormat from "../../utils/moneyFormat.js";
import { routes } from "@/routes";

const cx = classNames.bind(styles);
export default function ProductItem({ data, preview }) {
   return (
      <div className={cx("product-item")}>
         {/* preview in dashboard */}
         {preview ? (
            <div className={cx("product-item-frame")}>
               <img
                  className={cx("product-item-image")}
                  src={data.image_url || "https://placehold.co/300X400"}
               />
            </div>
         ) : (
            <Link to={`${routes.HOME}/${data.category_name}/${data.product_id}`} className={cx("product-item-frame")}>
               <img
                  className={cx("product-item-image")}
                  src={data.image_url || "https://placehold.co/300X400"}
               />
            </Link>
         )}
         {data.installment && (
            <div className={cx("product-item-installment")}>
               <span>Trả góp 0%</span>
            </div>
         )}
         <div className={cx("product-item-body")}>
            <h4 className={cx("product-item_name")}>{data.name || "Example"}</h4>
            <div className={cx("product-item_price")}>
               <div className={cx("price-top")}>
                  {data.old_price && data.old_price > data.cur_price && (
                     <>
                        <span className={cx("product-item_price--old")}>
                           {data.old_price && moneyFormat(data.old_price) + "₫"}
                        </span>
                        <span className={cx("discount-percent")}>
                           -
                           {(((data.old_price - data.cur_price) / data.old_price) * 100).toFixed(0)}
                           %
                        </span>
                     </>
                  )}
               </div>

               <h1 className={cx("product-item_price--current")}>
                  {data.cur_price ? moneyFormat(data.cur_price) : moneyFormat("12345")}₫
               </h1>
            </div>
         </div>
      </div>
   );
}
