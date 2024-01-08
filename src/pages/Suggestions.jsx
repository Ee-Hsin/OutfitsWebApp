import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useFavorites } from "../hooks/FavoritesContext";
import { useGetCloset } from "../hooks/query";
import { Loader } from "../components/UI/Loader";
import {
  useSaveFavoriteItem,
  useRemoveFavoriteItem,
  useSaveGeneratedOutfit,
} from "../hooks/query";

const Suggestions = () => {
  const { toggleFavorite, isInFavorites } = useFavorites();
  const saveGeneratedOutfit = useSaveGeneratedOutfit();
  const saveFavoriteItem = useSaveFavoriteItem();
  const removeFavoriteItem = useRemoveFavoriteItem();
  
  let { data: uploadedItems, isPending } = useGetCloset();
  if (!uploadedItems) {
    uploadedItems = [];
  }

  const [outfits, setOutfits] = useState([]);

  // Function to generate a unique outfitId
  const generateOutfitId = () => {
    const timestamp = new Date().getTime();
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `${timestamp}_${randomSuffix}`;
  };

  const generateOutfits = () => {
    const generatedOutfits = [];

    for (let i = 0; i < 4; i++) {
      const shuffledItems = [...uploadedItems].sort(() => Math.random() - 0.5);
      const outfitItems = [];

      for (const category of [
        "Tops",
        "Bottoms",
        "Footwear",
        "Accessories",
        "Dresses",
        "Activewear",
      ]) {
        let selectedItems = shuffledItems.filter(
          (item) =>
            item.category === category &&
            !outfitItems.some(
              (outfitItem) => outfitItem.category === category
            )
        );

        while (outfitItems.length < 4 && selectedItems.length > 0) {
          const selectedItem =
            selectedItems[Math.floor(Math.random() * selectedItems.length)];
          outfitItems.push(selectedItem);
          selectedItems = selectedItems.filter(
            (item) => item.id !== selectedItem.id
          );
        }
      }

      const outfit = {
        id: i + 1,
        title: `Outfit ${i + 1}`,
        items: outfitItems,
        savedId: generateOutfitId(),
      };

      generatedOutfits.push(outfit);
    }

    return generatedOutfits;
  };

  useEffect(() => {
    const initialOutfits = generateOutfits();
    setOutfits(initialOutfits);
  }, [isPending]);

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
      {isPending ? (
        <div className="flex mt-40 justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <section className="flex justify-center sm:justify-start">
          <div className="flex flex-wrap justify-left mx-[120px]">
            {outfits.map((outfit) => (
              <article
                className="relative bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl"
                key={outfit.savedId} 
              >
                <div className="flex flex-wrap justify-left w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]">
                  {outfit.items.map((item, itemIndex) => (
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
                  <h3 className="mb-[9px] mt-[5px] ml-[9px]">{outfit.title}</h3>
                  <p className="text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]">
                    {outfit.items.map((item) => `#${item.subcategory} `)}
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
