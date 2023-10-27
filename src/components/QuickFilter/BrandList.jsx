import classNames from "classnames/bind";
import styles from "./BrandSort.module.scss";

import { useState } from "react";
// import useStore from '../../hooks/useStore';
// import {getAll} from '../../store/actions'

const cx = classNames.bind(styles);

function DemandItem({ data, handleFilter }) {
   const [checked, setChecked] = useState();

   const handleToggle = (string) => {
      setChecked(string);
      handleFilter([string], "brand");
   };

   if (!data) return;

   return (
      <>
         {data.map((item, index) => {
            if (!item.image) return;
            return (
               <div
                  key={index}
                  className={cx("sort-item", checked === item.href ? "active" : "")}
                  onClick={() => handleToggle(item.href)}
               >
                  <img src={item.image} alt="" />
               </div>
            );
         })}
      </>
   );
}

export default DemandItem;
