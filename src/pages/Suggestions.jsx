import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useFavorites } from "../hooks/FavoritesContext";
import { useGetCloset, useGetRecommendations } from "../hooks/query";
import { Loader } from "../components/UI/Loader";
import {
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
  }, [getCloset.isPending, getCloset.data]);
  // useEffect to generate outfits initially and on component mount
  const [outfitName, setOutfitName] = useState("");
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  

  let { data: uploadedItems, isPending } = useGetCloset();
  if (!uploadedItems) {
    uploadedItems = [];
  }

  // Function to generate a unique outfitId
  const generateOutfitId = () => {
    const timestamp = new Date().getTime();
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `${timestamp}_${randomSuffix}`;
  };

  
  // const generateOutfits = () => {
  //   const generatedOutfits = [];

  //   for (let i = 0; i < 4; i++) {
  //     const shuffledItems = [...uploadedItems].sort(() => Math.random() - 0.5);
  //     const outfitItems = [];

  //     for (const category of [
  //       "Tops",
  //       "Bottoms",
  //       "Footwear",
  //       "Accessories",
  //       "Dresses",
  //       "Activewear",
  //     ]) {
  //       let selectedItems = shuffledItems.filter(
  //         (item) =>
  //           item.category === category &&
  //           !outfitItems.some(
  //             (outfitItem) => outfitItem.category === category
  //           )
  //       );

  //       while (outfitItems.length < 4 && selectedItems.length > 0) {
  //         const selectedItem =
  //           selectedItems[Math.floor(Math.random() * selectedItems.length)];
  //         outfitItems.push(selectedItem);
  //         selectedItems = selectedItems.filter(
  //           (item) => item.id !== selectedItem.id
  //         );
  //       }
  //     }

  //     const outfit = {
  //       id: i + 1,
  //       title: `Outfit ${i + 1}`,
  //       items: outfitItems,
  //       savedId: generateOutfitId(),
  //     };

  //     generatedOutfits.push(outfit);
  //   }

  //   return generatedOutfits;
  // };

  useEffect(() => {
    if (getRecommendations.isSuccess)
      setOutfits(getRecommendations.data?.data?.outfits);
  }, [getRecommendations.isSuccess, getRecommendations.data]);

  useEffect(() => {
    if(saveGeneratedOutfit.isSuccess) {
    setOutfits((prevOutfits) => {
      //Find the current outfit
      let withoutOutfit = prevOutfits.filter((item) => item.id !== selectedOutfit.id);
      //Update its ID to the databases id
      console.log(saveGeneratedOutfit.data)
      selectedOutfit.id = saveGeneratedOutfit?.data.data.favorite._id;
      withoutOutfit.push(selectedOutfit)
      //Thats our new list
      return withoutOutfit;
     })
     setSelectedOutfit(null);
     setOutfitName("");
     setSelectedItems([]);
    }
  }, [saveGeneratedOutfit.isSuccess])

  // Function to handle toggling favorites
  const handleToggleFavorite = async (outfit) => {
    try {
      // Blur effect
      setSelectedItems([outfit.id]);

      if (isInFavorites(outfit.id)) {
        await removeFavoriteItem.mutate(outfit.id); // Remove from favorites

      } 

      toggleFavorite(outfit);
      setSelectedOutfit(outfit); // Set the selected outfit for input display
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Function to handle outfit name change
  const handleOutfitNameChange = (e) => {
    setOutfitName(e.target.value);
  };

  // Function to handle save button click
  const handleSaveButtonClick = async () => {
    try {
      const newOutfit = {
        ...selectedOutfit,
        title: outfitName,
        savedId: generateOutfitId(),
      };

     await saveGeneratedOutfit.mutate(newOutfit); // Save generated outfit to the database

    


     
     


      // Reset states for the next selection
      

    } catch (error) {
      console.error("Error saving outfit:", error);
    }
  };
  if (showErrorModal) {
    return (
      <FailureModal
        mainMessage="You don't have enough clothes!"
        subMessage="Add more types of clothing for a complete fit"
        redirectLink={"/app/closet"}
        redirectMessage={"Upload More Clothes"}
      />
    );
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
      {getRecommendations.isPending ? (
        <div className="flex mt-40 justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <section className="flex justify-center sm:justify-start">
          <div className="flex flex-wrap justify-left mx-[120px]">
            {outfits?.map((outfit, outfitIndex) => (
                           <article
                           className={`relative bg-white bg-opacity-20 hover:bg-opacity-30 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl hover:scale-105 transition-transform transform
                           ${
                             selectedItems.includes(outfit.id)
                               ? "border-white border-2"
                               : ""
                             }`}
               
                           key={outfit.savedId}
                         >
                           {/* Display input and save button for the selected outfit */}
                           {selectedOutfit && selectedOutfit.id === outfit.id && isInFavorites(outfit.id) && (
             <div className="absolute bottom-8 left-2 z-20">
               <div className="relative flex flex-col items-center">
                 <input
                   type="text"
                   placeholder="Enter outfit name"
                   value={outfitName}
                   onChange={handleOutfitNameChange}
                   className="p-2 font-montserrat border-white border-b focus:outline-none focus:border-white-500 placeholder-[#EBEBF5] placeholder-opacity-60 text-center text-white bg-white bg-opacity-0 w-[160px] sm:w-[200px]"
                 />
                 <button
                   className="font-montserrat mt-2 bg-white bg-opacity-20 px-2 py-1 rounded-md text-xs text-white hover:bg-opacity-30"
                   onClick={handleSaveButtonClick}
                 >
                   Save
                 </button>
               </div>
             </div>
           )}
           
                
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
                  <p className={`text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]
                  ${
                    (selectedItems.includes(outfit.id) && isInFavorites(outfit.id))
                    ? "blur-[3px]" : ""
                  }`}
                  >
                    {outfit?.clothes?.map((item) => `#${item.subcategory} `)}
                  </p>
                </div>

                <button
                  onClick={() => handleToggleFavorite(outfit)}
                  className={`absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full focus:outline-none hover:bg-opacity-30 transition duration-300`}
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
