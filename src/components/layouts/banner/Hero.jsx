import React from 'react';
import hero2 from '../../../assets/hero2.png';
import hero3 from '../../../assets/hero9.png';
import hero4 from '../../../assets/hero4.png';
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from 'react-router';
const Hero = () => {
  return (
    <div className="bg-Snow p-10 rounded-lg flex flex-col lg:flex-row justify-between items-center font-[Suwannaphum] mt-2 mx-auto shadow-lg border border-gray-200">
      <div className="lg:w-1/2 text-center lg:text-left pb-10 md:flex-col lg:flex-col pl-9">
        <h1 className="text-3xl lg:text-5xl font-bold leading-10 md:leading-20 mt-4 text-heade">
          ការធ្វើដំណើរដ៏អស្ចារ្យដើម្បីបង្កើត  <span className="text-Primary">ការចងចាំដ៏មានន័យ</span>
        </h1>
        <p className="text-Secondary text-lg md:text-xl mt-4">
          ស្វែងរកទីកន្លែងទេសចរណ៍ក្នុងកម្ពុជាទាំងអស់ ដើម្បីលើកកម្ពស់វិស័យទេសចរណ៍ បង្កើតឱកាសការងារ និងផ្សព្វផ្សាយវប្បធម៌ជាតិអន្តរជាតិ។
        </p>
        <Link to="/place" onClick={() => setTimeout(() => window.location.reload(), 0)}>
          <Button color="#faa834" size="lg" className="bg-Primary text-white
               mt-10 px-6 py-3 rounded-lg flex  items-center justify-center  
             hover:bg-[#eb5a00] transition duration-300 ease-in-out cursor-pointer">
              ដំណើរទេសចរណ៍
            <HiOutlineArrowRight className="ml-2 h-5  w-5​" />
          </Button>
        </Link>
      </div>

    
      <div className="lg:w-1/2 flex flex-wrap justify-center items-center mt-10 lg:mt-0 gap-4">
        <img src={hero4} alt="Travel 3" className="rounded-[10px] shadow-md w-1/3 max-w-[140px] md:h-90 object-cover aspect-[9/16]" />
        <img src={hero2} alt="Travel 2" className="rounded-[10px] shadow-md w-1/3 max-w-[170px] md:h-110 object-cover aspect-[9/16]" />
        <img src={hero3} alt="Travel 1" className="rounded-[10px] shadow-md w-1/3 max-w-[140px] md:h-90 object-cover aspect-[9/16]" />
      </div>

    </div>
  );
};

export default Hero;
