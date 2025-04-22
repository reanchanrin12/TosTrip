import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import getData from '../../services/get/getData';

const MainDetailPlace = () => {
  const [place, setPlace] = useState(null);
  const { uuid } = useParams();

  useEffect(() => {
    async function fetchPlace() {
      try {
        const data = await getData(`places/${uuid}`);
        console.log("Fetched place data:", data);
        setPlace(data);
      } catch (error) {
        console.error('Error fetching place data:', error);
      }
    }

    fetchPlace();
  }, [uuid]);

  if (!place) {
    return <div className="text-center mt-10 text-xl ">Loading...</div>;
  }
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="container mx-auto px-4 py-5 ">
        <div className="flex flex-col md:flex-row gap-6  ">
          <div className="w-full md:w-2/3">
            <img
              src={place.imageUrls?.[0]}
              alt={place.name}
              className="w-full h-[550px] object-cover "
            />
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            {place.imageUrls?.slice(1, 4).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${place.name} small ${index + 1}`}
                className="w-full h-[163px] object-cover  shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
      <section className="mt-12">
        <h2 className="text-heade font-extrabold text-2xl md:text-3xl mb-4">{place.name}</h2>
        <hr className="my-4 border-t border-gray-300" />
        <p className="text-md md:text-lg lg:xl text-Secondary leading-relaxed">{place.description}</p>
      </section>
    </div>
  )
}

export default MainDetailPlace
