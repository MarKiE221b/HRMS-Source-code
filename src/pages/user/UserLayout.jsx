import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/user/NavBar.jsx";

const UserLayout = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div className="bg-slate-100 py-10 px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
