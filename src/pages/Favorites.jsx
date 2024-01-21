import { IoIosAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import {
    useDeleteFavorites,
    useGetFavorites,
} from '../hooks/query'
import { useEffect, useState } from 'react'
import { Loader } from '../components/UI/Loader'
import { FailureModal } from '../components/UI/FailureModal'
import OutfitCard from '../components/OutfitCard'

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
                                customDeleteMutation={useDeleteFavorites}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default Favorites
