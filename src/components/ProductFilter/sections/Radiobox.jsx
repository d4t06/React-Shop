import classNames from "classnames/bind";
import styles from "../ProductFilter.module.scss";
const cx = classNames.bind(styles);

export default function Radiobox({ handleFilter, data, filters }) {
   
   const handleToggle = (array) => {
      if (JSON.stringify(array) === JSON.stringify(filters.price)) return;
      handleFilter(array);
   };

   return (
      <>
         {data.map((item, index) => {
            const isChecked =
               JSON.stringify(filters.price) === JSON.stringify(item.array) ? true : false;
            return (
               <div key={index} className={cx("filter-item")}>
                  <a to={"/ddtd"}>
                     <input
                        type="radio"
                        id={item.text + index}
                        checked={isChecked}
                        onChange={(e) => handleToggle(item.array, e)}
                     />
                     <label className={cx("label")} htmlFor={item.text + index}>
                        {item.text}
                     </label>
                  </a>
               </div>
            );
         })}
      </>
   );
}
