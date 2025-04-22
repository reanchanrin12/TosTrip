import React, { useEffect, useState } from 'react';
import getData from '../../services/get/getData';

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getData('places');
        console.log('Fetched places:', data);
        setPlaces(data);
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">ទីកន្លែងទាំងអស់</h1>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.map((place) => (
            <div key={place.id} className="p-4 border rounded-lg shadow hover:shadow-md transition duration-300 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">{place.name}</h2>
              <p className="text-gray-600 mt-2">{place.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Places;
