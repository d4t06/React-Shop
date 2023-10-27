import classNames from "classnames/bind";
import styles from "../ProductFilter.module.scss";

const cx = classNames.bind(styles);

export default function Checkbox({ handleFilter, data, filters }) {

   const handleToggle = (value) => {
      let newBrands = [...filters.brand];

      if (!value) newBrands = [];
      else {
         const index = newBrands.indexOf(value);

         if (index === -1) newBrands.push(value);
         else newBrands.splice(index, 1);
      }

      handleFilter(newBrands);
   };

   return (
      <>
         {data &&
            data.map((item, index) => {
               const isChecked =
                  filters.brand.indexOf(item.href) !== -1 || (!item.href && !filters.brand.length);
               return (
                  <div key={index} className={cx("filter-item")}>
                     <a to={"/ddtd"}>
                        <input
                           id={item.text}
                           type="checkbox"
                           checked={isChecked}
                           onChange={() => handleToggle(item.href)}
                        />
                        <label htmlFor={item.text} className={cx("label")}>
                           {item.text}
                        </label>
                     </a>
                  </div>
               );
            })}
      </>
   );
}
