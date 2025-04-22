import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapLocationDot } from "react-icons/fa6";
import getData from '../../services/get/getData';


const MapPlace = () => {
  const [mapData, setMapData] = useState(null);
  const param = useParams();

  useEffect(() => {
    async function fetchMap() {
      const data = await getData(`places/${param.uuid}`);
      setMapData(data);
      console.log(data);
    }
    fetchMap();
  }, [param.uuid]);

  if (!mapData) {
    return <div>Loading...</div>;
  }

  const { location, name, description } = mapData;
  const [lat, lng] = location.split(',').map(coord => parseFloat(coord));

  return (
    <div className='mb-10 pt-10 relative z-[-10]'>  
      <h2 className="text-heade   text-3xl mb-3 ml-3.5 flex gap-10"><FaMapLocationDot /> ទីតាំង</h2>
      <MapContainer center={[lat, lng]} zoom={13} style={{ height: '400px', width: '100%' }} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          className='overflow'
        />
        <Marker position={[lat, lng]}>
          <Popup >
            <strong>{name}</strong>
            <br />
            {description}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPlace;
