import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import getData from "../../services/get/getData";
import { Link } from "react-router";
import Rating from "../rating/Rating";

export default function CardPlace() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const categoryFilter = [
    "តំបន់វាលរាប", "តំបន់ភ្នំ", "តំបន់ប្រាសាទ", "តំបន់កោះ", "ទីក្រុង"
  ];

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      const data = await getData("places");
      console.log("Fetched Data:", data);
      if (data) {
        const filteredPlaces = data.filter((place) =>
          categoryFilter.includes(place.category?.name)
        );
        setPlaces(filteredPlaces);
      }
      setLoading(false);
    }
    fetchPlaces();
  }, []);

  return (
    <section className="flex flex-wrap justify-center gap-7 bg-white mt-5 min-h-[300px]">
      {loading ? (
        <div className="flex justify-center items-center w-full h-64">
          {/* <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div> */}
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>

        </div>
      ) : (
        places.slice(0, 6).map((place) => (
          <div
            key={place.id}
            className="max-w-sm w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
          >
            <Link
              to={`/place/${place.uuid}`}
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
        ))
      )}
    </section>
  );
}
