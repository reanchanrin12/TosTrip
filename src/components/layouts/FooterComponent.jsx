import React from "react";
import { Link } from "react-router";
import { MdOutlineLocationOn, MdOutlineMail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import logo from "../../assets/Final_Tostriplogo.png";

const FooterComponent = () => {
  return (
    <footer className="px-6 sm:px-10 md:px-[8%] py-10 shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-100 font-[Suwannaphum]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center flex-col lg:flex-row gap-8">
          <div className="flex justify-center lg:justify-start">
            <img src={logo} alt="Tos Trip logo" className="w-20 h-18" />
          </div> 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10  ">
            <div className="text-left md:text-cente​r ">
              <h4 className="text-lg mb-4 text-Primary">ការស្វែងរក</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link to="/" onClick={() => setTimeout(() => window.location.reload(), 0)} className="hover:text-Primary transition-colors duration-200">ទំព័រដើម</Link></li>
                <li><Link to="/about" onClick={() => setTimeout(() => window.location.reload(), 0)} className="hover:text-Primary transition-colors duration-200">អំពីយើង</Link></li>
                <li><Link to="/place" onClick={() => setTimeout(() => window.location.reload(), 0)} className="hover:text-Primary transition-colors duration-200">ដំណើរទេសចរណ៍</Link></li>
              </ul>
            </div>
            <div className="text-left md: ">
              <h4 className="text-lg mb-4 text-Primary">តំណភ្ជាប់រហ័ស</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link to="/faqs"  className="hover:text-Primary transition-colors duration-200">រូបភាព</Link></li>
                <li><Link to="/discounts" className="hover:text-Primary transition-colors duration-200">ការចូល</Link></li>
                <li><Link to="/licenses" className="hover:text-Primary transition-colors duration-200">ការចុះឈ្មោះ</Link></li>
              </ul>
            </div>
            <div className="text-left md:text-center">
              <h4 className="text-lg mb-2 text-Primary">ទំនាក់ទំនង</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex tems-start justify-start lg:justify-start gap-2 hover:text-Primary transition-colors duration-200">
                  <MdOutlineMail className="text-sm" />
                  <a href="#">tostrip53@gmail.com</a>
                </li>
                <li className="flex  items-start justify-start lg:justify-start gap-2 hover:text-Primary transition-colors duration-200">
                  <LuPhone className="text-sm" />
                  <a href="tel:+85588888888">0716249197</a>
                </li>
                <li className="flex items-start justify-start  lg:justify-start gap-2 hover:text-Primary transition-colors duration-200">
                  <MdOutlineLocationOn className="text-sm" />
                  <span>អាសយដ្ឋាន : ទួលគោក, រាជធានីភ្នំពេញ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-t border-gray-300" />

        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} <span className="font-semibold">Tos Trip_KH</span>. All rights reserved.
        </div>
      </div>
    </footer>

  );
};

export default FooterComponent;
