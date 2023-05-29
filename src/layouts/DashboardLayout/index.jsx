import Header from '../../components/Dashboard/Header'
import DashboardSibeBar from '../../components/Dashboard/SideBar';
import classNames from 'classnames/bind';
import styles from './DashboardLayout.module.scss'

const cx = classNames.bind(styles)

function DashboardLayout({children}) {
   
   return (
      <div className="app">
         <Header />
         <DashboardSibeBar/>
         <div className={cx("dashboard_wrapper")}>
         {children}
         </div>
      </div>
   );
}

export default DashboardLayout;
