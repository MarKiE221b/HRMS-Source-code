import React from "react";
import NavBar from "../../components/user/NavBar.jsx";

import { Outlet, Navigate } from "react-router-dom";
import { verifyApi } from "../../api/index.js";
import Loading from "../../Loading.jsx";

const UserLayout = () => {
  const { data: verifyUser, isLoading, isError, isFetching } = verifyApi();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError || verifyUser !== "user") {
    return <Navigate to="/" />;
  } else {
    return (
      <div>
        <div className="sticky top-0 z-50">
          <NavBar />
        </div>
        <div className="bg-slate-100 py-10 px-5 h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    );
  }
};

export default UserLayout;
