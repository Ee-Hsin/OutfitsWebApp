import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useFavorites } from "../hooks/FavoritesContext";
import { useGetCloset } from "../hooks/query";

const Suggestions = () => {
  const { favorites, toggleFavorite, isInFavorites } = useFavorites();
  const { data: uploadedItems } = useGetCloset()

  // State to hold the generated outfits
  const [outfits, setOutfits] = useState([]);

  // Function to create outfits with images from different categories
  const generateOutfits = () => {
    const generatedOutfits = [];
    const selectedCategories = new Set();

    // Shuffle the uploaded items to randomize the selection
    const shuffledItems = [...uploadedItems].sort(() => Math.random() - 0.5);

    // Loop through the shuffled uploaded items and create outfits
    shuffledItems.forEach((item, index) => {
      // Check if the item belongs to a category
      if (item.category) {
        // Find another item in a different category (if available)
        const differentCategoryItem = shuffledItems.find(
          (otherItem) => otherItem.category !== item.category && !selectedCategories.has(otherItem.category)
        );

        // If found, create an outfit
        if (differentCategoryItem) {
          generatedOutfits.push({
            id: index + 1,
            title: `Outfit ${index + 1}`,
            items: [item, differentCategoryItem],
          });

          // Mark the category as selected
          selectedCategories.add(item.category);
          selectedCategories.add(differentCategoryItem.category);
        }

        // If enough outfits are created, break the loop
        if (generatedOutfits.length === 4) {
          return;
        }
      }
    });

    return generatedOutfits;
  };

  // useEffect to generate outfits initially and on component mount
  useEffect(() => {
    const initialOutfits = generateOutfits();
    setOutfits(initialOutfits);
  }, []);

  return (
    <div>
      <div className="flex justify-between text-white font-montserrat px-2 sm:px-6 md:px-36 py-4">
        <div className="flex border-b-2 border-[#201B21] border-opacity-60 w-[220px] md:w-[300px] lg:w-[404px] pl-2 sm:pl-4 pb-4">
          <Link 
            to={'/app/favorites'}
            className="mr-6 md:mr-20 text-white text-opacity-60 hover:text-opacity-70">
            favorites
          </Link>
          <div>
            suggestions
          </div>
        </div>
      </div>

      <section className="flex justify-center sm:justify-start">
        <div className="flex flex-wrap justify-left mx-[120px]">
          {outfits.map((outfit) => (
            <article
              className="relative bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl"
              key={outfit.id}
            >
              <div className='flex flex-wrap justify-left w-[240px] h-[240px] rounded-[22px] shadow-3xl my-[16px] mx-[15px]'>
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
              
              {/* Add your favorite button logic here */}
              <button
                className={`absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full focus:outline-none hover:bg-opacity-30 transition duration-300`}
                onClick={() => {
                  toggleFavorite(outfit);
                }}
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
    </div>
  );
};

export default Suggestions;