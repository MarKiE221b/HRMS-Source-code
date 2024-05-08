import React from "react";
import { FaSwimmer } from "react-icons/fa";
import { MdOutlineSick } from "react-icons/md";
import { FcOvertime } from "react-icons/fc";
import logo from "/ched-logo.png";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { logoutApi, userInfoApi } from "../../api";

const NavBar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: userData } = userInfoApi();
  const { mutate: logoutFunct, isSuccess } = logoutApi();

  if (isSuccess) return <Navigate to="/" />;

  return (
    <Navbar fluid className="bg-sky-950">
      <Navbar.Brand>
        <img src={logo} alt="logo" className="h-[50px] w-[50px] mr-3" />
        <h1 className="text-white text-lg font-semibold text-nowrap self-center hidden sm:block">
          Human Resource Management System
        </h1>
      </Navbar.Brand>

      <div>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="user_icon" img="/pexels-pixabay-220453.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-base">{`${userData?.lastname}, ${
              userData?.firstname
            } ${userData?.middlename ? userData?.middlename + " " : ""}${
              userData?.ext_name || ""
            }`}</span>
          </Dropdown.Header>
          {!userData && <Dropdown.Item>Profile</Dropdown.Item>}
          <Dropdown.Header>
            <span className="block font-semibold">Credits: </span>
            <span className="flex items-center ml-2 font-semibold">
              <FaSwimmer size="25px" /> : {userData?.vacation_balance}
            </span>
            <span className="flex items-center ml-2 font-semibold">
              <MdOutlineSick size="25px" /> : {userData?.sick_balance}
            </span>
            <span className="flex items-center ml-2 font-semibold">
              <FcOvertime size="25px" />: 0
            </span>
          </Dropdown.Header>
          <Dropdown.Item
            type="button"
            onClick={() => navigate(`${id}/settings`)}
          >
            {" "}
            <span className="text-base">Profile</span>
          </Dropdown.Item>
          <Dropdown.Item type="button" onClick={() => logoutFunct()}>
            {" "}
            <span className="text-base">Sign out</span>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default NavBar;
