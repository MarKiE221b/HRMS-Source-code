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
  import("./pages/user/ApplicationLeavePage/page.jsx")
);
const LedgerPage = lazy(() => import("./pages/user/LedgerPage/page.jsx"));
const CTOpage = lazy(() => import("./pages/user/CTOpage/page.jsx"));
const SettingsPage = lazy(() => import("./pages/user/SettingsPage/page.jsx"));
const EmployeeRequestPage = lazy(() =>
  import("./pages/user/EmployeeRequestPage/page.jsx")
);
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard/page.jsx"));
const Employees = lazy(() => import("./pages/admin/Employees/page.jsx"));
const RequestPage = lazy(() => import("./pages/admin/RequestPage/page.jsx"));
const CTO = lazy(() => import("./pages/admin/CTO/page.jsx"));

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
            path=":id/ledger"
            element={
              <Suspense fallback={<Loading />}>
                <LedgerPage />
              </Suspense>
            }
          />

          <Route
            path=":id/emprequestpage"
            element={
              <Suspense fallback={<Loading />}>
                <EmployeeRequestPage />
              </Suspense>
            }
          />

          <Route
            path=":id/ctopage"
            element={
              <Suspense fallback={<Loading />}>
                <CTOpage />
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
          <Route
            path="requests"
            element={
              <Suspense fallback={<Loading />}>
                <RequestPage />
              </Suspense>
            }
          />

          <Route
            path="cto"
            element={
              <Suspense fallback={<Loading />}>
                <CTO />
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
