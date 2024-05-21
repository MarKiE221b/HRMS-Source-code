import React, { Suspense, lazy } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const LoginPage = lazy(() => import("./pages/LoginPage/page.jsx"));
const UserLayout = lazy(() => import("./pages/user/UserLayout.jsx"));
const ProfilePage = lazy(() => import("./pages/user/ProfilePage/page.jsx"));
const ApplicationLeavePage = lazy(() =>
  import("./pages/user/ApplicationLeavePage.jsx/page.jsx")
);
const SettingsPage = lazy(() => import("./pages/user/SettingsPage/page.jsx"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard/page.jsx"));
const Employees = lazy(() => import("./pages/admin/Employees/page.jsx"));

import Loading from "./Loading.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Root */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <LoginPage />
            </Suspense>
          }
        />

        {/* User */}
        <Route
          path="user"
          element={
            <Suspense fallback={<Loading />}>
              <UserLayout />
            </Suspense>
          }
        >
          <Route
            path=":id"
            element={
              <Suspense fallback={<Loading />}>
                <ProfilePage />
              </Suspense>
            }
          />

          <Route
            path=":id/settings"
            element={
              <Suspense fallback={<Loading />}>
                <SettingsPage />
              </Suspense>
            }
          />

          <Route
            path="application"
            element={
              <Suspense fallback={<Loading />}>
                <ApplicationLeavePage />
              </Suspense>
            }
          />
        </Route>

        {/* Admin */}
        <Route
          path="admin"
          element={
            <Suspense fallback={<Loading />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="employees"
            element={
              <Suspense fallback={<Loading />}>
                <Employees />
              </Suspense>
            }
          />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
