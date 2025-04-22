import React from 'react';
import place4 from '../../assets/popular-place/tour-img2.png';
import place2 from '../../assets/popular-place/tour-img3.png';
import place3 from '../../assets/popular-place/tour-img4.png';
import place7 from '../../assets/popular-place/tour-img7.png';
import place5 from '../../assets/popular-place/tour-img5.png';
import place6 from '../../assets/popular-place/tour-img6.png';
import place1 from '../../assets/popular-place/tour-mg.png';

const destinations = [
  { title: "បរមរាជ្យវាង", subtitle: "រាជធានី ភ្នំពេញ", image: place1, size: "col-span-1 row-span-1" },
  { title: "សែន មនោរម្យ", subtitle: "មណ្ឌលគីរី", image: place2, size: "col-span-1 row-span-1" },
  { title: "ប្រាសាទអង្គរវត្ត", subtitle: "ក្រុងសៀមរាប", image: place3, size: "col-span-2 row-span-1" },
  { title: "កោះរ៉ុង", subtitle: "ខេត្ត ព្រះសីហនុ", image: place7, size: "col-span-1 row-span-1" },
  { title: "គិរីរម្យ", subtitle: "ខេត្តកំពង់ស្ពឺ", image: place4, size: "col-span-1 row-span-1" },
  { title: "ភ្នំបូកគោ", subtitle: "ខេត្តកំពត", image: place6, size: "col-span-1 row-span-1" },
  { title: "ភ្នំក្រវ៉ាញ", subtitle: "ប៉ែកនរតី", image: place5, size: "col-span-1 row-span-1" },
];
const PopularPlaces = () => {
  return (
    <div className="py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[200px] md:auto-rows-[250px] ">
        {destinations.map((place, index) => (
          <div
            key={index}
            className={`relative rounded-lg overflow-hidden shadow-lg bg-cover bg-center ${place.size} group transition cursor-pointer duration-300 ease-in-out hover:shadow-xl  `}
            style={{ backgroundImage: `url(${place.image})` }}
          >
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-white p-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-10 transition-all duration-500 ease-out">
              <h2 className="text-lg md:text-2xl leading-10 font-bold text-center tracking-wider">{place.title}</h2>
              <p className="text-sm md:text-base">{place.subtitle}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );

};

export default PopularPlaces;
