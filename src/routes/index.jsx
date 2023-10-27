import {
   Products,
   AddProduct,
   Dashboard,
   EditProduct,
   Home,
   Login,
   Register,
   SearchResultPage,
   UnauthorizedPage,
   ProductDetail,
} from "../pages";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

const routes = {
   HOME: "/React-Shop",
   CATEGORY: "/React-Shop/:category",
   LOGIN: "/React-Shop/login",
   REGISTER: "/React-Shop/register",
   SEARCH: "/React-Shop/search/:key",
   DETAIL: "/React-Shop/:category/:key",
   UNAUTHORIZED: "/React-Shop/unauthorized",
};

const publicRoutes = [
   {
      path: routes.HOME,
      component: Home,
   },
   {
      path: routes.UNAUTHORIZED,
      component: UnauthorizedPage,
   },
   {
      path: routes.LOGIN,
      component: Login,
      layout: AuthLayout,
   },
   {
      path: routes.REGISTER,
      component: Register,
      layout: AuthLayout,
   },
   {
      path: routes.CATEGORY,
      component: Products,
   },
   {
      path: routes.SEARCH,
      component: SearchResultPage,
   },
   {
      path: routes.DETAIL,
      component: ProductDetail,
   },
];

const privateRoutes = [
   {
      path: "/React-Shop/dashboard",
      role: ["R1"],
      component: Dashboard,
      layout: DashboardLayout,
   },
   {
      path: "/React-Shop/dashboard/add",
      role: ["R1"],
      component: AddProduct,
      layout: DashboardLayout,
   },
   {
      path: "/React-Shop/dashboard/:category",
      role: ["R1"],
      component: Dashboard,
      layout: DashboardLayout,
   },
   {
      path: "/React-Shop/dashboard/products/edit/:href",
      role: ["R1"],
      component: EditProduct,
      layout: DashboardLayout,
   },
];
export { publicRoutes, privateRoutes, routes };
