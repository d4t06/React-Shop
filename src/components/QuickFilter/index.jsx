import { useMemo } from "react";

import classNames from "classnames/bind";
import styles from "./BrandSort.module.scss";

import BrandList from "./BrandList";
import SelectedSort from "./SelectedSort";
import { brand } from "../../assets/data/brands";

import { useDispatch, useSelector } from "react-redux";
import { selectedAllProduct, selectedAllFilter, fetchProducts, storingFilters } from "../../store";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

export default function QuickFilter() {
   const dispatchRedux = useDispatch();
   const { page, count, status } = useSelector(selectedAllProduct);
   const { filters: filtersInStore, sort } = useSelector(selectedAllFilter);

   // use hooks
   const { category } = useParams();

   const isFiltered = useMemo(
      () => !!filtersInStore?.brand.length || !!filtersInStore?.price.length,
      [filtersInStore]
   );

   const showFilteredResults = (filters) => {
      dispatchRedux(fetchProducts({ page, sort, category, filters: filters }));
   };

   const handleFilter = (filters, by) => {
      let newFilters = { ...filtersInStore };

      if (by === "clear") {
         newFilters.brand = [];
         newFilters.price = [];
      } else {
         newFilters[by] = filters;
      }

      // >>> api
      showFilteredResults(newFilters);
      // >>> local
      dispatchRedux(storingFilters({ sort, filters: newFilters }));
   };

   return (
      <>
         <div className={cx("brand-sort")}>
            {category === "dtdd" ? (
               <h1>
                  Điện thoại {`( `}
                  <span style={{ color: "#cd1818" }}>{status === "successful" &&  count}</span>
                  {` )`} sản phẩm
               </h1>
            ) : (
               <h1>
                  Laptop {`( `}
                  <span style={{ color: "#cd1818" }}>{status === "successful" &&  count}</span>
                  {` )`} sản phẩm
               </h1>
            )}
            <div className={cx("container", { disable: status === "loading" })}>
               {isFiltered ? (
                  <SelectedSort
                     category={category}
                     data={filtersInStore}
                     handleFilter={(filter, by) => handleFilter(filter, by)}
                  />
               ) : (
                  <BrandList
                     category={category}
                     data={brand[category]}
                     handleFilter={(filter, by) => handleFilter(filter, by)}
                  />
               )}
            </div>
         </div>
      </>
   );
}
