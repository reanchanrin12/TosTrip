import React from 'react';
import LoginForm from '../../components/authComponent/LoginForm';
import pic from '../../assets/authImage/Mobile login-rafiki.png';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 font-[Suwannaphum]">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-3xl shadow-lg bg-[#fff7f5]">
        
        
        <div className="hidden md:flex w-1/2 items-center justify-center p-8">
          <img
            src={pic}
            alt="Login background"
            className="w-full max-h-[500px] object-contain transition-transform duration-300"
          />
        </div>
        <div className="w-full md:w-1/2 p-10 flex items-center justify-center bg-[#fff7f5]">
          <LoginForm />
        </div>

      </div>
    </div>
  );
};

export default Login;
