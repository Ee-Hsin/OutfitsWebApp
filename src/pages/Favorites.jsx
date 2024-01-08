import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import { useFavorites } from "../hooks/FavoritesContext";
import { useGetOutfits } from "../hooks/query";
import { useEffect, useState } from "react";
import { Loader } from "../components/UI/Loader";

const OutfitCard = ({ outfit, index }) => {
  return (
    <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl">
      <div className="flex flex-wrap justify-start w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]">
        {outfit.clothes.map((clothingItem, index) => (
          <img
            key={clothingItem._id}
            src={clothingItem.image}
            alt={`clothing-${index}`}
            className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px] bg-white"
          />
        ))}
      </div>
      <div className="font-montserrat text-white mx-[20px] h-[107px] overflow-hidden">
        <div className=" mb-[9px] mt-[5px] ml-[9px]">
          {" "}
          {outfit.name || `outfit-${index + 1}`}
        </div>
        <div className="text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]">
          {outfit.tags && outfit.tags.join(" ")}
        </div>
      </div>
    </div>
  );
};

const Favorites = () => {
  const { data, isLoading, isError } = useGetOutfits();
  const { favorites, toggleFavorite } = useFavorites();
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    if (data) {
      setOutfits(data?.data?.outfits || []);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!outfits.length && !favorites.length) {
    return <div>No outfits or favorites to display.</div>;
  }

  return (
    <div>
      <div className="flex justify-between text-white font-montserrat px-2 sm:px-6 md:px-36 py-4">
        <div className="flex border-b-2 border-[#201B21] border-opacity-60 w-[220px] md:w-[300px] lg:w-[404px] pl-2 sm:pl-4 pb-4">
          <div className="mr-6 md:mr-20">favorites</div>
          <Link
            to={"/app/suggestions"}
            className="text-white text-opacity-60 hover:text-opacity-70"
          >
            suggestions
          </Link>
        </div>
        <Link
          to={"/app/create"}
          className="flex items-center bg-white bg-opacity-40 w-24 sm:w-32 pl-4 sm:pl-8 rounded-3xl shadow-xl hover:bg-opacity-50"
        >
          create
          <IoIosAdd className="text-2xl" />
        </Link>
      </div>

      <section className="flex justify-center sm:justify-start">
        <div className="flex flex-wrap mx-[120px]">
          {outfits.map((outfit, index) => (
            <OutfitCard key={outfit._id} outfit={outfit} index={index} />
          ))}

          {favorites.map((item, key) => (
            <div
              className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl relative"
              key={key}
            >
              <div className="flex flex-wrap justify-left w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]">
                {item.items.map((clothingItem, index) => (
                  <img
                    key={index}
                    src={clothingItem.image}
                    alt={`clothing-${index}`}
                    className="w-[115px] h-[115px] object-cover bg-white rounded-[22px] mx-[2px]"
                  />
                ))}
              </div>
              <div className="font-montserrat text-white mx-[20px] h-[107px] overflow-hidden">
                <div className=" mb-[9px] mt-[5px] ml-[9px]">{item.title}</div>
                <div className="text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]">
                  {item.items.map((item) => `#${item.category} `)}
                </div>
              </div>
              <button
                className="absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full focus:outline-none hover:bg-opacity-30 transition duration-300"
                onClick={() => toggleFavorite(item)}
              >
                <BsHeartFill className="text-white" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Favorites;
