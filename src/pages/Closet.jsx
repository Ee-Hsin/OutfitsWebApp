import { useNavigate } from "react-router"
import { IoIosAdd } from "react-icons/io"
import { useCloset } from "../hooks/ClosetContext"
import { FaRegEdit } from "react-icons/fa"
import { RxCrossCircled } from "react-icons/rx"

const ClosetItem = ({ item }) => {
  const {removeItem} = useCloset();
  return (
    <div className="group relative bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl">
      <FaRegEdit 
        className="opacity-0 absolute text-white group-hover:opacity-100 hover:text-opacity-70 text-xl z-10 ml-[210px] mt-[-10px] hover:scale-110 transition-opacity"/>
      <RxCrossCircled 
        className="opacity-0 absolute text-white group-hover:opacity-100 hover:text-opacity-70 text-[30px] z-10 ml-[240px] mt-[-11px] hover:scale-110 transition-opacity"
        onClick={() => {removeItem(item)}}
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
  )
}

const Closet = () => {
  const navigate = useNavigate()
  const { uploadedItems } = useCloset()

  const handleFileInput = async (e) => {
    const file = e.target.files[0]

    if (file) {
      navigate("/app/upload", { state: { file: file } })
    }
  }

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

      <div className="flex justify-center sm:justify-start">
        <div className="flex flex-wrap justify-left mx-[120px]">
          {uploadedItems?.map((item) => (
            <ClosetItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Closet
