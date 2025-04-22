import { Carousel } from "flowbite-react";
import img1 from '../../../assets/Category/1.Koh ker.jpg';
import img2 from '../../../assets/Category/Phnom-Penh.jpg';
import img3 from '../../../assets/Category/3.PV.jpg';
import img4 from '../../../assets/Category/korkkungkrav.jpeg';
import img5 from '../../../assets/Category/p1.jpeg';
import img6 from '../../../assets/Category/4.Gopura III.jpg';

const images = [
  { image: img1 },
  { image: img2 },
  { image: img3 },
  { image: img4 },
  { image: img5 },
  { image: img6 },
];

const PlacesBanner = () => {
  return (
    <div>
      <div className="h-56 sm:h-100 xl:h-120 2xl:h-130">
        <Carousel slideInterval={1000}>
          {images.map((image, index) => (
            <div
              key={index}
              className="h-full w-full flex justify-center items-center object-cover"
            >
              <img
                className="h-full w-full object-cover rounded-lg"
                src={image.image}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default PlacesBanner;
