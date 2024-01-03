//import React from "react";
import React, { useState, useEffect } from "react";
import { useNavigate , Link } from "react-router-dom"
//import { IoIosAdd } from "react-icons/io"
import { BsHeart,BsHeartFill } from 'react-icons/bs'
import { useFavorites } from "../components/FavoritesContext";


const Suggestions = () => {
  const { favorites, toggleFavorite, isInFavorites } = useFavorites();


  const suggestions = [
    {
        id: 1,
        title: "suggestion 1",
        desc: "#jeans",
        img_1: "https://i.pinimg.com/736x/34/3f/1e/343f1ee9058363a3ee39ee1e03142c5e.jpg",
        img_2:"https://i.pinimg.com/736x/34/3f/1e/343f1ee9058363a3ee39ee1e03142c5e.jpg",
        img_3:"https://i.pinimg.com/736x/34/3f/1e/343f1ee9058363a3ee39ee1e03142c5e.jpg",
        img_4:"https://i.pinimg.com/736x/34/3f/1e/343f1ee9058363a3ee39ee1e03142c5e.jpg",
        date: "Jan 4 2022",
        href: "javascript:void(0)"

    },
    {
        id: 2,
        title: "suggestion 2",
        desc: "#jacket",
        img_1: "https://i.ebayimg.com/images/g/yA4AAOSwFglkNOe0/s-l1200.webp",
        img_2: "https://i.ebayimg.com/images/g/yA4AAOSwFglkNOe0/s-l1200.webp",
        img_3: "https://i.ebayimg.com/images/g/yA4AAOSwFglkNOe0/s-l1200.webp",
        img_4: "https://i.ebayimg.com/images/g/yA4AAOSwFglkNOe0/s-l1200.webp",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        id: 3,
        title: "suggestion 3",
        desc: "#shoes",
        img_1: "https://fashionista.com/.image/t_share/MTY3MTkyNTM2NzE1MTA5ODI1/uniqlo-u-sweatshirt.jpg",
        img_2:"https://fashionista.com/.image/t_share/MTY3MTkyNTM2NzE1MTA5ODI1/uniqlo-u-sweatshirt.jpg",
        img_3:"https://fashionista.com/.image/t_share/MTY3MTkyNTM2NzE1MTA5ODI1/uniqlo-u-sweatshirt.jpg",
        img_4:"https://fashionista.com/.image/t_share/MTY3MTkyNTM2NzE1MTA5ODI1/uniqlo-u-sweatshirt.jpg",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        id: 4,
        title: "suggestion 4",
        desc: "#hoodie",
        img_1: "https://torontolife.com/wp-content/uploads/2023/11/Canada-Goose-Inline.png",
        img_2:"https://torontolife.com/wp-content/uploads/2023/11/Canada-Goose-Inline.png",
        img_3:"https://torontolife.com/wp-content/uploads/2023/11/Canada-Goose-Inline.png",
        img_4:"https://torontolife.com/wp-content/uploads/2023/11/Canada-Goose-Inline.png",
        // authorLogo: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg",
        // authorName: "Lourin",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    }
]
  return(
    
  // <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8 font-montserrat text-white">
  <div>
    <div className="flex justify-between text-white font-montserrat px-2 sm:px-6 md:px-36 py-4">
        <div className="flex border-b-2 border-[#201B21] border-opacity-60 w-[220px] md:w-[300px] lg:w-[404px] pl-2 sm:pl-4 pb-4">
          <Link 
            to={'/app/favorites'}
            className="mr-6 md:mr-20 text-white text-opacity-60 hover:text-opacity-70">
            favorites
          </Link>
          <div>
            suggestions
          </div>
        </div>
      </div>
  
  
  <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8 font-montserrat text-white"> 
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-left flex-wrap mt-6">
  {suggestions.map((item, key) => (
    <article
    className=" relative bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl"
      key={key}
    >
      <div className='flex flex-wrap justify-center w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]'>
        <img //image + title
          src={item.img_1}
          className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
          loading="lazy"
          alt={item.title}
          //className="w-full h-[240px] bg-white rounded-t-2xl shadow-3xl"
        />
        <img //image + title
          src={item.img_2}
          className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
          loading="lazy"
          alt={item.title}
        />
        <img //image + title
          src={item.img_3}
          className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
          loading="lazy"
          alt={item.title}
        />
        <img //image + title
          src={item.img_3}
          className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px]"
          loading="lazy"
          alt={item.title}
        />
        </div>

        <div className="pt-3 ml-4 mr-2 mb-3">
        <h3 className="text-xl text-white-700">{item.title}</h3>
        <p className="text-[#EBEBF5] text-opacity-60">{item.desc}</p>
      </div>
      <button
                className={`absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full focus:outline-none hover:bg-opacity-30 transition duration-300`}
                onClick={() => {
                  toggleFavorite(item);
                }}
              >
                {isInFavorites(item.id) ? (
                  <BsHeartFill className="text-white" />
                ) : (
                  <BsHeart className="text-white opacity-100" />
                )}
              </button>
    </article>
  ))}
</div>
{/* <h1>Favorite list</h1>
      <ul>
        {favorites.map(item =>
          isInFavorites(item.id) === true ? <li key={item.id}>{item.title}</li> : null
        )}
      </ul> */}
</section>
  </div>
  )
}

export default Suggestions;