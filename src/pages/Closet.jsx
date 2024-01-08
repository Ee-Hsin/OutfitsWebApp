import { useNavigate } from "react-router";
import { useState } from 'react';
import { IoIosAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { useDeleteItem, useGetCloset } from "../hooks/query";
import { Loader } from "../components/UI/Loader";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute text-white font-montserrat text-center bg-black bg-opacity-60 z-10 w-[300px] mx-[-14px] my-[100px] shadow-xl rounded-3xl border-white border-[1px]">
      <div className="modal-content">
        <p className="px-4 py-4">Are you sure you want to delete this item?</p>
        <div className="pb-6">
          <button className="px-4 hover:scale-110" 
            onClick={onConfirm}>Yes</button>
          <button className="px-4  hover:scale-110"
            onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

const ClosetItem = ({ item }) => {
  const mutation = useDeleteItem();
  const navigate = useNavigate();
  const handleDelete = () => {
    mutation.mutate(item._id);
  };
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };
  const handleConfirmDelete = () => {
    handleDelete();
    setDeleteModalOpen(false);
  };
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="group relative bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl">
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <FaRegEdit
        onClick={() => navigate("/app/update", { state: { item } })}
        className="opacity-0 absolute text-white group-hover:opacity-100 hover:text-opacity-70 text-xl z-10 ml-[210px] mt-[-10px] hover:scale-110 transition-opacity"
      />
      <RxCrossCircled
        className="opacity-0 absolute text-white group-hover:opacity-100 hover:text-opacity-70 text-[30px] z-10 ml-[240px] mt-[-11px] hover:scale-110 transition-opacity"
        onClick={handleDeleteClick}
      />
      <div className="relative w-[240px] h-[240px] bg-white rounded-[22px] shadow-3xl my-[16px] mx-[15px]">
        {/* img */}
        <img
          src={item.image}
          alt="uploaded img"
          className="w-full h-full object-cover rounded-[22px]"
        />
      </div>
      <div className="font-montserrat text-white mx-[20px] h-[107px] overflow-hidden">
        {/* name and tag */}
        <div className="mb-[9px] mt-[5px]">{item.name}</div>
        <div className="text-[#EBEBF5] text-opacity-60 w-[155px]">
          #{item.category} #{item.subcategory} #{item.color}{" "}
          {item.hasGraphic ? "#graphic" : "#plain"}
        </div>
      </div>
    </div>
  );
};

const Closet = () => {
  const navigate = useNavigate()

  const { data: uploadedItems , isPending} = useGetCloset()

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (file) {
      navigate("/app/upload", { state: { file: file } });
    }
  };

  return (
    <div>
      <div className="flex justify-between text-white font-montserrat px-2 sm:px-6 md:px-36 py-4">
        <div className="border-b-2 border-[#201B21] border-opacity-60 w-40 sm:w-[30%] pl-2 sm:pl-4 pb-4">
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
          className="flex items-center bg-white bg-opacity-40 w-32 h-[42px] pl-8 rounded-3xl shadow-xl hover:bg-opacity-50 "
        >
          upload
          <IoIosAdd className="text-2xl" />
        </button>
      </div>
      {console.log("isPending", isPending)}
      {isPending ? (
        <div className="flex mt-40 justify-center h-screen">
          <Loader />
        </div>
      ) : (
      <div className="flex justify-center sm:justify-start">
        <div className="flex flex-wrap justify-left mx-[120px]">
          {console.log("uploaded Items:", uploadedItems)}
          {uploadedItems?.map((item) => (
            <ClosetItem key={item._id} item={item} />
          ))}
        </div>
      </div>)}
    </div>
  );
};

export default Closet;
