import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { Tooltip } from 'react-tooltip'
import { useGetCloset, useCreateFavorites } from '../hooks/query'
import { Loader } from '../components/UI/Loader'

const Create = () => {
    const { data: uploadedItems, isPending } = useGetCloset()
    const [outfitName, setOutfitName] = useState<string>('')
    const [buttonActive, setButtonActive] = useState<boolean>(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const createFavoriteOutfit = useCreateFavorites()

    useEffect(() => {
        setButtonActive(
            selectedItems.length >= 2 &&
                selectedItems.length <= 4 &&
                outfitName.length > 0
        )
    }, [selectedItems, outfitName])

    const toggleSelectItem = (itemId: string) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
                // Item is already selected, remove it
                return prevSelectedItems.filter((id) => id !== itemId)
            } else {
                // Item is not selected, add it

                return [...prevSelectedItems, itemId]
            }
        })
    }

    const onComplete = () => {
        createFavoriteOutfit.mutate({
            clothes: selectedItems,
            outfitName,
        })
    }

    let reminder = 'Please enter the name of your Outfit'
    if (selectedItems.length > 4) {
        reminder = 'Please select up to four items '
    } else if (selectedItems.length < 2) {
        reminder = 'Please select at least two items'
    }

    return (
        <div>
            <div className="flex items-center justify-between text-white font-montserrat">
                {/* top nav */}
                <div className="flex py-4 ">
                    {/* top left */}
                    <Link
                        to={'/app/favorites'}
                        className="pl-4 pr-6 md:pl-10 md:pr-16 text-xl"
                    >
                        <IoIosArrowBack />
                    </Link>
                    <div className="hidden md:block border-b-2 border-[#201B21] border-opacity-60 w-[220px] md:w-[300px] lg:w-[404px] pl-2 sm:pl-4 pb-4">
                        select items to create your outfits
                    </div>
                </div>

                <div className="flex mr-6 md:mr-8 lg:mr-36">
                    {/* top right */}
                    {/* Input for outfit name */}
                    <input
                        type="text"
                        placeholder="Enter outfit name"
                        value={outfitName}
                        onChange={(e) => {
                            setOutfitName(e.target.value)
                        }}
                        className="p-2 border-white border-b border- focus:outline-none focus:border-white-500 placeholder-[#EBEBF5] placeholder-opacity-60 text-center bg-white bg-opacity-0 mx-6 sm:mx-8 w-[160px] sm:w-[200px]"
                    />
                    <button
                        onClick={() => {
                            // Clear selected items when cancel is clicked
                            setSelectedItems([])
                        }}
                        className="hidden md:flex items-center justify-center bg-white bg-opacity-40 w-[100px] h-[42px] rounded-[15px] shadow-xl hover:bg-opacity-50 mr-8"
                    >
                        cancel
                    </button>
                    <Link to={'/app/favorites'}>
                        <button
                            data-tooltip-id="my-tooltip"
                            data-tooltip-place="bottom"
                            disabled={!buttonActive}
                            onClick={onComplete}
                            className={`flex items-center justify-center bg-white bg-opacity-40 w-[100px] h-[42px] rounded-[15px] shadow-xl hover:bg-opacity-50 ${
                                !buttonActive
                                    ? 'cursor-not-allowed opacity-50'
                                    : ''
                            }`}
                        >
                            complete
                        </button>
                    </Link>
                    {!buttonActive && (
                        <Tooltip id="my-tooltip" className="z-10">
                            <div>
                                <p>{reminder}</p>
                            </div>
                        </Tooltip>
                    )}
                </div>
            </div>

            <div className="flex justify-center sm:justify-start">
                {isPending ? (
                    <Loader className=" mt-40" />
                ) : (
                    <div className="flex flex-wrap justify-left mx-[120px]">
                        {uploadedItems.map((item: any) => (
                            <div
                                onClick={() => toggleSelectItem(item._id)}
                                key={item._id}
                                className={`card relative flex-col 
                                justify-center bg-white bg-opacity-20 
                                hover:bg-opacity-30 w-[270px] h-[408px] 
                                mx-[20px] my-[20px] rounded-[30px] shadow-xl 
                                hover:scale-105 transition-transform transform 
                                ${
                                    selectedItems.includes(item._id)
                                        ? 'border-white border-2'
                                        : ''
                                }`}
                            >
                                <IoIosCheckmarkCircleOutline
                                    className={`absolute text-white 
                                    text-6xl z-10 ml-[105px] mt-[303px] 
                                    ${
                                        selectedItems.includes(item._id)
                                            ? ''
                                            : 'hidden'
                                    }`}
                                />
                                <div className="card-hover:scale-110 relative w-[240px] h-[240px] bg-white rounded-[22px] shadow-xl my-[16px] mx-[15px]">
                                    {/* img */}
                                    <img
                                        src={item.image}
                                        alt="uploaded img"
                                        className="w-full h-full object-cover rounded-[22px]"
                                    />
                                </div>
                                <div
                                    className={`font-montserrat 
                                    text-white mx-[20px] h-[107px] 
                                    ${
                                        selectedItems.includes(item._id)
                                            ? 'blur-[2px]'
                                            : ''
                                    }`}
                                >
                                    {/* name and tag */}
                                    <div className="mb-[9px] mt-[5px]">
                                        {item.name}
                                    </div>
                                    <div className="text-[#EBEBF5] text-opacity-60 w-[155px]">
                                        #{item.category} #{item.subcategory} #
                                        {item.color}{' '}
                                        {item.hasGraphic
                                            ? '#graphic'
                                            : '#plain'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Create
