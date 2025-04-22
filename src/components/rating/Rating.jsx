import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import getData from "../../services/get/getData";

const Rating = ({ placeUuid }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    async function fetchRating() {
      if (!placeUuid) return;

      const data = await getData(`reviews/places/${placeUuid}`);
      console.log("Fetched Reviews:", data);

      if (Array.isArray(data) && data.length > 0) {
        const total = data.reduce((sum, review) => sum + review.rating, 0);
        const average = total / data.length;
        setAverageRating(Math.round(average));
      } else {
        setAverageRating(0);
      }
    }

    fetchRating();
  }, [placeUuid]);

  return (
    <div className="flex items-center mt-4">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`text-xl ${
            index < averageRating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 sm:ml-3 md:ml-4 lg:ml-5 
         text-xs 
         px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1 lg:px-2.5
         rounded sm:rounded-md md:rounded-md 
      text-white bg-Primary">
        {averageRating}
      </span>
    </div>
  );
};

export default Rating;
