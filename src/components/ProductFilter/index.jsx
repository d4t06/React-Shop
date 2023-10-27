import { useSelector, useDispatch } from "react-redux";

import { fetchProducts, selectedAllProduct } from "../../store/productsSlice";
import { selectedAllFilter, storingFilters } from "../../store/filtersSlice";

import classNames from "classnames/bind";
import styles from "./ProductFilter.module.scss";

import Checkbox from "./sections/Checkbox";
import Radiobox from "./sections/Radiobox";

import { brand, price } from "../../assets/data";

const cx = classNames.bind(styles);

function ProductFilter({ category }) {
   const dispatch = useDispatch();
   const { sort, filters: filtersInStore } = useSelector(selectedAllFilter);
   const { status } = useSelector(selectedAllProduct);

   const showFilteredResults = (filters) => {
      dispatch(fetchProducts({ page: 1, sort, category, filters }));
   };

   const handleFilter = (filters, by) => {
      let newFilters = { ...filtersInStore };

      // if select all
      // if (!filters) {
      //    newFilters[by] = [];
      // } else {
      // }
      newFilters[by] = filters;

      // >>> api
      showFilteredResults(newFilters);
      // >>> local
      dispatch(storingFilters({ sort, filters: newFilters }));
   };

   return (
      <div className={cx("col", "col-3")}>
         <div className={cx("product-filter", { disable: status === "loading" })}>
            <div className={cx("filter-section")}>
               <h1 className={cx("filter-title")}>Hãng sản xuất</h1>
               <div className={cx("filter-list")}>
                  {/* phai render data lay ra tu checkbox component
                  tại vì mỗi checkbook có một state riêng, state lấy dữ liệu từ nhiều item, nhưng không thể render nhiều checkbox
                  ban đầu render nhiều checkbox
                  fix: chỉ có mỗi checkbox nhưng trong checkbox có nhiều item */}
                  <Checkbox
                     filters={filtersInStore}
                     data={brand[category]}
                     handleFilter={(filters) => handleFilter(filters, "brand")}
                  />
                  {/* truyền handleFilter vào cop Checkbox, chực hiện sau trể về đối số là filter sau đó tt*/}
               </div>
            </div>
            <div className={cx("filter-section")}>
               <h1 className={cx("filter-title")}>Mức giá</h1>
               <div className={cx("filter-list", "price")}>
                  <Radiobox
                     filters={filtersInStore}
                     data={price[category]}
                     handleFilter={(filter) => handleFilter(filter, "price")}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductFilter;
