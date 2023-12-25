// import React from 'react';
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex justify-between items-center text-white bg-[#201B21] bg-opacity-60 h-28 px-10">
      <div className="flex items-center justify-between w-[40%]">
        <Link to="/" className="p-8 hover:text-[#d6ccde]">
          <h1 className="font-monoton text-3xl">Fitsss</h1>
        </Link>
        <ul className="flex font-montserrat text-lg">
          <Link to="/closet" className="p-8 hover:text-[#d6ccde]">
            Closet
          </Link>
          <Link to="/outfits" className="p-8 hover:text-[#d6ccde]">
            Outfits
          </Link>
        </ul>
      </div>

      <button className="font-amiko text-lg hover:text-[#d6ccde]">
        Logout
      </button>
    </div>
  )
}

export default Navbar
