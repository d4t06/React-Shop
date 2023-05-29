import SearchResultPage from '../pages/SearchResultPage'
import Home from "../pages/Home";
import DetailPage from "../pages/DetailPage";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from '../pages/Register'
import Unauthorized from '../pages/UnauthorizedPage';
import Dashboard from '../pages/Dashboard/Home';
import DashboardLayout from '../layouts/DashboardLayout';
import AddProduct from '../pages/Dashboard/AddProduct';
import EditProduct from '../pages/Dashboard/EditProduct'

const publicRoutes = [
   {
      path: "/",
      component: Home,
   },
   {
      path: "/unauthorized",
      component: Unauthorized,
   },
   {
      path: "/login",
      component: Login,
   },
   {
      path: "/register",
      component: Register,
   },
   {
      path: "/:category",
      component: Products,
   },
   {
      path: "/search/:key",
      component: SearchResultPage,
   },
   {
      path: "/:category/:key",
      component: DetailPage,
   }
];


const privateRoutes = [
   {
      path:"/dashboard",
      role: ["R1"],
      component: Dashboard,
      layout: DashboardLayout
   },
   {
      path:"/dashboard/add",
      role: ["R1"],
      component: AddProduct,
      layout: DashboardLayout
   },
   {
      path:"/dashboard/:category",
      role: ["R1"],
      component: Dashboard,
      layout: DashboardLayout
   },
   {
      path:"/dashboard/products/edit/:href",
      role: ["R1"],
      component: EditProduct,
      layout: DashboardLayout
   },
]
export { publicRoutes, privateRoutes };
