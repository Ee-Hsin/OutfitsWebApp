import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import {
  useGetOutfits,
  useDeleteOutfit,
  useGetFavorites,
  useRemoveFavoriteItem,
} from "../hooks/query.js";
import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { Loader } from "../components/UI/Loader";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute text-white font-montserrat text-center bg-black bg-opacity-60 z-10 w-[300px] mx-[-14px] my-[100px] shadow-xl rounded-3xl border-white border-[1px]">
      <div className="modal-content">
        <p className="px-4 py-4">
          Are you sure you want to delete this Outfit?
        </p>
        <div className="pb-6">
          <button className="px-4 hover:scale-110" onClick={onConfirm}>
            Yes
          </button>
          <button className="px-4  hover:scale-110" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const OutfitCard = ({ outfit, index }) => {
  const mutation = useDeleteOutfit();
  const handleDelete = () => {
    mutation.mutate(outfit._id);
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

  useEffect(() => {
    if (outfit.clothes.length <= 1) {
      handleDelete();
    }
  }, [outfit]);

  return (
    <div className="group relative bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl">
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <RxCrossCircled
        className="opacity-0 absolute text-white group-hover:opacity-100 hover:text-opacity-70 text-[30px] z-10 ml-[240px] mt-[-11px] hover:scale-110 transition-opacity"
        onClick={handleDeleteClick}
      />
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
        {/* name and tag */}
        <div className=" mb-[9px] mt-[5px] ml-[9px]">
          {" "}
          {outfit.name || `outfit-${index + 1}`}
        </div>
        <div className="text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]">
          {/* Tags or additional outfit info */}

          {[
            ...new Set(outfit.clothes.map((item) => `#${item.subcategory}`)),
          ].join(" ")}
        </div>
      </div>
    </div>
  );
};
const Favorites = () => {
  const [outfits, setOutfits] = useState([]);
  const [favoritedItems, setFavoritedItems] = useState([]);
  const { data: favoritedItemsData, isPending: favoritedPending } =
    useGetFavorites();
  const { data: outfitsData, isPending: outfitsPending } = useGetOutfits();
  const removeFavoriteItem = useRemoveFavoriteItem();

  const handleToggleFavorite = async (favItem) => {
    try {
      console.log("Toggling favorite:", favItem);

      if (favoritedItems.some((item) => item._id == favItem._id)) {
        console.log("Removing from favorites:", favItem._id);

        // Use the onSuccess callback to update the state after a successful removal
        removeFavoriteItem.mutate(favItem._id);
        setFavoritedItems((prevItems) =>
          prevItems.filter((item) => item._id != favItem._id)
        );
      } else {
        setFavoritedItems([...favoritedItems, favItem]);
      }
      console.log("Favorite toggled successfully.");
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // let reminder = "Click again to remove item from favorites!";

  useEffect(() => {
    setFavoritedItems(favoritedItemsData?.data?.favorites || []);
  }, [favoritedItemsData]);

  useEffect(() => {
    setOutfits(outfitsData?.data?.outfits || []);
  }, [outfitsData]);

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

      {outfitsPending || favoritedPending ? (
        <div className="flex mt-40 justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <section className="flex justify-center sm:justify-start">
          <div className="flex flex-wrap mx-[120px]">
            {outfits?.map((outfit, index) => (
              <OutfitCard key={outfit._id} outfit={outfit} index={index} />
            ))}

            {favoritedItems.map((item, key) => (
              <div
                className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl relative"
                key={item._id}
              >
                <div className="flex flex-wrap justify-left w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]">
                  {item.items.map((favFit, index) => (
                    <img
                      key={favFit._id}
                      src={favFit.image}
                      alt={`clothing-${index}`}
                      className="w-[115px] h-[115px] object-cover bg-white rounded-[22px] mx-[2px]"
                    />
                  ))}
                </div>
                <div className="font-montserrat text-white mx-[20px] h-[107px] overflow-hidden">
                  <div className="mb-[9px] mt-[5px] ml-[9px]">{item.title}</div>
                  <div className="text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]">
                    {item.items.map((item) => `#${item.subcategory} `)}
                  </div>
                </div>
                <button
                  className="absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full focus:outline-none hover:bg-opacity-30 transition duration-300"
                  onClick={() => handleToggleFavorite(item)}
                >
                  <BsHeartFill className="text-white" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Favorites;
