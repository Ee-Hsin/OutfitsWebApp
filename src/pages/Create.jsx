import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoIosAdd } from "react-icons/io";
import { API_URL } from "../services/constants";
import { useAuth } from "../hooks/AuthContext";
import { useCloset } from "../components/ClosetContext";

const Create = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { uploadedItems, setUploadedItems } = useCloset();
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

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
      .then((data) => {
        setUploadedItems(data.items);
        setLoading(false); // Set loading to false after receiving the response
        console.log(data);
      })
      .catch((error) => {
        setLoading(false); // Set loading to false in case of an error
        console.error("Error fetching items:", error);
      });
  }, [user, setUploadedItems]);

  const handleFileInput = async (e) => {
    const file = e.target.files[0];

    if (file) {
      navigate("/app/upload", { state: { file: file } });
    }
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
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
          upload <IoIosAdd className="text-2xl" />
        </button>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-left mx-[120px]">
          {uploadedItems.map((item) => (
            <div
              key={item._id}
              className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl"
            >
              <div className="relative w-[240px] h-[240px] bg-white rounded-[22px] shadow-3xl my-[16px] mx-[15px]">
                {/* sample content */}
                <img
                  src={item.image}
                  alt="uploaded img"
                  className="w-full h-full object-cover rounded-[22px]"
                />
                {/* Add a checkbox for selection */}
                <input
                  type="checkbox"
                  className="absolute top-2 right-2"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => toggleSelectItem(item._id)}
                />
              </div>
              <div className="font-montserrat text-white mx-[20px] h-[107px] overflow-hidden">
                {/* name and tag */}
                <div className="mb-[9px] mt-[5px]">{item.name}</div>
                <div className="text-[#EBEBF5] text-opacity-60 w-[155px]">
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

export default Create;

