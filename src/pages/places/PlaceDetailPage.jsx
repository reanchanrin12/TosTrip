
import MapPlace from '../../components/map/MapPlace';
import MainDetailPlace from '../../components/places/MainDetailPlace';
import ReviewForm from '../../components/rating/ReviewForm';
import { ReviewGetData } from '../../components/rating/ReviewGetData';

const PlaceDetailPage = () => {
return (
    <main>
       <section className='px-[8%]'>
        <MainDetailPlace />
      </section>
    <section className='px-[8%]'><MapPlace /></section>
      <h1 className='text-center text-xl md:text-2xl lg:text-4xl'>មតិនិងកាវាយតម្លៃ</h1>
      <section className="flex flex-col md:flex-row items-center justify-center w-full px-4 sm:px-[8%] py-10 gap-10">
        <div className="w-full md:w-1/2 flex justify-start items-start">
          <ReviewGetData />
        </div>
        <div className="w-full md:w-1/3">
          <ReviewForm />
        </div>
      </section>
    </main>
  );
};

export default PlaceDetailPage;
