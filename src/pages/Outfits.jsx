import React from "react";
import { useNavigate } from "react-router"
import { IoIosAdd } from "react-icons/io"


const Outfits = () => {
  const navigate = useNavigate()

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if(file){
      console.log(file);
      navigate("/app/upload", {state:{file: file}});
    }
  }

  const handleButtonClick = () => {
    // Handle button click
  };

  const saved = [
    {
        title: "Outfit 1",
        desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people what they did for their anxiety, and some",
        img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        authorLogo: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
        authorName: "Sidi dev",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "Outfit 2",
        desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations about Whittington will be featured in the film",
        img: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        authorLogo: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg",
        authorName: "Micheal",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "Outfit 3",
        desc: "#",
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
        authorName: "Luis",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "Outfit 4",
        desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",
        img: "https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        authorLogo: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg",
        authorName: "Lourin",
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    }
]
  return(
  //   <div className="flex justify-between text-white font-montserrat px-36 py-4">
  //   <div className="flex">
  //     <button
  //       className="border-b-2 border-[#201B21] border-opacity-60 w-[30%] pl-4 pb-4 focus:outline-none mr-5"
  //       onClick={() => {
  //         // Handle favorites button click
  //       }}
  //     >
  //       Favorites
  //     </button>
  //     <button
  //       className="border-b-2 border-[#201B21] border-opacity-60 w-[30%] pl-4 pb-4 focus:outline-none mr-5"
  //       onClick={() => {
  //         // Handle suggestion button click
  //       }}
  //     >
  //       Suggestions
  //     </button>
  //   </div>
    
  //   <input
  //     type="file"
  //     id="fileInput"
  //     onChange={handleFileInput}
  //     accept="image/*"  // only accept image
  //     style={{display:"none"}}  // hide default input style
  //   />
  //   <button
  //     onClick={() => document.getElementById("fileInput").click()}
  //     className="flex items-center bg-white bg-opacity-40 w-32 pl-8 rounded-3xl shadow-xl hover:bg-opacity-50"
  //   >
  //     upload
  //     <IoIosAdd className="text-2xl" />
  //   </button>
  // </div>
  <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8 font-montserrat text-white">
    <div className="flex justify-between">
      <button
        className="border-b-2 border-[#201B21] border-opacity-60 w-[30%] pl-4 pb-4 focus:outline-none mr-5"
        onClick={() => {
          // Handle favorites button click
        }}
      >
        Favorites
      </button>
      <button
        className="border-b-2 border-[#201B21] border-opacity-60 w-[30%] pl-4 pb-4 focus:outline-none mr-5"
        onClick={() => {
          // Handle suggestion button click
        }}
      >
        Suggestions
      </button>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileInput}
        accept="image/*" // only accept image
        style={{ display: 'none' }} // hide default input style
      />
      <button
        onClick={() => document.getElementById('fileInput').click()}
        className="flex items-center bg-white bg-opacity-40 w-32 pl-8 rounded-3xl shadow-xl hover:bg-opacity-50"
      >
        Upload
        <IoIosAdd className="text-2xl" />
      </button>

      <button
      onClick={handleButtonClick}
      className="fi fi-ts-circle-heart"
      // Add any additional styling or attributes as needed
    ></button>
    </div>

  <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {
          saved.map((items, key) => (
              <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={key}>
                  <a href={items.href}>
                      <img src={items.img} loading="lazy" alt={items.title}  className="w-full h-48 rounded-t-md" />
                      <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                          <div className="flex-none w-10 h-10 rounded-full">
                              <img src={items.authorLogo} className="w-full h-full rounded-full" alt={items.authorName} />
                          </div>
                          <div className="ml-3">
                              <span className="block text-gray-900">{items.authorName}</span>
                              <span className="block text-gray-400 text-sm">{items.date}</span>
                          </div>
                      </div>
                      <div className="pt-3 ml-4 mr-2 mb-3">
                          <h3 className="text-xl text-gray-900">
                              {items.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">{items.desc}</p>
                      </div>
                  </a>
              </article>
          ))
      }
  </div>
</section>
  )
}

export default Outfits;