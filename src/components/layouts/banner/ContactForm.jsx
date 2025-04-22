import React from 'react';
import hero2 from '../../../assets/At the office-rafiki.png';

const ContactForm = () => {
  return (
    <section className="bg-white  px-4 md:px-12 mt-10">
      <h1 className="text-2xl md:text-4xl text-center text-Primary mb-10 md:mb-12">
        ទំនាក់ទំនងមកកាន់យើង
      </h1>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={hero2}
            alt="Illustration"
            className="w-full max-w-[900px] h-auto object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold text-Primary mb-6 text-center">
            ទំនាក់ទំនងមកកាន់យើង
          </h2>

          <form
            action="https://formsubmit.co/tostrip53@gmail.com"
            method="POST"
            className="space-y-4"
          >
            {/* Optional: disable captcha */}
            <input type="hidden" name="_captcha" value="false" />
            {/* Optional: custom redirect after submit */}
            <input type="hidden" name="_next" value="http://localhost:5173/" />

            <div>
              <label className="block text-gray-700 font-medium mb-1">ឈ្មោះ</label>
              <input
                type="text"
                name="name"
                placeholder="ឈ្មោះ"
                required
                className="w-full border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">អាសយដ្ឋានអ៊ីមែល</label>
              <input
                type="email"
                name="email"
                placeholder="អាសយដ្ឋានអ៊ីមែល"
                required
                className="w-full border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">សារ</label>
              <textarea
                name="message"
                placeholder="សារ"
                required
                className="w-full border border-orange-300 rounded-lg p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full h-[50px] bg-Primary text-white rounded-lg font-medium hover:bg-orange-400 transition duration-300"
              >
                បញ្ជូន
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
