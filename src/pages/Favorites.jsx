import { IoIosAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import {
    useGetFavorites,
    useDeleteFavorites
} from '../hooks/query'
import { useEffect, useState } from 'react'
import { RxCrossCircled } from 'react-icons/rx'
import { Loader } from '../components/UI/Loader'
import { FailureModal } from '../components/UI/FailureModal'
import DeleteModal from '../components/UI/DeleteModal'


const OutfitCard = ({ outfit, index }) => {
    const mutation = useDeleteFavorites()
    const handleDelete = () => {
        mutation.mutate(outfit._id)
    }
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const handleDeleteClick = () => {
        setDeleteModalOpen(true)
    }
    const handleConfirmDelete = () => {
        handleDelete()
        setDeleteModalOpen(false)
    }
    const handleCancelDelete = () => {
        setDeleteModalOpen(false)
    }

    useEffect(() => {
        if (outfit.clothes.length <= 1) {
            handleDelete()
        }
    }, [outfit])

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
            {mutation.isPending ? (
                <div className="flex flex-col justify-center h-full">
                    <Loader />
                </div>
            ) : (
                <>
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
                            {' '}
                            {outfit.name || `outfit-${index + 1}`}
                        </div>
                        <div className="text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]">
                            {/* Tags or additional outfit info */}

                            {[
                                ...new Set(
                                    outfit.clothes.map(
                                        (item) => `#${item.subcategory}`
                                    )
                                ),
                            ].join(' ')}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
const Favorites = () => {
    const [outfits, setOutfits] = useState([])
    const { data: outfitsData, isPending: outfitsPending, isError } = useGetFavorites()

    useEffect(() => {
        setOutfits(outfitsData?.data?.outfits || [])
    }, [outfitsData])

    return (
        <div>
            <div className="flex justify-between text-white font-montserrat px-2 sm:px-6 md:px-36 py-4">
                <div className="flex border-b-2 border-[#201B21] border-opacity-60 w-[220px] md:w-[300px] lg:w-[404px] pl-2 sm:pl-4 pb-4">
                    <div className="mr-6 md:mr-20">favorites</div>
                    <Link
                        to={'/app/suggestions'}
                        className="text-white text-opacity-60 hover:text-opacity-70"
                    >
                        suggestions
                    </Link>
                </div>
                <Link
                    to={'/app/create'}
                    className="flex items-center bg-white bg-opacity-40 w-24 sm:w-32 pl-4 sm:pl-8 rounded-3xl shadow-xl hover:bg-opacity-50"
                >
                    create
                    <IoIosAdd className="text-2xl" />
                </Link>
            </div>
            {isError && <FailureModal />}
            {outfitsPending ? (
                <div className="flex mt-40 justify-center h-screen">
                    <Loader />
                </div>
            ) : (
                <section className="flex justify-center sm:justify-start">
                    <div className="flex flex-wrap mx-[120px]">
                        {outfits?.map((outfit, index) => (
                            <OutfitCard
                                key={outfit._id}
                                outfit={outfit}
                                index={index}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default Favorites
