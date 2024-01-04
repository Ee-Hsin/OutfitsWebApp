import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { useCloset } from "../hooks/ClosetContext";
import API from "../services/api";
import { useAuth } from "../hooks/AuthContext";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Create = () => {
  //const navigate = useNavigate();
  const { uploadedItems } = useCloset();
  //const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const { user } = useAuth();
  const toggleSelectItem = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        console.log(prevSelectedItems);
        // Item is already selected, remove it
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        // Item is not selected, add it
        return [...prevSelectedItems, itemId];
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between text-white font-montserrat">
        {/* top nav */}
        <div className="flex py-4 ">
          {/* top left */}
          <Link
            to={"/app/favorites"}
            className="pl-4 pr-6 md:pl-10 md:pr-16 text-xl"
          >
            <IoIosArrowBack />
          </Link>
          <div className="hidden md:block border-b-2 border-[#201B21] border-opacity-60 w-[220px] md:w-[300px] lg:w-[404px] pl-2 sm:pl-4 pb-4">
            select items to create your outfits
          </div>
        </div>
        <div className="flex mr-6 md:mr-8 lg:mr-36">
          {/* top right */}
          <Link
            to={"/app/favorites"}
            className="hidden md:flex items-center justify-center bg-white bg-opacity-40 w-[100px] h-[42px] rounded-[15px] shadow-xl hover:bg-opacity-50 mr-8"
          >
            cancel
          </Link>
          <Link to={"/app/favorites"}>
            <button
              onClick={async () => {
                await API.post(
                  "/api/outfit",
                  {
                    clothes: selectedItems,
                  },
                  {
                    headers: {
                      "x-access-token": user,
                    },
                  }
                );
              }}
              className="flex items-center justify-center bg-white bg-opacity-40 w-[100px] h-[42px] rounded-[15px] shadow-xl hover:bg-opacity-50"
            >
              complete
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-left mx-[120px]">
          {uploadedItems.map((item) => (
            <div
              onClick={() => toggleSelectItem(item._id)}
              key={item._id}
              className={`card relative flex-col justify-center bg-white bg-opacity-20 hover:bg-opacity-30 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl hover:scale-105 transition-transform transform
              ${
                selectedItems.includes(item._id) ? "border-white border-2" : ""
              }`}
              onClick={() => toggleSelectItem(item._id)}
            >
              <IoIosCheckmarkCircleOutline
                className={`absolute text-white text-6xl z-10 ml-[105px] mt-[303px] 
              ${selectedItems.includes(item._id) ? "" : "hidden"}`}
              />
              <div className="card-hover:scale-110 relative w-[240px] h-[240px] bg-white rounded-[22px] shadow-xl my-[16px] mx-[15px]">
                {/* img */}
                <img
                  src={item.image}
                  alt="uploaded img"
                  className="w-full h-full object-cover rounded-[22px]"
                />
              </div>
              <div
                className={`font-montserrat text-white mx-[20px] h-[107px] overflow-hidden
              ${selectedItems.includes(item._id) ? "blur-[2px]" : ""}`}
              >
                {/* name and tag */}
                <div className="mb-[9px] mt-[5px]">{item.name}</div>
                <div className="text-[#EBEBF5] text-opacity-60 w-[155px]">
                  #{item.category} #{item.subcategory} #{item.color}{" "}
                  {item.hasGraphic ? "#graphic" : "#plain"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Create;
