import React from "react";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import logo from '../../assets/Final_Tostriplogo.png'
import { Link } from "react-router";
const DashboardNav = () => {
  return (
    <div className="w-64 h-screen bg-white shadow px-10 py-10  fixed">
      <h1 className="text-2xl font-bold mb-12">
        <img src={logo} alt="logo" className="w-30 h-25" />
      </h1>
      <nav className="space-y-6 pt-10">
        <div className="flex items-center space-x-2 text-gray-800 hover:text-Primary cursor-pointer ">
          <Link to="/admin" className="flex gap-5">
            <FaUser />
            <span className="text-sm md:text-base">អ្នកប្រើប្រាស់</span>
          </Link>
        </div>
        <hr className=" border-t border-gray-300" />
        <div className="flex items-center space-x-2 text-gray-800 my-2 hover:text-Primary cursor-pointer">
          <Link to='/admin/place'  className="flex gap-5 my-2">
            <FaMapMarkerAlt />
            <span  className="flex gap-5">ទីតាំង</span>
          </Link>
        </div>
        <hr className=" border-t border-gray-300" />
      </nav>
    </div>
  );
};

export default DashboardNav;
