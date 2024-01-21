import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { Loader } from '../components/UI/Loader'
import { useRemoveFavoriteItem, useSaveGeneratedOutfit, useGetRecommendations } from '../hooks/query'
import { FailureModal } from '../components/UI/FailureModal'

const Suggestions = () => {
    const saveGeneratedOutfit = useSaveGeneratedOutfit()
    const removeFavoriteItem = useRemoveFavoriteItem()
    //To get the recommendations
    const getRecommendations = useGetRecommendations()

    // const [outfits, setOutfits] = useState([])
    const [favoritedItems, setFavorites] = useState([])
    const [outfitName, setOutfitName] = useState('')
    const [selectedOutfit, setSelectedOutfit] = useState(null)
    const [selectedItems, setSelectedItems] = useState([])

    // Function to handle toggling favorites
    const handleToggleFavorite = async (outfit) => {
        try {
            // Blur effect
            setSelectedItems([outfit.id])

            if (favoritedItems.some((item) => item.id === outfit.id)) {
                removeFavoriteItem.mutate(outfit.id) // Remove from favorites
                setFavorites(
                    favoritedItems.filter((item) => item.id !== outfit.id)
                )
            } else {
                setFavorites([...favoritedItems, outfit])
                setSelectedOutfit(outfit) // Set the selected outfit for input display
            }
        } catch (error) {
            console.error('Error toggling favorite:', error)
        }
    }

    // Function to handle outfit name change
    const handleOutfitNameChange = (e) => {
        setOutfitName(e.target.value)
    }

    // Function to handle saving the generated outfit
    const handleSaveButtonClick = () => {
        if (!outfitName) {
            console.log("Your outfit needs a name")
            return
        }
        saveGeneratedOutfit.mutate({
            ...selectedOutfit,
            title: outfitName,
        })
    }

    return (
        <div>
            <div className="flex justify-between text-white font-montserrat px-2 sm:px-6 md:px-36 py-4">
                <div className="flex border-b-2 border-[#201B21] border-opacity-60 w-[220px] md:w-[300px] lg:w-[404px] pl-2 sm:pl-4 pb-4">
                    <Link
                        to={'/app/favorites'}
                        className="mr-6 md:mr-20 text-white text-opacity-60 hover:text-opacity-70"
                    >
                        favorites
                    </Link>
                    <div>suggestions</div>
                </div>
            </div>
            {getRecommendations.isError && (
                <FailureModal
                // mainMessage={(getRecommendations.error as CustomError)?.response?.data?.message ||
                //     "There may not be an account with this email."}
                // subMessage="Please try again and contact us if the error persists"
                />
            )}
            {getRecommendations.isPending ? (
                <div className="flex mt-40 justify-center h-screen">
                    <Loader />
                </div>
            ) : (
                <section className="flex justify-center sm:justify-start">
                    <div className="flex flex-wrap justify-left mx-[120px]">
                        {getRecommendations.data?.data?.outfits?.map((outfit, index) => (
                            <article
                                className={`relative bg-white bg-opacity-20 hover:bg-opacity-30 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-[30px] shadow-xl hover:scale-105 transition-transform transform
                           ${
                               selectedItems.includes(outfit.id)
                                   ? 'border-white border-2'
                                   : ''
                           }`}
                                key={outfit.savedId || index}
                            >
                                {/* Display input and save button for the selected outfit */}
                                {selectedOutfit &&
                                    selectedOutfit.id === outfit.id &&
                                    favoritedItems.some(
                                        (item) => item.id === outfit.id
                                    ) && (
                                        <div className="absolute bottom-8 left-2 z-20">
                                            <div className="relative flex flex-col items-center">
                                                <input
                                                    type="text"
                                                    placeholder="Enter outfit name"
                                                    value={outfitName}
                                                    onChange={
                                                        handleOutfitNameChange
                                                    }
                                                    className="p-2 font-montserrat border-white border-b focus:outline-none focus:border-white-500 placeholder-[#EBEBF5] placeholder-opacity-60 text-center text-white bg-white bg-opacity-0 w-[160px] sm:w-[200px]"
                                                />
                                                <button
                                                    className="font-montserrat mt-2 bg-white bg-opacity-20 px-2 py-1 rounded-md text-xs text-white hover:bg-opacity-30"
                                                    onClick={
                                                        handleSaveButtonClick
                                                    }
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
                                    <h3 className="mb-[9px] mt-[5px] ml-[9px]">
                                        {outfit.name}
                                    </h3>
                                    <p
                                        className={`text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]
                  ${
                      selectedItems.includes(outfit.id) &&
                      favoritedItems.some((item) => item.id === outfit.id)
                          ? 'blur-[3px]'
                          : ''
                  }`}
                                    >
                                        {outfit?.clothes?.map(
                                            (item) => `#${item.subcategory} `
                                        )}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleToggleFavorite(outfit)}
                                    className={`absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full focus:outline-none hover:bg-opacity-30 transition duration-300`}
                                >
                                    {favoritedItems.some(
                                        (item) => item.id === outfit.id
                                    ) ? (
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
    )
}

export default Suggestions
