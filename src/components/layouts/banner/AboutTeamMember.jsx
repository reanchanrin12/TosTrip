import React from 'react';
import rin from '../../../assets/Menber/rin1.png';
import sokha from '../../../assets/Menber/sokha.png';
import tola from '../../../assets/Menber/tola.png';
import hng from '../../../assets/Menber/l.png';
import Ton from '../../../assets/Menber/Ton.png';
import reator from '../../../assets/Menber/tor.png';
import na from '../../../assets/Menber/na.png'
import lang from'../../../assets/Menber/long.png'
import vin from '../../../assets/Menber/vin.png'
import daline from '../../../assets/Menber/dalin.jpg'

const teamMembers = [
    { name: "រៀន ចាន់រីន", role: "ប្រធានក្រុម", image: rin },
    { name: "យឹម សុខា", role: "អនុប្រធាន", image: sokha },
    { name: "ឌីតា រុិកទ័រ", role: "សមាជិក", image: reator },
    { name: "ម៉ៃ​ សុខលីណា", role: "សមាជិក", image: na },
    { name: "ហេង ល័ងឈ័រ", role: "សមាជិក", image: hng },
    { name: "សាយ គីមឡុង", role: "សមាជិក", image: lang },
    { name: "តុង​​ ទីន", role: "សមាជិក", image: Ton },
    { name: "ជិន​ ណារិន", role: "សមាជិក", image: vin },
    { name: "អាន ដាលីន", role: "សមាជិក", image: daline },
    { name: "ណំ តុលា", role: "សមាជិក", image: tola },
];

const AboutTeamMember = () => {
    return (
        <div className='py-10'>
            <h1 className="text-2xl md:text-4xl text-center text-Primary mb-10 md:mb-12">
                សមាជិក
            </h1>

            
            <div className="flex justify-center gap-6 flex-wrap px-4 md:px-[8%] mb-6">
                {teamMembers.slice(0, 2).map((member, index) => (
                    <div
                        key={index}
                        className="shadow-lg border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center bg-white w-full sm:w-[45%] md:w-[40%] lg:w-[30%]"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full mb-4 object-cover"
                        />
                        <h2 className="text-lg font-semibold">{member.name}</h2>
                        <p className="text-gray-500">{member.role}</p>
                    </div>
                ))}
            </div>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-[8%]">
                {teamMembers.slice(2).map((member, index) => (
                    <div
                        key={index}
                        className="shadow-lg border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center bg-white"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full mb-4 object-cover"
                        />
                        <h2 className="text-lg font-semibold">{member.name}</h2>
                        <p className="text-gray-500">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutTeamMember;
