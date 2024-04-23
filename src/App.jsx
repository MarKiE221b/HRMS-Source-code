import React, { Suspense, lazy } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const LoginPage = lazy(() => import("./pages/LoginPage/page.jsx"));
const UserLayout = lazy(() => import("./pages/user/UserLayout.jsx"));

import ProfilePage from "./pages/user/ProfilePage/page.jsx";
import ApplicationLeavePage from "./pages/user/ApplicationLeavePage.jsx/page.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Root */}
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LoginPage />
            </Suspense>
          }
        />

        {/* User */}
        <Route
          path="user"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <UserLayout />
            </Suspense>
          }
        >
          <Route path=":id" element={<ProfilePage />} />
          <Route path="application" element={<ApplicationLeavePage />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
