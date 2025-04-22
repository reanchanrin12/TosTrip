import React from 'react';
import LoginForm from '../../components/authComponent/LoginForm';
import pic from '../../assets/authImage/Mobile login-rafiki.png'
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-12 font-[Suwannaphum]">
      <div className="flex w-full max-w-6xl rounded-3xl shadow-lg   bg-[#fff7f5]">
        
        <div className="w-1/2 hidden md:flex">
          <img 
            src={pic}
            alt="Login background"
            className=" w-full object-cover "
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
