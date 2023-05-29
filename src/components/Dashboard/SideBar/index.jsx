import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";


const cx = classNames.bind(styles);

function Sidebar() {
   return (
      <div className={cx("sibebar")}>
            <ul>
               <li className={cx("sibebar__item")}>
                  <i className="material-icons">phonelink</i>
                  <Link to="/dashboard/products" >
                     Tất cả sản phẩm
                  </Link>
               </li>
               <li className={cx("sibebar__item")}>
                  <i className="material-icons">supervisor_account</i>
                  <Link to="/dashboard/users" >
                     Tất cả tài khoản
                  </Link>
               </li>
               <li className={cx("sibebar__item")}>
                  <i className="material-icons">add</i>
                  <Link to="/dashboard/add" >
                     Thêm sản phẩm
                  </Link>
               </li>
            </ul>
         </div>
   );
}

export default Sidebar;
