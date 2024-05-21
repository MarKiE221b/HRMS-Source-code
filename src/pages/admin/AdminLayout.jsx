import React, { useState } from "react";
import NavBar from "../../components/admin/NavBar";
import Loading from "../../Loading";

import { Navigate, Outlet } from "react-router-dom";
import { verifyApi } from "../../api";
import SideBar from "../../components/admin/SideBar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: verifyUser, isLoading, isError, isFetching } = verifyApi();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError || verifyUser !== "admin") {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="flex h-screen font-body">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="h-full p-10">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
};

export default AdminLayout;
