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
   AccountPage
} from "../pages";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

const routes = {
   HOME: "",
   CATEGORY: "/:category",
   LOGIN: "/login",
   REGISTER: "/register",
   SEARCH: "/search/:key",
   DETAIL: "/:category/:key",
   UNAUTHORIZED: "/unauthorized",
   ACCOUNT: "/account",
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
      path: routes.ACCOUNT,
      component: AccountPage,
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
      path: "/dashboard",
      role: ["R1"],
      component: Dashboard,
      layout: DashboardLayout,
   },
   {
      path: "/dashboard/add",
      role: ["R1"],
      component: AddProduct,
      layout: DashboardLayout,
   },
   {
      path: "/dashboard/:category",
      role: ["R1"],
      component: Dashboard,
      layout: DashboardLayout,
   },
   {
      path: "/dashboard/products/edit/:href",
      role: ["R1"],
      component: EditProduct,
      layout: DashboardLayout,
   },
];
export { publicRoutes, privateRoutes, routes };
