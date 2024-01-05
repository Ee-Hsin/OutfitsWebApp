import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
//import { useUpdateItem } from "../hooks/query";
import API from "../services/api";

const Update = () => {
  const location = useLocation();
  console.log(location); // Log the entire location object
  const item = location.state?.item;
  console.log(item);
  //const updateItem = useUpdateItem();
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
        ];

      case "Bottoms":
        return [
          "jeans",
          "trousers",
          "leggings",
          "shorts",
          "skirt",
          "sweatpants",
        ];

      case "Dresses":
        return ["casual", "formal", "maxi", "midi", "mini", "evening gown"];

      case "Outerwear":
        return ["coat", "jacket", "blazer", "vest", "parka", "poncho"];

      case "Activewear":
        return [
          "sports bra",
          "athletic tank",
          "workout legging",
          "athletic short",
          "track suit",
          "performance top",
        ];

      case "Accessories":
        return ["scarf", "hat", "glove", "belt", "sunglasses", "tie"];

      case "Footwear":
        return ["sneakers", "boots", "sandals", "flats", "heels", "slippers"];

      default:
        return []; // Invalid category
    }
  };

  //Setting previous values
  const [name, setName] = useState(item.name);
  const [color, setColor] = useState(item.color);
  const [checkboxYes, setCheckboxYes] = useState(item.hasGraphic);
  const [checkboxNo, setCheckboxNo] = useState(!item.hasGraphic);
  const [category, setCategory] = useState(item.category);
  const [selectedSubcategory, setSelectedSub] = useState(item.subcategory);
  const [subcategories, setSubcategoryList] = useState(
    getSubcategories(item.category)
  );

  const { user } = useAuth();

  const handleFirstSelect = (event) => {
    const selectedValue = event.target.value;
    setCategory(selectedValue);

    // Update the options for the second select based on the value of the first select
    const newOptions = getSubcategories(selectedValue);
    setSelectedSub(newOptions[0]);
    setSubcategoryList(newOptions);
  };

  const handleCheckboxYes = () => {
    setCheckboxYes(!checkboxYes);
    // Clear checkbox2 when checkbox1 is checked
    if (!checkboxYes) {
      setCheckboxNo(false);
    }
  };

  const handleCheckboxNo = () => {
    setCheckboxNo(!checkboxNo);
    // Clear checkbox1 when checkbox2 is checked
    if (!checkboxNo) {
      setCheckboxYes(false);
    }
  };

  return (
    <div>
      <div className="flex text-white font-montserrat py-4">
        <Link
          to={"/app/closet"}
          className="pl-4 pr-6 md:pl-10 md:pr-16 text-xl"
        >
          <IoIosArrowBack />
        </Link>
        <div className="hidden sm:block border-b-2 border-[#201B21] border-opacity-60 w-52 md:w-[26%] pl-4 pb-4">
          Edit your item
        </div>
      </div>

      <div className=" flex flex-wrap items-center justify-center mx-4 my-0 lg:my-24 text-white font-montserrat">
        <div className="relative w-[270px] h-[270px] sm:w-[384px] sm:h-[384px] bg-white rounded-2xl shadow-xl m-4 sm:mx-10 xl:mr-32 sm:my-10">
          <img
            src={item.image}
            alt="selected image"
            className="w-full h-full object-cover rounded-2xl"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="flex-col w-[320px] sm:w-[455px] sm:mx-10">
          <div className="flex py-5 sm:py-6 items-center">
            {/* Content for Container 1 */}
            <div className=" w-24 sm:w-32 text-lg">Name:</div>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              defaultValue={item.name}
              className="bg-white bg-opacity-40 p-2 rounded-3xl text-center focus:outline-none shadow-xl hover:bg-opacity-30 transition-all duration-100"
            />
          </div>
          <div className="flex py-5 sm:py-6 items-center">
            {/* Content for Container 2 */}
            <div className="w-20 sm:w-32 text-lg">Type:</div>
            <select
              id="firstSelect"
              value={category}
              onChange={handleFirstSelect}
              className="w-[110px] px-1 py-2 sm:p-2 mr-2 sm:mr-6 rounded-3xl bg-white bg-opacity-20 shadow-xl text-center focus:outline-none hover:bg-opacity-30 transition-all duration-100"
            >
              <option value="Tops">top</option>
              <option value="Bottoms">bottom</option>
              <option value="Footwear">shoes</option>
              <option value="Dresses">dresses</option>
              <option value="Outerwear">outerwear</option>
              <option value="Accessories">accessories</option>
              <option value="Activewear">activewear</option>
            </select>
            {subcategories.length !== 0 && (
              <select
                defaultValue={item.subcategory}
                onChange={(e) => {
                  return setSelectedSub(e.target.value);
                }}
                id="secondSelect"
                className="w-[110px] px-1 py-2 sm:p-2 rounded-3xl bg-white bg-opacity-20 shadow-xl text-center focus:outline-none hover:bg-opacity-30 transition-all duration-100"
              >
                {subcategories.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex py-5 sm:py-6 items-center">
            {/* Content for Container 3 */}
            <div className="w-28 sm:w-32 text-lg">Color:</div>
            <select
              className="p-2 rounded-3xl bg-white bg-opacity-20 shadow-xl text-center focus:outline-none hover:bg-opacity-30 transition-all duration-100 w-40"
              onChange={(e) => {
                setColor(e.target.value);
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
          <div className="flex py-5 sm:py-6 items-center">
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
          <div className="flex py-6 sm:py-8 px-0 sm:px-10 items-center text-lg">
            {/* Content for Container 5 */}
            <Link
              to={"/app/closet"}
              className="bg-[#D9D9D9] bg-opacity-50 p-2 rounded-2xl text-center shadow-xl hover:bg-opacity-60 transition-all duration-100 px-8 ml-5 mr-8 sm:mx-8"
            >
              cancel
            </Link>
            <Link
              to={"/app/closet"}
              className="bg-[#D9D9D9] bg-opacity-50 p-2 rounded-2xl text-center shadow-xl hover:bg-opacity-60 transition-all duration-100 px-8 mx-0 sm:mx-8"
              onClick={async () => {
                if (user) {
                  const itemId = item._id;
                  console.log(item);
                  try {
                    await API.put(
                      `/api/updateItemDetails/${itemId}`,
                      {
                        //itemId: item._id,
                        details: JSON.stringify({
                          name: name,
                          category: category,
                          subcategory: selectedSubcategory,
                          color: color,
                          hasGraphic: checkboxYes,
                        }),
                      },
                      {
                        headers: {
                          "x-access-token": user,
                        },
                      }
                    );
                  } catch (error) {
                    console.error("Error updating item:", error);
                  }
                }
              }}
            >
              update
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
