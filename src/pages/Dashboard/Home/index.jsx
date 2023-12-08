import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import usePrivateRequest from "@/hooks/usePrivateRequest";
// import {useRefreshToken} from "@/hooks";
// import {request} from "@/utils/request";
import {moneyFormat} from "@/utils/appHelper";

import styles from "./Dashboard.module.scss";
const cx = classNames.bind(styles);

function Dashboard() {

  return <h1>Dashboard page</h1>
  return (
    <div className={cx("dashboard")}>
      <h1 className={cx("title")}>
        Tất cả sản phẩm (<strong>{count}</strong>)
      </h1>
      <div className={cx("table-wrapper")}>
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
                // console.log("index = ", index);
                return (
                  <tr key={index}>
                    <td className={cx("product-image")}>
                      <img
                        src={
                          item.image_url.includes(".jpg")
                            ? item.image_url
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
                    <td>{item.category == "dtdd" ? "Điện thoại" : "Laptop"}</td>
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
    </div>
  );
}
export default Dashboard;
