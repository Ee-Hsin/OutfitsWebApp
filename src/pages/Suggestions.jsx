//import React from "react";
import { useNavigate , Link } from "react-router-dom"
//import { IoIosAdd } from "react-icons/io"
import { BsHeart } from 'react-icons/bs'


const Suggestions = () => {
  const navigate = useNavigate()

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if(file){
      console.log(file);
      navigate("/app/upload", {state:{file: file}});
    }
  }

  const saved = [
    {
        title: "Outfit 1",
        desc: "#jeans",
        img: "https://i.pinimg.com/736x/34/3f/1e/343f1ee9058363a3ee39ee1e03142c5e.jpg",
        authorLogo: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
        authorName: "Sidi dev",
        date: "Jan 4 2022",
        href: "javascript:void(0)"

    },
    {
        title: "Outfit 2",
        desc: "#jacket",
        img: "https://i.ebayimg.com/images/g/yA4AAOSwFglkNOe0/s-l1200.webp",
        authorLogo: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg",
        authorName: "Micheal",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "Outfit 3",
        desc: "#shoes",
        img: "https://fashionista.com/.image/t_share/MTY3MTkyNTM2NzE1MTA5ODI1/uniqlo-u-sweatshirt.jpg",
        authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
        authorName: "Luis",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "Outfit 4",
        desc: "#hoodie",
        img: "https://torontolife.com/wp-content/uploads/2023/11/Canada-Goose-Inline.png",
        authorLogo: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg",
        authorName: "Lourin",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    }
]
  return(
    
  <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8 font-montserrat text-white">
  {/*<div className="flex items-center justify-between">
    <div className="flex">
      <button
        className="border-b-2 border-[#201B21] border-opacity-60 text-sm px-3 pb-2 focus:outline-none transition duration-300 ease-in-out hover:border-indigo-500 focus:border-indigo-500"
        onClick={() => {
          // Handle favorites button click
        }}
      >
        Favorites
      </button>
      <button
        className="border-b-2 border-[#201B21] border-opacity-60 text-sm px-3 pb-2 focus:outline-none ml-3 transition duration-300 ease-in-out hover:border-indigo-500 focus:border-indigo-500"
        onClick={() => {
          // Handle suggestion button click
        }}
      >
        Suggestions
      </button>
    </div>
    <input
      type="file"
      id="fileInput"
      onChange={handleFileInput}
      accept="image/*" // only accept image
      style={{ display: 'none' }} // hide default input style
    />
    <button
      onClick={() => document.getElementById('fileInput').click()}
      className="flex items-center bg-white bg-opacity-40 text-sm px-3 py-2 rounded-3xl shadow-xl hover:bg-opacity-50 focus:outline-none"
    >
      Create
      <IoIosAdd className="text-2xl ml-1" />
    </button>
      </div>*/}
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

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center mt-8">
  {saved.map((items, key) => (
    <article
      className="relative bg-white bg-opacity-20 w-[300px] h-[450px] mb-8 rounded-2xl shadow-xl overflow-hidden"
      key={key}
    >
      <a href={items.href} className="flex flex-col h-full">
        <img
          src={items.img}
          loading="lazy"
          alt={items.title}
          className="w-full h-[240px] bg-white rounded-t-2xl shadow-3xl"
        />
        <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
          <div className="flex-none w-10 h-10 rounded-full">
            <img
              src={items.authorLogo}
              className="w-full h-full rounded-full"
              alt={items.authorName}
            />
          </div>
          <div className="ml-3">
            <span className="block text-white-900">{items.authorName}</span>
            <span className="block text-white-400 text-sm">{items.date}</span>
          </div>
        </div>
        <div className="pt-3 ml-4 mr-2 mb-3">
          <h3 className="text-xl text-white-700">{items.title}</h3>
          <p className="text-[#EBEBF5] text-opacity-60">{items.desc}</p>
        </div>
        <button
          className="absolute bottom-4 right-4 flex items-center justify-center w-8 h-8 bg-white bg-opacity-20 rounded-full focus:outline-none"
          onClick={() => {
            // Handle heart button click
          }}
        >
          <BsHeart className="text-white-500" />
        </button>
      </a>
    </article>
  ))}
</div>
  </section>
  )
}

export default Suggestions;