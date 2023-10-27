import classNames from 'classnames/bind';
import styles from './Button.module.scss';
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
         <span>
            {children} {count} {describe}
         </span>
      </button>
   );
}

export default Button;
