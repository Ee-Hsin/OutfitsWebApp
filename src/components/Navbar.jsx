// import React from 'react';
import { Link } from "react-router-dom"

const Navbar = () => {
  // const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center text-white bg-[#201B21] bg-opacity-60 h-28 px-10">
      <div className="flex items-center justify-between w-[40%]">
        <h1 className="font-monoton text-3xl">Fitsss</h1>

        <ul className="flex font-montserrat text-lg">
          <Link to={"/app/closet"} className="p-8 hover:text-[#d6ccde]">
            Closet
          </Link>
          <Link to={"/app/outfits"} className="p-8 hover:text-[#d6ccde]">
            Outfits
          </Link>
          <Link to={"/signup"} className="p-8 hover:text-[#d6ccde]">
            Signup
          </Link>
          <Link to={"/login"} className="p-8 hover:text-[#d6ccde]">
            LoginPage
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
