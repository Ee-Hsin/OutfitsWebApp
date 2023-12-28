//import React from "react";
import { useNavigate } from "react-router";
import { IoIosAdd } from "react-icons/io";
import { API_URL } from "../constants";

const Closet = () => {
  const navigate = useNavigate();

  const handleFileInput = async (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async function () {
        const response = await fetch(`${API_URL}/uploadItem`, {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: reader.result,
            email: "collander@gmail.com", //placeholder for testing
          }),
        });
        console.log(response);
      };

      navigate("/app/upload", { state: { file: file } });
    }
  };

  return (
    <div className="flex justify-between text-white font-montserrat px-36 py-4">
      <div className="border-b-2 border-[#201B21] border-opacity-60 w-[30%] pl-4 pb-4">
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
  );
};

export default Closet;
