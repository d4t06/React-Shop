import { Fragment } from "react";
import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth";
import Dashboard from "./pages/Dashboard/Home";
import AccountPage from "./pages/AccountPage";
import PersistLogin from "./routes/PersistLogin";

function App() {
   return (
      <Router>
         <Routes>
            {publicRoutes.map((route, index) => {
               const Page = route.component;
               let Layout = DefaultLayout;
               if (route.layout) Layout = route.layout;
               else if (route.layout === null) Layout = Fragment;

               return (
                  <Route
                     key={index}
                     path={route.path}
                     element={
                        <Layout>
                           <Page />
                        </Layout>
                     }
                  />
               );
            })}

            <Route element={<PersistLogin />}>
               {privateRoutes.map((route, index) => {
                  const Page = route.component;
                  let Layout = DefaultLayout;
                  if (route.layout) Layout = route.layout;
                  else if (route.layout === null) Layout = Fragment;

                  return (
                     <Route
                        key={index}
                        element={
                           <RequireAuth allowedRole={route.role} />
                        }
                     >
                        <Route
                           path={route.path}
                           element={
                              <Layout>
                                 <Page />
                              </Layout>
                           }
                        />
                     </Route>
                  );
               })}
            </Route>
         </Routes>
      </Router>
   );
}

export default App;
