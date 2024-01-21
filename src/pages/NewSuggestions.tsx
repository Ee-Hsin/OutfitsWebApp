import { Link } from "react-router-dom"

const NewSuggestions = () => {

    //When this is clicked, generates new suggestions
    const handleGenerateNewSuggestions = () => {
        
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
                <div className="flex">
                    <button
                        onClick={handleGenerateNewSuggestions}
                        className="flex items-center bg-white bg-opacity-40 h-[42px] px-8 rounded-3xl shadow-xl hover:bg-opacity-50 "
                    >
                        Generate new suggestions
                    </button>
                </div>
            </div>
            {/* Over here render the suggestions */}
        </div>
    )
}

export default NewSuggestions