import React from 'react';

import pheng from '../../../assets/Menber/pheng.png';
import Lyzhia from '../../../assets/Menber/Lyzhia1.png'
const Mentor = [
  { name: "គីម ចាន់សុផេង", role: "អ្នកណែនាំ", image: pheng },
  { name: "អ៊ឹង លីហ៊្សា", role: "អ្នកណែនាំ", image: Lyzhia },

];
const AboutMentor = () => {
  return (
    <section className="px-4 py-10 md:px-10 flex flex-col items-center text-center font-[Suwannaphum]">
      <h1 className="text-2xl md:text-4xl  text-Primary  mb-10 md:mb-12">
        អ្នកណែនាំរបស់យើង
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

        {
          Mentor.map((member, index) => (
            <div className="relative rounded-lg overflow-hidden shadow-lg" key={index}>
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute bottom-0 bg-black/50  text-white w-full text-center p-4">
                <p className="text-lg md:text-xl font-bold text-Primary">{member.name}</p>
                <p className="text-sm mt-2 te">{member.role}</p>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default AboutMentor;
