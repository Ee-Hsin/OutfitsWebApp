import React , { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoIosAdd } from "react-icons/io";
import { API_URL } from "../services/constants";
import { useAuth } from "../hooks/AuthContext";


const Closet = () => {
  const sampleImgUrl = "https://www.thesupermade.com/cdn/shop/products/The-Supermade-Sunflower-Couple-Sports-Skate-Shoes_1_2048x2048.jpg?v=1679891170"

  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const {user} = useAuth();

  useEffect(() => {
    // Fetch items from the API endpoint
    console.log(user);
    fetch(`${API_URL}/api/closet`, {
      method: "GET",
      headers: {
        //'Content-Type': 'application/json',
        "x-access-token": user,
      },
    })
      .then((response) => response.json())
      .then((data) => {setItem(data.items);
                  console.log(data);})
      .catch((error) => console.error('Error fetching items:', error));
  
  }, [user]);

  const handleFileInput = async (e) => {
    const file = e.target.files[0];

    if (file) {
      navigate("/app/upload", { state: { file: file } });
    }
  };

  return (
    <div>
      <div className="flex justify-between text-white font-montserrat px-2 sm:px-6 md:px-36 py-4">
        <div className="border-b-2 border-[#201B21] border-opacity-60 w-[30%] pl-2 sm:pl-4 pb-4">
          Uploaded items
        </div>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileInput}
          accept="image/*" // only accept image
          style={{ display: "none" }} // hide default input style
        />
        <button
          onClick={() => document.getElementById("fileInput").click()}
          className="flex items-center bg-white bg-opacity-40 w-32 pl-8 rounded-3xl shadow-xl hover:bg-opacity-50"
        >
          upload
          <IoIosAdd className="text-2xl" />
        </button>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-left mx-[120px]">
          {item.map((item) => (
              <div key={item._id} 
                className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl">
              <div className='relative w-[240px] h-[240px] bg-white rounded-[22px] shadow-3xl my-[16px] mx-[15px]'>
                {/* sample content */}
                <img 
                src={item.image} 
                alt="uploaded img" 
                className="w-full h-full object-cover rounded-[22px]"            
                />
              </div>
              <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                  {/* name and tag */}
                  <div className='mb-[9px] mt-[5px]'>
                    {item.name}
                  </div>
                  <div className='text-[#EBEBF5] text-opacity-60 w-[155px]'>
                    #{item.subcategory} #{item.color} #{item.hasGraphic}
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Closet;
