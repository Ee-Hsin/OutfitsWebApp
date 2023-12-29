import { useState } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import { API_URL } from "../services/constants"
import { useAuth } from "../hooks/AuthContext"

const Upload = () => {
  const location = useLocation()
  const { file } = location.state || {}
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [subcategories, setSubcategoryList] = useState([])
  const [selectedSubcategory, setSelectedSub] = useState("")
  const [color, setColor] = useState("")
  const [checkboxYes, setCheckboxYes] = useState(false)
  const [checkboxNo, setCheckboxNo] = useState(false)

  const { user } = useAuth()

  const handleFirstSelect = (event) => {
    const selectedValue = event.target.value
    setCategory(selectedValue)

    // Update the options for the second select based on the value of the first select
    // may fetch the options from an API or define them based on some logic
    const newOptions = getSubcategories(selectedValue)
    setSubcategoryList(newOptions)
  }

  const getSubcategories = (selectedValue) => {
    switch (selectedValue) {
      case "Tops":
        return [
          "t-shirt",
          "blouse",
          "shirt",
          "tank top",
          "sweatshirt",
          "hoodie",
          "sweater",
        ]

      case "Bottoms":
        return [
          "jeans",
          "trousers",
          "leggings",
          "shorts",
          "skirt",
          "sweatpants",
        ]

      case "Dresses":
        return ["casual", "formal", "maxi", "midi", "mini", "evening gown"]

      case "Outerwear":
        return ["coat", "jacket", "blazer", "vest", "parka", "poncho"]

      case "Activewear":
        return [
          "sports bra",
          "athletic tank",
          "workout legging",
          "athletic short",
          "track suit",
          "performance top",
        ]

      case "Accessories":
        return ["scarf", "hat", "glove", "belt", "sunglasses", "tie"]

      case "Footwear":
        return ["sneakers", "boots", "sandals", "flats", "heels", "slippers"]

      default:
        return [] // Invalid category
    }
  }

  const handleCheckboxYes = () => {
    setCheckboxYes(!checkboxYes)
    // Clear checkbox2 when checkbox1 is checked
    if (!checkboxYes) {
      setCheckboxNo(false)
    }
  }

  const handleCheckboxNo = () => {
    setCheckboxNo(!checkboxNo)
    // Clear checkbox1 when checkbox2 is checked
    if (!checkboxNo) {
      setCheckboxYes(false)
    }
  }

  if (!file) {
    // when file is not available in the state
    return <div>No image selected</div>
  }

  return (
    <div>
      <div className="flex text-white font-montserrat py-4">
        <Link
          to={"/app/closet"}
          className="pl-4 pr-6 md:pl-10 md:pr-16 text-xl"
        >
          <IoIosArrowBack />
        </Link>
        <div className="border-b-2 border-[#201B21] border-opacity-60 w-52 md:w-[26%] pl-4 pb-4">
          Categorize your item
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center mx-4  my-24 text-white font-montserrat">
        <div className="relative w-96 h-96 bg-white rounded-2xl shadow-xl mx-10 xl:mr-32 my-10">
          <img
            src={URL.createObjectURL(file)}
            alt="selected image"
            className="w-full h-full object-cover rounded-2xl"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="flex-col mx-10">
          <div className="flex py-6 items-center">
            {/* Content for Container 1 */}
            <div className="w-32 text-lg">Name:</div>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="enter"
              className="bg-white bg-opacity-40 p-2 rounded-3xl text-center placeholder-[#EBEBF5] placeholder-opacity-60 focus:outline-none shadow-xl hover:bg-opacity-30 transition-all duration-100"
            />
          </div>
          <div className="flex py-6 items-center">
            {/* Content for Container 2 */}
            <div className="w-32 text-lg">Type:</div>
            <select
              id="firstSelect"
              value={category}
              onChange={handleFirstSelect}
              className="p-2 mr-6 rounded-3xl bg-white bg-opacity-20 shadow-xl text-center focus:outline-none hover:bg-opacity-30 transition-all duration-100"
            >
              <option value="Tops">top</option>
              <option value="Bottoms">bottom</option>
              <option value="Footwear">shoes</option>
              <option value="Dresses">dresses</option>
              <option value="Outerwear">outerwear</option>
              <option value="Accessories">accessories</option>
              <option value="Activewear">activewear</option>
            </select>
            <select
              onChange={(e) => setSelectedSub(e.target.value)}
              id="secondSelect"
              disabled={subcategories.length === 0}
              className="p-2 rounded-3xl bg-white bg-opacity-20 shadow-xl text-center focus:outline-none hover:bg-opacity-30 transition-all duration-100"
            >
              {subcategories.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex py-6 items-center">
            {/* Content for Container 3 */}
            <div className="w-32 text-lg">Color:</div>
            <select
              className="p-2 rounded-3xl bg-white bg-opacity-20 shadow-xl text-center focus:outline-none hover:bg-opacity-30 transition-all duration-100 w-40"
              onChange={(e) => {
                setColor(e.target.value)
              }}
            >
              <option value="black">black</option>
              <option value="white">white</option>
              <option value="grey">grey</option>
              <option value="beige">beige</option>
              <option value="red">red</option>
              <option value="blue">blue</option>
              <option value="yellow">yellow</option>
              <option value="brown">brown</option>
              <option value="green">green</option>
            </select>
          </div>
          <div className="flex py-6 items-center">
            {/* Content for Container 4 */}
            <div className="w-32 text-lg">Graphic:</div>
            <div className="flex pr-12">
              <div className="p-2">yes</div>
              <input
                type="checkbox"
                id="yesCheckbox"
                checked={checkboxYes}
                onChange={handleCheckboxYes}
                className="border border-gray-200 p-2 rounded-md bg-black bg-opacity-30"
              />
            </div>
            <div className="flex">
              <div className="p-2">no</div>
              <input
                type="checkbox"
                id="noCheckbox"
                checked={checkboxNo}
                onChange={handleCheckboxNo}
                className="border border-gray-200 p-2 rounded-md bg-black bg-opacity-30"
              />
            </div>
          </div>
          <div className="flex py-8 px-10 items-center text-lg">
            {/* Content for Container 5 */}
            <Link
              to={"/app/closet"}
              className="bg-[#D9D9D9] bg-opacity-50 p-2 rounded-2xl text-center shadow-xl hover:bg-opacity-60 transition-all duration-100 px-8 mx-8"
            >
              cancel
            </Link>
            <Link
              to={"/app/closet"}
              className="bg-[#D9D9D9] bg-opacity-50 p-2 rounded-2xl text-center shadow-xl hover:bg-opacity-60 transition-all duration-100 px-8 mx-8"
              onClick={async () => {
                const field = user.googleId ? "googleId" : "email"
                const value = user.googleId ? user.googleId : user.email
                let formData = new FormData()
                formData.append("image", file)
                formData.append(field, value)
                const details = {
                  name: name,
                  category: category,
                  subcategory: selectedSubcategory,
                  color: color,
                  hasGraphic: checkboxYes,
                }
                formData.append("details", details)
                const response = await fetch(`${API_URL}/uploadItem`, {
                  method: "POST",
                  body: formData,
                })
                console.log(response)
              }}
            >
              upload
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
