import React from "react";
import { useNavigate } from 'react-router';
import { IoIosAdd } from "react-icons/io";

const Closet = () => {
  const navigate = useNavigate();

  return(
      <div className="flex justify-between text-white font-montserrat px-36 py-4">        
        <div className="border-b-2 border-[#201B21] border-opacity-60 w-[30%] pl-4 pb-4">
          Uploaded items
        </div>
        <button onClick={() => navigate('/upload')} className="flex items-center bg-white bg-opacity-40 w-32 pl-8 rounded-3xl shadow-xl hover:bg-opacity-50">
          upload
          <IoIosAdd className="text-2xl"/>
        </button>
      </div>
    
  );
}

export default Closet;