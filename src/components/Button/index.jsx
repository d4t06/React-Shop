import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Button({
   mgauto,
   disable,
   full,
   half,
   describe,
   rounded,
   count,
   outline,
   children,
   fill,
   onClick,
   icon,
   status,
   className,
}) {
   const classes = cx('wrapper', {
      [className]: className,
      disable,
      outline,
      mgauto,
      fill,
      rounded,
      full,
      half,
      df: icon,
      atc: icon
   });
   return (
      <button onClick={onClick} className={classes}>
         { !!(status === 'loading') && icon}
         <span>
            {children} {count} {describe}
         </span>
      </button>
   );
}

export default Button;
