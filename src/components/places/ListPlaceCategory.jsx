import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import getData from "../../services/get/getData";
import { Link } from "react-router";
import place1 from "../../assets/Category/temple.jpg";
import place2 from "../../assets/Category/Phnom-Penh.jpg";
import place3 from "../../assets/Category/PlainArea.jpg";
import place4 from "../../assets/Category/korkkungkrav.jpeg";
import place5 from "../../assets/Category/OralMountain.jpg";

const Images = [place1, place4, place5, place3, place2];

export function ListPlaceCategory() {
  const [typeCategory, setTypeCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      const data = await getData("categories");
      setTypeCategory(data);
      setLoading(false);
      console.log("Category:", data);
    }
    fetchPlaces();
  }, []);

  return (
    <section className="p-4 bg-white min-h-[300px]">
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {typeCategory.map((item, index) => (
            <Link
              to={`/category/${item.uuid}`}
              onClick={() => setTimeout(() => window.location.reload(), 0)}
              key={item.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <Card
                className="relative h-48 bg-cover bg-center rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${Images[index % Images.length]})`,
                }}
              >
                
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-10 transition-all duration-500 ease-out">
                  <h3 className="text-xl text-center">{item.name}</h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
