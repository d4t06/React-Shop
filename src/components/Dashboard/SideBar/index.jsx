import { Link } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames/bind";

import Modal from "../../Modal";
import Button from "../../Button";

import styles from "./SideBar.module.scss";
import Gallery from "../Gallery";

const cx = classNames.bind(styles);

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={cx("sibebar")}>
      <ul>
        <li className={cx("sibebar__item")}>
          <i className="material-icons">phonelink</i>
          <Link to="/dashboard/products">Tất cả sản phẩm</Link>
        </li>
        <li className={cx("sibebar__item")}>
          <i className="material-icons">supervisor_account</i>
          <Link to="/dashboard/users">Tất cả tài khoản</Link>
        </li>
        <li className={cx("sibebar__item")}>
          <i className="material-icons">add</i>
          <Link to="/dashboard/add">Thêm sản phẩm</Link>
        </li>
        <li onClick={() => setShowModal(true)} className={cx("sibebar__item")}>
          <i className="material-icons">image</i>
          <p>Thư viện ảnh</p>
        </li>
      </ul>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <Gallery />
        </Modal>
      )}
    </div>
  );
}

export default Sidebar;
