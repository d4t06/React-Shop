import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAuth } from "@/store";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header({ less }) {
  const { auth } = useAuth();
  let decode;

  if (!less) {
    decode = auth.token ? jwtDecode(auth.token) : "";
  }

  return (
    <div className={cx("header__wrapper")}>
      <div className="container">
        <div className={cx("header")}>
          {less ? (
            <h1>
              {" "}
              <Link to="/">HD Shop</Link>
            </h1>
          ) : (
            <>
              <h1>
                <Link to="/dashboard">HD Shop Dashboard</Link>
              </h1>
              <h2>Hello {decode?.username ? decode.username : "no persist"} !</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
