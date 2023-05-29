import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import useAuth from "../../../hooks/useAuth";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
   const {auth} = useAuth()
   const decode = jwtDecode(auth.token)

   return (
      <div className={cx("header__wrapper")}>
         <div className="container">
            <div className={cx("header")}>
               <h1><Link to='/dashboard'>HD SHOP</Link></h1>
               <h2>Hello {decode.username} !</h2>
            </div>
         </div>
      </div>
   );
}

export default Header;
