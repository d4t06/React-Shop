import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import moneyFormat from "../../utils/moneyFormat";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import searchService from "../../services/searchService";
import PopupStyles from "../Popup/Popup.module.scss";
import useDebounce from "../../hooks/useDebounce";
import Popup from "../Popup";

const cx = classNames.bind(styles);
const cy = classNames.bind(PopupStyles);

function Search({ setShowModal }) {
   const [loading, setLoading] = useState(false);
   const [query, setQuery] = useState("");
   const [searchResult, setSearchResult] = useState("");
   const [show, setShow] = useState(false);

   // use hooks
   let debounceValue = useDebounce(query, 1000);

   const handleSearchText = (e) => {
      handleShow(true);
      setQuery(e.target.value);
      if (!query) setSearchResult("");
   };

   const handleClear = (e) => {
      e.stopPropagation();
      setQuery("");
      debounceValue = "";
      setSearchResult();
   };

   const handleShow = (value) => {
      setShow(value);
      setShowModal(value);
   };

   // const [state, dispatch] = useStore();
   const navigate = useNavigate();

   const handleDetailPage = (item) => {
      handleShow(false);
      navigate(`/${item.category_name}/${item.product_id}`);
   };

   const handleSubmit = () => {
      handleShow(false);
      navigate(`/search/${query}`);
   };

   const isShowResult = useMemo(
      () => !!query && !!searchResult && !!show,
      [show, searchResult, query]
   );

   useEffect(() => {
      if (!debounceValue.trim()) return;

      const fetchApi = async () => {
         try {
            console.log("get data");
            setLoading(true);
            const result = await searchService({ q: debounceValue });

            if (result) {
               setSearchResult(result);
            }
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      };

      fetchApi();
   }, [debounceValue]);


   // return;
   return (
      <Popup
         content={
            <div className={cy("wrap")}>
               <h2 className={cy("search-result-title")}>Sản phẩm được gợi ý</h2>
               <ul>
                  {searchResult &&
                     searchResult?.products.map((item) => {
                        return (
                           <li
                              onClick={() => handleDetailPage(item)}
                              className={cy("product-item")}
                              key={item.product_id}
                           >
                              <div className={cy("product-img")}>
                                 <img src={item.image_url} alt="" />
                              </div>
                              <div className={cy("product-info")}>
                                 <h2 className={cy("title")}>{item.name}</h2>
                                 {item.old_price && (
                                    <>
                                       <span className={cy("old_price")}>
                                          {moneyFormat(item?.old_price)}₫
                                       </span>
                                       <span className={cy("discount-percent")}>
                                          -
                                          {(
                                             ((+item.old_price - +item.cur_price) /
                                                +item.old_price) *
                                             100
                                          ).toFixed(0)}
                                          %
                                       </span>
                                    </>
                                 )}
                                 <p className={cy("cur_price")}>{moneyFormat(item.cur_price)}₫</p>
                              </div>
                           </li>
                        );
                     })}
               </ul>
            </div>
         }
         option={{
            visible: isShowResult,
            appendTo: () => document.body,
            onClickOutside: () => handleShow(false),
         }}
      >
         <div className={cx("wrap")}>
            <form className={cx("form")} onSubmit={(e) => handleSubmit(e)}>
               <input
                  className={cx("input")}
                  type="text"
                  placeholder="Hôm nay bạn muốn tìm gì..."
                  value={query}
                  onChange={(e) => handleSearchText(e)}
                  onFocus={() => handleShow(true)}
                  onKeyDown={(e) => {
                     e.key === "Enter" && handleSubmit(e);
                  }}
               />
               {loading && query && (
                  <button className={cx("loading-btn", 'btn')}>
                     <i className="material-icons">sync</i>
                  </button>
               )}
               {!loading && query && (
                  <button className={cx("clear-btn", 'btn')} onClick={(e) => handleClear(e)}>
                     <i className="material-icons">clear</i>
                  </button>
               )}
               <button onClick={(e) => handleSubmit(e)} className={cx("search-btn", 'btn')}>
                  <i className="material-icons">search</i>
               </button>
            </form>
         </div>
      </Popup>
   );
}
export default Search;
