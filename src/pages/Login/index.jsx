import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.scss";
import { useAuth } from "@/store";
import { publicRequest } from "@/utils/request";
// hooks
import useInput from "@/hooks/useInput";
import useToggleCheckbox from "@/hooks/useToggle";
import { sleep } from "@/utils/appHelper";
import { RiLoader2Line } from "react-icons/ri";

const LOGIN_URL = "/auth/login";
const cx = classNames.bind(styles);

function LoginPage() {
  const { auth, setAuth } = useAuth();
  const userInputRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [isCheck, toggleCheck] = useToggleCheckbox("persist", false);
  const [user, userAttribs, clearUser] = useInput("user", ""); //useState('');
  const [password, setPassword] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(auth).length !== 0) navigate(-1);
  }, []);

  useEffect(() => {
    userInputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await publicRequest.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
      const token = response?.data?.token;

      if (token) {
        setAuth({ token });
        clearUser();
        setPassword("");
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No server response");
      } else if (error?.response.status === 401) {
        setErrorMsg("Tên hoặc mật khẩu không chính xác");
      } else {
        setErrorMsg("Đăng nhâp thất bại");
      }
      console.log(">>> error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={cx("form", { disable: loading })} onSubmit={handleSubmit}>
      {errMsg && <h2 className={cx("error-msg")}>{errMsg}</h2>}
      <h1>Đăng nhập</h1>
      <div className={cx("form-group")}>
        <label htmlFor="name" autoComplete="off">
          Tài khoản
        </label>
        <input
          ref={userInputRef}
          autoComplete="off"
          type="text"
          required
          {...userAttribs}
        />
      </div>
      <div className={cx("form-group")}>
        <label htmlFor="image">Mật khẩu</label>
        <input
          type="text"
          autoComplete="off"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value.trim() && e.target.value)}
        />
      </div>
      <div className={cx("persist-check")}>
        <input type="checkbox" id="persist" checked={isCheck} onChange={toggleCheck} />
        <label htmlFor="persist">Trust this device :v ?</label>
      </div>

      <button className={cx("submit-btn")} type="submit">
        Đăng nhập
      </button>
      <span className={cx("register-text")}>
        Chưa có tài khoản?
        <Link to="/register"> Đăng ký ngay</Link>
      </span>
    </form>
  );
}
export default LoginPage;
