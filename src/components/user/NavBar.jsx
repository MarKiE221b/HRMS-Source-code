import React from "react";
import { FaSwimmer } from "react-icons/fa";
import { MdOutlineSick } from "react-icons/md";
import { FcOvertime } from "react-icons/fc";
import logo from "/ched-logo.png";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useParams } from "react-router-dom";

const NavBar = () => {
  const { id } = useParams();

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
            <span className="block text-base">Joe Rogan</span>
          </Dropdown.Header>
          {!id && <Dropdown.Item>Profile</Dropdown.Item>}
          <Dropdown.Divider />
          <Dropdown.Header>
            <span className="block font-semibold">Credits: </span>
            <span className="flex items-center ml-2 font-semibold">
              <FaSwimmer size="25px" /> : 140.2
            </span>
            <span className="flex items-center ml-2 font-semibold">
              <MdOutlineSick size="25px" /> : 140.2
            </span>
            <span className="flex items-center ml-2 font-semibold">
              <FcOvertime size="25px" />: 140.2
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            {" "}
            <span className="text-base">Sign out</span>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default NavBar;
