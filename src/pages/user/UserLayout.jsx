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
      <div className="flex h-screen font-body">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-slate-100">
          <NavBar />
          <div className="max-h-full p-5 md:p-8 lg:p-14 overflow-y-auto">
            <div className="md:scale-75 lg:scale-90 xl:scale-100">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default UserLayout;
