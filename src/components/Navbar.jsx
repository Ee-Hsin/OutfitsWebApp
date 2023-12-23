import React from 'react';
import { useNavigate } from 'react-router';




const Navbar = () =>{
  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center text-white bg-[#201B21] bg-opacity-60 h-28 px-10'>
      <div className='flex items-center justify-between'>
        <h1 className='font-monoton text-3xl'>Fitsss</h1>

        <ul className='flex font-montserrat text-lg pl-40'>
          <button onClick={() => navigate('/closet')} className='p-4'>Closet</button>
          <button onClick={() => navigate('/outfits')}className='p-4'>Outfits</button>
        </ul>
      </div>
      

      <button className='font-amiko text-lg'>
        Logout
      </button>
      

    </div>
  )
}

export default Navbar