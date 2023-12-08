import { Link } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames/bind";
import ReactDom from "react-dom"
import {Gallery, Modal} from "@/components";

import styles from "./SideBar.module.scss";
const cx = classNames.bind(styles);

function Sidebar() {
   const [showModal, setShowModal] = useState(false);
   return (
      <div className={cx("sibebar")}>
         <ul>
            <li className={cx("sibebar__item")}>
               <i className="material-icons">phonelink</i>
               <Link to="/dashboard/products">Products</Link>
            </li>
            {/* <li className={cx("sibebar__item")}>
               <i className="material-icons">supervisor_account</i>
               <Link to="/dashboard/users">Tất cả tài khoản</Link>
            </li> */}
            {/* <li className={cx("sibebar__item")}>
               <i className="material-icons">add</i>
               <Link to="/dashboard/add">Add product</Link>
            </li> */}
            <li
               onClick={() => setShowModal(true)}
               className={cx("sibebar__item")}
            >
               <i className="material-icons">image</i>
               <p>Gallery</p>
            </li>
         </ul>
         {showModal &&
            ReactDom.createPortal(
               <>
                  <Modal setShowModal={setShowModal}>
                     <Gallery />
                  </Modal>
               </>,
               document.getElementById("portal")
            )}
      </div>
   );
}

export default Sidebar;
