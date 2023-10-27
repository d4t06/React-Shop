import classNames from "classnames/bind";
import styles from "./BrandSort.module.scss";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { price } from "../../assets/data";
import { useMemo } from "react";

const cx = classNames.bind(styles);

export default function SelectedSort({ category, data, handleFilter }) {
   const handleToggle = (value) => {
      let newChecked = [...data.brand];

      newChecked = newChecked.filter((brand) => brand !== value);
      handleFilter(newChecked, "brand");
   };

   const priceContent =
      price[category] &&
      price[category].find((item) => JSON.stringify(item.array) === JSON.stringify(data.price));

   const isShowClear = useMemo(
      () => (!!data.brand.length && !!data.price.length) || data.brand.length >= 2,
      [data]
   );

   return (
      <>
         <h2>Bộ lọc:</h2>
         {data.brand &&
            data?.brand?.map((item, index) => {
               return (
                  <div onClick={() => handleToggle(item)} className={cx("filter-item")} key={index}>
                     <p>{item}</p>
                     <i className="material-icons">delete</i>
                  </div>
               );
            })}
         {!!data.price.length && (
            <span onClick={() => handleFilter("", "price")} className={cx("filter-item")}>
               {priceContent.text || ""}
               <i className="material-icons">delete</i>
            </span>
         )}
         {isShowClear && (
            <button className={cx("clear-filter")} onClick={() => handleFilter("", "clear")}>
               <span>
                  <RiDeleteBack2Fill />
               </span>
            </button>
         )}
      </>
   );
}
