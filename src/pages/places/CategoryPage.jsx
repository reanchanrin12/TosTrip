import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import getData from "../../services/get/getData";
import Rating from "../../components/rating/Rating";

const CategoryPage = () => {
  const { uuid } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchPlace() {
      try {
        const data = await getData(`categories/${uuid}`);
        console.log("Fetched place data:", data);
        setCategory(data);
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    }

    fetchPlace();
  }, [uuid]);

  if (!category) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 px-[5%] w-full">
      <div className="flex flex-col justify-center items-center mb-6 w-full">
        {category?.places?.[0]?.imageUrls?.[0] && (
          <div
            className="relative rounded-lg mb-6 w-full h-[250px] sm:h-[400px] md:h-[500px]"
            style={{
              backgroundImage: `url(${category.places[0].imageUrls[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 grayscale-25 rounded-lg"></div>
            <div className="absolute top-1/2 left-1/2 bg-black/30 backdrop-blur-sm rounded-sm p-10 transform -translate-x-1/2 -translate-y-1/2 text-heade z-10 text-center px-2">
              <h1 className="text-3xl sm:text-5xl text-Primary md:text-6xl font-bold mb-4">
                {category.name}
              </h1>
              <p className="text-sm sm:text-base line-clamp-3 md:line-clamp-5 md:text-lg text-white max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>
          </div>
        )}
      </div>

      <hr className="my-8 border-t border-gray-300" />
      <h1 className="text-center mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-heade">
        {category.name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.places.map((place) => (
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
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
