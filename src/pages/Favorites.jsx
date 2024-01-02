import { useNavigate } from "react-router";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react";
import Suggestions from "./Suggestions.jsx";


const Favorites = () => {
  const sampleImgUrl = "https://www.thesupermade.com/cdn/shop/products/The-Supermade-Sunflower-Couple-Sports-Skate-Shoes_1_2048x2048.jpg?v=1679891170"

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(suggestions);
  }, []);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  function handleFavorite(id) {
    const newFavorites = favorites.map(item => {
      return item.id === id ? { ...item, favorite: !item.favorite } : item;
    });

    setFavorites(newFavorites);
  }

  return(
    <div>
      <div className="flex justify-between text-white font-montserrat px-2 sm:px-6 md:px-36 py-4">
        <div className="flex border-b-2 border-[#201B21] border-opacity-60 w-[220px] md:w-[300px] lg:w-[404px] pl-2 sm:pl-4 pb-4">
          <div className="mr-6 md:mr-20">
            favorites
          </div>
          <Link 
            to={'/app/suggestions'}
            className="text-white text-opacity-60 hover:text-opacity-70">
            suggestions
          </Link>
        </div>
        <input
          type="file"
          id="fileInput"
          //onChange={handleFileInput}
          accept="image/*" // only accept image
          style={{ display: "none" }} // hide default input style
        />
        <Link
          to={"/app/create"}
          className="flex items-center bg-white bg-opacity-40 w-32 pl-8 rounded-3xl shadow-xl hover:bg-opacity-50"
        >
          create
          <IoIosAdd className="text-2xl" />
        </Link>
      </div>
      
      <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8 font-montserrat text-white"> 
      {/* <div className="flex justify-center"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-left flex-wrap mt-6">
          {/* container for all cards */}
          <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl">
            {/* container for one card */}
            <div className='flex flex-wrap justify-center w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]'>
              {/* sample img */}
              <img 
                src ={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl} 
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
            </div>
            <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                {/* name and tag */}
                <div className=' mb-[9px] mt-[5px] ml-[9px]'>
                  outfit 1
                </div>
                <div className='text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]'>
                  #sneaker #pink #graphic
                </div>
              </div>
          </div>
          
          <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl">
            {/* container for one card */}
            <div className='flex flex-wrap justify-center w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]'>
              {/* sample img */}
              <img 
                src ={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl} 
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
            </div>
            <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                {/* name and tag */}
                <div className=' mb-[9px] mt-[5px] ml-[9px]'>
                  outfit 2
                </div>
                <div className='text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]'>
                  #sneaker #pink #graphic
                </div>
              </div>
          </div>

          <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl">
            {/* container for one card */}
            <div className='flex flex-wrap justify-center w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]'>
              {/* sample img */}
              <img 
                src ={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl} 
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
            </div>
            <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                {/* name and tag */}
                <div className=' mb-[9px] mt-[5px] ml-[9px]'>
                  outfit 3
                </div>
                <div className='text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]'>
                  #sneaker #pink #graphic
                </div>
              </div>
          </div>

          <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl">
            {/* container for one card */}
            <div className='flex flex-wrap justify-center w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]'>
              {/* sample img */}
              <img 
                src ={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl} 
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
            </div>
            <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                {/* name and tag */}
                <div className=' mb-[9px] mt-[5px] ml-[9px]'>
                  outfit 4
                </div>
                <div className='text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]'>
                  #sneaker #pink #graphic
                </div>
              </div>
          </div>

          <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl">
            {/* container for one card */}
            <div className='flex flex-wrap justify-center w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]'>
              {/* sample img */}
              <img 
                src ={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl} 
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
              <img 
                src={sampleImgUrl}
                alt="uploaded img" 
                className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
              />
            </div>
            <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                {/* name and tag */}
                <div className=' mb-[9px] mt-[5px] ml-[9px]'>
                  outfit 5
                </div>
                <div className='text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]'>
                  #sneaker #pink #graphic
                </div>
              </div>
          </div>
          
          
          
        </div>
        <h1>Favorite list</h1>
      <ul>
        {favorites.map(item =>
          item.favorite === true ? <li key={item.id}>{item.title}</li> : null
        )}
      </ul>
      </section>
    </div>
  )
}

export default Favorites;