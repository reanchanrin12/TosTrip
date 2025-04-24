import React from 'react';
import RegisterForm from '../../components/authComponent/RegisterForm';
import pic from '../../assets/authImage/Sign up-amico.png';

const Register = () => {
  return (
    <div className="min-h-screen overflow-hidden flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-3xl shadow-lg bg-[#fcf5f5]">
        <div className="hidden md:flex w-1/2 overflow-hidden items-center justify-center bg-[#fcf5f5] p-8">
          <img 
            src={pic} 
            alt="Register" 
            className="w-full h-auto max-h-[500px] object-contain transition-transform duration-300"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#fcf5f5] px-8 py-12">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
