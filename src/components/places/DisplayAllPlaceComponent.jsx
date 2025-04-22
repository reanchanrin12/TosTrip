import { Card } from "flowbite-react";

import React, { useEffect, useState } from "react";
import getData from "../../services/get/getData";
// import Rating from "../rating/Rating";
import { Link } from "react-router";

export function CardPlaceAll() {
  const [places, setPlaces] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function fetchPlaces() {
      const data = await getData("places");
      const categories = await getData(`categories/${param.uuid}`);
      setCategory(categories);
      // console.log("Fetched Data:", data);
      setPlaces(data);

    }
    fetchPlaces();
  }, []);
  return (
    <section className="flex flex-wrap gap-4 bg-white mt-5">
          {places.map((place) => (
            <Card key={place.id}  className="max-w-sm  bg-white ">
              <Link to={`/place/${place.uuid}`}
              onClick={() => setTimeout(() => window.location.reload(), 0)}
              >
                <img
                  className="rounded-t-lg  object-cover"
                  src={place.imageUrls[0] || "https://eacnews.asia/uploads/images/10265/EAC-NEWS-2022-03-17.png"}
                  alt={place.name}
                />
              </Link>
              <div className="p-4">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                  {place.name || "No place"}
                </h5>
                <p className="font-normal text-gray-700 line-clamp-3">
                  {place.description || "No description"}
                </p>
                {/* <Rating  /> */}
              </div>
            </Card>
          ))}
    </section>
  );
}
