import React, { useEffect, useState } from "react";
import getData from "../../services/get/getData";
import { Spinner } from "flowbite-react";
import { Link } from "react-router";
import Rating from "../rating/Rating";
import { RiArrowDropDownLine } from "react-icons/ri";
export default function CategoryList() {
  const [places, setPlaces] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [placesData, categoriesData] = await Promise.all([
          getData("places"),
          getData("categories"),
        ]);
        setPlaces(placesData);
        setCategoryList(categoriesData);
        setFiltered(placesData);
      } catch (error) {
        console.error("Error fetching categories or places:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let list = [...places];
    if (selectedCategory) {
      list = list.filter((place) => place.category?.name === selectedCategory);
    }
    if (search) {
      list = list.filter((place) =>
        place.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFiltered(list);
    setVisibleCount(12);
  }, [search, selectedCategory, sortBy, places]);

  const handleSelect = (value) => {
    setSelectedCategory(value);
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-end items-start gap-5">
        <input
          type="text"
          placeholder="ស្វែងរកទីកន្លែង..."
          className="border p-2 rounded w-full sm:w-1/2 mt-4 sm:mt-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-Primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
         <div className="relative ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-[200px] border border-gray-300 p-2 rounded bg-white text-left text-gray-800 focus:outline-none focus:ring-2 focus:ring-Primary"
          >
            <p className="flex items-center justify-between w-full">{selectedCategory || "កន្លែងទេសចរណ៍​ទាំងអស់"} <RiArrowDropDownLine /></p>
          </button>
          {isOpen && (
            <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
              <li
                className="px-4 py-2 hover:bg-Primary hover:text-white cursor-pointer"
                onClick={() => handleSelect("")}
              >
                កន្លែងទេសចរណ៍​ទាំងអស់  
              </li>
              {categoryList.map((cat) => (
                <li
                  key={cat.name}
                  className="px-4 py-2 hover:bg-Primary hover:text-white cursor-pointer"
                  onClick={() => handleSelect(cat.name)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <hr className="my-8 border-t border-gray-300" />
      {loading ? (
        <div className="flex justify-center items-center mt-10">
         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>

        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-4 sm:px-8 lg:px-16 place-items-center">
            {filtered.slice(0, visibleCount).map((place) => (
              <div
                key={place.id}
                className="max-w-sm w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <Link to={`/place/${place.uuid}`}
                  onClick={() => setTimeout(() => window.location.reload(), 0)}
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={
                      place.imageUrls?.[0] ||
                      "https://eacnews.asia/uploads/images/10265/EAC-NEWS-2022-03-17.png"
                    }
                    alt={place.name}
                  />
                </Link>
                <div className="p-4">
                  <h5 className="text-xl font-semibold text-gray-800 truncate">
                    {place.name || "No place"}
                  </h5>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {place.description || "No description"}
                  </p>
                  <Rating placeUuid={place.uuid} />
                </div>
              </div>
            ))} 
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 mt-10">គ្នានទីកន្លែងដែលអ្នកស្វែងរកទេនោះទេ </p>
          )}
          {visibleCount < filtered.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setVisibleCount((prev) => prev + 12);
                  setTimeout(() => window.scrollBy(0, 300), 200);
                }}
                className="px-6 py-2 bg-Primary text-white rounded-lg hover:bg-orange-400 transition duration-300 cursor-pointer"
              >
                មើលបន្ថែម
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
