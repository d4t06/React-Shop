import styles from "./Skeleton.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Skeleton({className}) {
   const classNames = cx(className, "skeleton")
   return <div className={classNames}></div>;
}
