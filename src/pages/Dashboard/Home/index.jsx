import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import usePrivateRequest from "../../../hooks/usePrivateRequest";
import styles from "./Dashboard.module.scss";
import useRefreshToken from "../../../hooks/useRefreshToken";
import request from "../../../utils/request";
import moneyFormat from "../../../utils/moneyFormat";

const cx = classNames.bind(styles);

function AdminPage() {
   const [products, setProducts] = useState([]);
   // const refresh = useRefreshToken();
   const privateRequest = usePrivateRequest();
   const [isEdited, setIsedited] = useState(false);
   const navigate = useNavigate();
   const { category } = useParams();

   const { count, row } = products;

   const handleDelete = async (href) => {
      if (window.confirm("Bạn có muốn xoá sản phẩm này ?")) {
         try {
            const controller = new AbortController();
            const fetch = async () => {
               try {
                  await privateRequest.get(`/admin/products/delete/${href}`, {
                     signal: controller.signal,
                  });
               } catch (error) {
                  console.log({ message: error });
               }
            };
            fetch();
            setIsedited(true);

            return () => {
               controller.abort();
            };
         } catch (error) {
            console.log({ staus: "fail", message: "delete error" });
         }
      }
   };

   useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

      const fetch = async () => {
         try {
            const response = await privateRequest.get(`/admin/${category}`, {
               signal: controller.signal,
            });
            isMounted && setProducts(response.data);
            setIsedited(false);
         } catch (error) {
            console.log({ message: error });
            navigate("/unauthorized");
         }
      };
      fetch();

      return () => {
         isMounted = false;
         controller.abort();
      };
   }, [category, isEdited]);

   return (
      <div className={cx("dashboard")}>
         <h1 className={cx("title")}>
            Tất cả sản phẩm (<strong>{count}</strong>)
         </h1>
         <table className={cx("table")}>
            <thead>
               <tr>
                  <th></th>
                  <th></th>
                  <th>Danh mục</th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Danh số</th>
                  <th>Kho</th>
               </tr>
            </thead>
            <tbody>
               {!!row?.length &&
                  row.map((item, index) => {
                     console.log("index = ", index);
                     return (
                        <tr key={index}>
                           <td className={cx("product-image")}>
                              <img
                                 src={
                                    item.image_path.includes(".jpg")
                                       ? item.image_path
                                       : "https://placehold.co/300x300"
                                 }
                                 alt=""
                              />
                           </td>
                           <td>
                              <Link to={`edit/${item.href}`}>
                                 <i className="material-icons">edit</i>
                              </Link>
                              <button onClick={() => handleDelete(item.href)}>
                                 <i className="material-icons">delete</i>
                              </button>
                           </td>
                           <td>
                              {item.category == "dtdd"
                                 ? "Điện thoại"
                                 : "Laptop"}
                           </td>
                           <td>{item.name}</td>
                           <td>{moneyFormat(item.cur_price)}</td>
                           <td>0</td>
                           <td>{item.quantity}</td>
                        </tr>
                     );
                  })}
            </tbody>
         </table>
      </div>
   );
}
export default AdminPage;
