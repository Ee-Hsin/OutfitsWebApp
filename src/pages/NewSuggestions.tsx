import { Link } from 'react-router-dom'
import {
    useCreateSuggestions,
    useGetSuggestions,
    useDeleteFavorites,
} from '../hooks/query'
import OutfitCard from '../components/OutfitCard'

const NewSuggestions = () => {
    const createSuggestions = useCreateSuggestions()
    const getSuggestions = useGetSuggestions()

    //When this is clicked, generates new suggestions
    const handleGenerateNewSuggestions = () => {
        createSuggestions.mutate()
    }
    console.log('Suggestions', getSuggestions.data)

    return (
        <div>
            {createSuggestions.isPending && (
                <div>Generating new suggestions...</div>
            )}
            <div className="flex flex-col sm:flex-row justify-between text-white font-montserrat px-2 sm:px-6 md:px-36 py-4">
                <div className="flex border-b-2 border-[#201B21] border-opacity-60 w-[220px] md:w-[300px] lg:w-[404px] pl-2 sm:pl-4 pb-4">
                    <Link
                        to={'/app/favorites'}
                        className="mr-6 md:mr-20 text-white text-opacity-60 hover:text-opacity-70"
                    >
                        favorites
                    </Link>
                    <div>suggestions</div>
                </div>
                <div className="flex">
                    <button
                        onClick={handleGenerateNewSuggestions}
                        className="flex items-center bg-white bg-opacity-40 h-[42px] 
                        px-8 rounded-3xl shadow-xl hover:bg-opacity-50 my-4 sm:my-0"
                    >
                        Generate new suggestions
                    </button>
                </div>
            </div>
            <section className="flex justify-center sm:justify-start">
                <div className="flex flex-wrap justify-left mx-[120px]">
                    {getSuggestions.data?.data?.suggestions?.map(
                        (suggestedOutfit: any, index: number) => (
                            <OutfitCard
                                key={index}
                                outfit={suggestedOutfit}
                                index={index}
                                //TODO: THIS CANNOT BE THE CUSTOM MUTATION IT WILL NOT WORK,
                                //NEED TO CHANGE THIS TO A MUTATION THAT 
                                //UNFAVORITES THE SUGGESTION
                                customDeleteMutation={useDeleteFavorites}
                            />
                        )
                    )}
                </div>
            </section>
            {/* Over here render the suggestions */}
        </div>
    )
}

export default NewSuggestions
