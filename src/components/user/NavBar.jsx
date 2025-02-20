import React, { useEffect, useState } from "react";
import { FaSwimmer } from "react-icons/fa";
import { MdOutlineSick } from "react-icons/md";
import { FcOvertime } from "react-icons/fc";
import logo from "../../assets/ched-logo.png";

import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getPendingNofitCount,
  getUploadAvatar,
  logoutApi,
  userInfoApi,
} from "../../api";
import { FaRegListAlt, FaHome, FaClock } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";

const NavBar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [avatar, setAvatar] = useState(null);

  const { data: userData } = userInfoApi();
  const { data: countNotif } = getPendingNofitCount(userData?.unit);
  const { data: profileAvatar, isFetched: avatarFetched } = getUploadAvatar();

  const { mutate: logoutFunct, isSuccess } = logoutApi();

  const avatarOnload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file || null);
    }
  };

  useEffect(() => {
    avatarOnload(profileAvatar);
  }, [avatarFetched]);

  if (isSuccess) return <Navigate to="/" />;

  return (
    <div className="pb-3 bg-slate-200">
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
            label={<Avatar alt="user_icon" img={avatar} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-base">{`${userData?.lastname}, ${
                userData?.firstname
              } ${userData?.middlename ? userData?.middlename + " " : ""}${
                userData?.ext_name || ""
              }`}</span>
            </Dropdown.Header>
            {!userData && <Dropdown.Item>Profile</Dropdown.Item>}
            {userData?.division !== "RD" && (
              <Dropdown.Header>
                <span className="block font-semibold">Credits: </span>
                <span className="flex items-center ml-2 font-semibold">
                  <FaSwimmer size="25px" /> :{" "}
                  {userData?.vacation_balance !== null
                    ? userData?.vacation_balance
                    : 0}
                </span>
                <span className="flex items-center ml-2 font-semibold">
                  <MdOutlineSick size="25px" /> :{" "}
                  {userData?.sick_balance !== null ? userData?.sick_balance : 0}
                </span>
                <span className="flex items-center ml-2 font-semibold">
                  <FcOvertime size="25px" />:{" "}
                  {userData?.CTO_balance !== null ? userData?.CTO_balance : 0}
                </span>
              </Dropdown.Header>
            )}
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

      <div className="flex flex-wrap overflow-x-auto gap-2 mx-3 mt-3">
        <Button.Group>
          <Button color="gray" onClick={() => navigate(id)}>
            <FaHome className="mr-3 h-4 w-4" />
            Home
          </Button>
          {userData?.unit === "CHIEF ADMINISTRATIVE OFFICER" && (
            <Button
              className="relative"
              color="gray"
              onClick={() => navigate(`${id}/emprequestpage`)}
            >
              <IoPeopleSharp className="mr-3 h-4 w-4" />
              Employee Request{" "}
              <span className="absolute top-0 left-8 p-1 text-xs rounded-full bg-red-200">
                {countNotif?.notifCount}
              </span>
            </Button>
          )}
          {userData?.unit === "CHIEF EDUCATION PROGRAM SPECIALIST" && (
            <Button
              className="relative"
              color="gray"
              onClick={() => navigate(`${id}/emprequestpage`)}
            >
              <IoPeopleSharp className="mr-3 h-4 w-4" />
              Employee Request{" "}
              <span className="absolute top-0 left-8 p-1 text-xs rounded-full bg-red-200">
                {countNotif?.notifCount}
              </span>
            </Button>
          )}

          {userData?.division !== "RD" && (
            <Button color="gray" onClick={() => navigate(`${id}/ledger`)}>
              <FaRegListAlt className="mr-3 h-4 w-4" />
              Ledger
            </Button>
          )}

          <Button color="gray" onClick={() => navigate(`${id}/ctopage`)}>
            <FaClock className="mr-3 h-4 w-4" />
            CTO
          </Button>
        </Button.Group>
      </div>
    </div>
  );
};

export default NavBar;
