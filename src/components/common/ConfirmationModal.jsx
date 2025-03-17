import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';  // Importing React Icons

const ConfirmationModal = ({ modalData }) => {
  return (
    <div>
      {/* Modal Container */}
      <div className="w-11/12 max-w-[350px] rounded-lg bg-gradient-to-r from-[#3a3a3a] to-[#6a6a6a] p-6 z-50 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-[#00000060]">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData.text2}
        </p>
        {/* Button Section */}
        <div className="flex items-center justify-between gap-x-4">
          {/* Confirm Button (Icon Inside Button) */}
          <button
            onClick={modalData?.btn1Handler}
            className="flex items-center bg-gradient-to-r from-[#2a9d8f] to-[#06d6a0] rounded-lg px-6 py-3 text-lg text-richblack-900 font-semibold transition-all duration-300 hover:bg-[#018f73] hover:text-white"
          >
            <FaCheck className="mr-2 text-xl" />
            {modalData?.btn1Text}
          </button>

          {/* Cancel Button (Icon Inside Button) */}
          <button
            onClick={modalData?.btn2Handler}
            className="flex items-center bg-[#EF476F] cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-white transition-all duration-300 transform hover:bg-[#d13350] hover:scale-105"
          >
            <FaTimes className="mr-2 text-xl" />
            {modalData?.btn2Text}
          </button>
        </div>
      </div>

      {/* Overlay Background */}
      <div className="fixed inset-0 z-10 grid place-items-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm"></div>
    </div>
  );
};

export default ConfirmationModal;
