import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { PiUserList } from "react-icons/pi";
import logo from "/ched-logo.png";

import { useLocation, useNavigate } from "react-router-dom";

const SideBar = (props) => {
  const path = useLocation();
  const navigate = useNavigate();

  const [indexMenu, setIndexMenu] = useState(0);
  const sideList = [
    {
      icon: <MdOutlineSpaceDashboard />,
      label: "Dashboard",
      path: "dashboard",
    },
    {
      icon: <PiUserList />,
      label: "Employees",
      path: "employees",
    },
  ];

  useEffect(() => {
    sideList.map((list, index) => {
      if (list.path === path.pathname.split("/")[2]) {
        setIndexMenu(index);
      }
    });
  }, [path]);

  return (
    <aside
      className={`absolute left-0 top-0 z-10 flex h-screen flex-col w-64 bg-[#1c2434] text-white transform transition-transform ${
        props.isOpen ? "translate-x-0" : "-translate-x-full"
      } md:static md:translate-x-0 -translate-x-full`}
    >
      <div className="flex items-center gap-7 mb-5 p-6">
        <div className="flex items-center gap-2">
          <img className="w-[70px]" src={logo} alt="ched logo" />
          <h1 className="text-3xl font-semibold">HRMS</h1>
        </div>

        <div className="fixed top-12 right-5 md:hidden">
          <button type="button" onClick={() => props.setIsOpen(!props.isOpen)}>
            <FaArrowLeftLong size="20px" color="#64748b" />
          </button>
        </div>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="px-4 py-4">
          <div>
            <ul>
              <h3 className="mb-4 ml-4 text-sm font-medium text-white text-opacity-70">
                MENU
              </h3>
              <li>
                {sideList.map((list, index) => (
                  <button
                    type="button"
                    onClick={() => navigate(`/admin/${list.path}`)}
                    key={index}
                    className={`flex items-center gap-2.5 px-4 py-2 mt-2 w-full ${
                      indexMenu === index && "bg-[#333a48]"
                    } hover:bg-[#333a48] duration-300 ease-in-out rounded-sm`}
                  >
                    {" "}
                    {list.icon} {list.label}
                  </button>
                ))}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
