import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import logo from "/ched-logo.png";

const SideBar = (props) => {
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

      <nav>
        <ul>
          <li className="p-2">
            <a href="#">Home</a>
          </li>
          <li className="p-2">
            <a href="#">About</a>
          </li>
          <li className="p-2">
            <a href="#">Services</a>
          </li>
          <li className="p-2">
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
