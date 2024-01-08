import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useFavorites } from "../hooks/FavoritesContext";
import { useGetCloset, useGetRecommendations } from "../hooks/query";
import { Loader } from "../components/UI/Loader";
import {
  useSaveFavoriteItem,
  useRemoveFavoriteItem,
  useSaveGeneratedOutfit,
} from "../hooks/query";
import {
  validBottomsFields,
  validFootwearFields,
  validTopsFields,
} from "../services/constants";
import { FailureModal } from "../components/UI/FailureModal";

const Suggestions = () => {
  const { toggleFavorite, isInFavorites } = useFavorites();
  //let getCloset = useGetCloset();
  const [validCloset, setValidCloset] = useState(false);
  const [showErrorModal, setShowError] = useState(false);
  const getRecommendations = useGetRecommendations(validCloset);
  const getCloset = useGetCloset();
  const saveGeneratedOutfit = useSaveGeneratedOutfit();
  const saveFavoriteItem = useSaveFavoriteItem();
  const removeFavoriteItem = useRemoveFavoriteItem();

  const [outfits, setOutfits] = useState([]);
  useEffect(() => {
    if (getCloset.isPending) {
      return;
    }
    //A valid closet has atleast one top, one bottom and one piece of footwear
    const closet = getCloset.data;
    //Group the closet items by type
    const groupedItems = closet.reduce((groups, item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);

      return groups;
    }, {});
    //Make sure the user has atleast one of each mandatory clothing item
    //Bk wrote this code, not chatgpt! (if it doesn't work though, then Bk didn't write it)
    const isValidCloset = [
      validTopsFields,
      validBottomsFields,
      validFootwearFields,
    ]
      .map((validFields) =>
        validFields.reduce(
          (acc, field) => acc + (groupedItems[field]?.length ?? 0),
          0
        )
      )
      .every((count) => count >= 1);

    setValidCloset(isValidCloset);
    setShowError(!isValidCloset);
  }, [getCloset.isPending]);
  // useEffect to generate outfits initially and on component mount
  useEffect(() => {
    if (getRecommendations.isSuccess)
      setOutfits(getRecommendations.data?.data?.outfits);
  }, [getRecommendations.isSuccess]);

  // Function to handle toggling favorites
  const handleToggleFavorite = async (outfit) => {
    try {
      if (isInFavorites(outfit.id)) {
        await removeFavoriteItem.mutate(outfit.id); // Remove from favorites
      } else {
        await saveFavoriteItem.mutate(outfit); // Save to favorites
        await saveGeneratedOutfit.mutate(outfit); // Save generated outfit to the database
      }
      toggleFavorite(outfit);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  if (showErrorModal) {
    //TODO: Make a proper error message
    return <FailureModal mainMessage="Get more clothes, broke boy!" />;
  }

  return (
    <div>
      <div className="flex justify-between text-white font-montserrat px-2 sm:px-6 md:px-36 py-4">
        <div className="flex border-b-2 border-[#201B21] border-opacity-60 w-[220px] md:w-[300px] lg:w-[404px] pl-2 sm:pl-4 pb-4">
          <Link
            to={"/app/favorites"}
            className="mr-6 md:mr-20 text-white text-opacity-60 hover:text-opacity-70"
          >
            favorites
          </Link>
          <div>suggestions</div>
        </div>
      </div>
      {getRecommendations.isLoading ? (
        <div className="flex mt-40 justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <section className="flex justify-center sm:justify-start">
          <div className="flex flex-wrap justify-left mx-[120px]">
            {outfits?.map((outfit, outfitIndex) => (
              <article
                className="relative bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl"
                key={outfitIndex}
              >
                <div className="flex flex-wrap justify-left w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]">
                  {outfit?.clothes?.map((item, itemIndex) => (
                    <img
                      key={itemIndex}
                      src={item.image}
                      className={`w-[115px] h-[115px] object-cover bg-white rounded-[22px] mx-[2px]`}
                      loading="lazy"
                      alt={item.name}
                    />
                  ))}
                </div>

                <div className="font-montserrat text-white mx-[20px] h-[107px] overflow-hidden">
                  <h3 className="mb-[9px] mt-[5px] ml-[9px]">{outfit.name}</h3>
                  <p className="text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]">
                    {outfit?.clothes?.map((item) => `#${item.subcategory} `)}
                  </p>
                </div>

                <button
                  className={`absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full focus:outline-none hover:bg-opacity-30 transition duration-300`}
                  onClick={() => handleToggleFavorite(outfit)}
                >
                  {isInFavorites(outfit.id) ? (
                    <BsHeartFill className="text-white" />
                  ) : (
                    <BsHeart className="text-white opacity-100" />
                  )}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Suggestions;
