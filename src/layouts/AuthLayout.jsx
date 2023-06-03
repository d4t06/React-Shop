import classNames from "classnames/bind";
import styles from "./Layout.module.scss";

import Header from "../components/Dashboard/Header";
const cx = classNames.bind(styles);

function AuthLayout({ children }) {
  return (
    <div className="app">
      <Header less />
      <div className={cx("auth-container")}>
        <div className={cx("form-wrapper")}>{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
