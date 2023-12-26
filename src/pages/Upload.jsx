//import React from "react";
import { useLocation, useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";


const Upload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { file } = location.state || {};

  if(!file){    // when file is not available in the state
    return <div>No image selected</div>
  }

  return(
    <div >
      <div className="flex text-white font-montserrat py-4">
        <button onClick={() => navigate("/app/closet")} className="pl-10 pr-16 text-xl">
          <IoIosArrowBack />
        </button>
        <div className="border-b-2 border-[#201B21] border-opacity-60 w-[26%] pl-4 pb-4">
          Categorize your item
        </div>
      </div>
      <div className="flex items-center justify-between px-36 py-24">
        <div className="relative w-96 h-96 bg-white rounded-2xl shadow-3xl">
          <img 
            src={URL.createObjectURL(file)} 
            alt="selected image"
            className="w-full h-full object-cover rounded-2xl"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div>
          hi
        </div>



      </div>
    </div>
  )
}

export default Upload;