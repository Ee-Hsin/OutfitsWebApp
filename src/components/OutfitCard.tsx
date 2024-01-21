import { RxCrossCircled } from 'react-icons/rx'
import DeleteModal from '../components/UI/DeleteModal'
// import { useDeleteFavorites } from '../hooks/query'
import { useEffect, useState } from 'react'
import { Loader } from './UI/Loader'
import { UseMutationResult } from '@tanstack/react-query'

interface OutfitCardProps {
    outfit: any
    index: number
    customDeleteMutation: () => UseMutationResult<any, any, string, unknown>
    customSaveMutation?: () => UseMutationResult<any, any, string, unknown>
}

//For the outfit card on the favorites page, we only need a custom delete mutation
//For the outfit card on the suggestion page, we need a custom delete mutation
//and also a custom save mutation to save it to the favorites page
const OutfitCard: React.FC<OutfitCardProps> = ({
    outfit,
    index: outfitIndex,
    customDeleteMutation,
    customSaveMutation,
}) => {
    const mutation = customDeleteMutation()
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
                        {outfit.clothes.map(
                            (clothingItem: any, index: number) => (
                                <img
                                    key={clothingItem._id}
                                    src={clothingItem.image}
                                    alt={`clothing-${index}`}
                                    className="w-[115px] h-[115px] object-cover rounded-[22px] mx-[2px] bg-white"
                                />
                            )
                        )}
                    </div>
                    <div className="font-montserrat text-white mx-[20px] h-[107px] overflow-hidden">
                        {/* name and tag */}
                        <div className=" mb-[9px] mt-[5px] ml-[9px]">
                            {' '}
                            {outfit.name || `outfit-${outfitIndex + 1}`}
                        </div>
                        <div className="text-[#EBEBF5] text-opacity-60 ml-[9px] w-[155px]">
                            {/* Tags or additional outfit info */}

                            {[
                                ...new Set(
                                    outfit.clothes.map(
                                        (item: any) => `#${item.subcategory}`
                                    )
                                ),
                            ].join(' ')}
                        </div>
                        {/* TODO: If there exists a customSave mutation, we must ensure that
                        there is a isFavorite field in the outfit object too. If there is, 
                        we must render a heart so that it can be saved into favorites as well */}
                    </div>
                </>
            )}
        </div>
    )
}

export default OutfitCard
