import { useLocation } from "react-router"
import { Link, Navigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import { useForm } from "react-hook-form"
import { useUploadItem } from "../hooks/query"
import {
  CLOTHING_CATEGORIES,
  CLOTHING_SUBCATEGORIES,
  COLORS,
} from "../services/constants"
import { Loader } from "../components/UI/Loader"

const Upload = () => {
  const location = useLocation()
  const { file } = location.state || {}
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      category: "Tops",
      color: "black",
      hasGraphic: "noGraphic",
    },
  })
  const sendUploadItem = useUploadItem()

  const selectedCategory = watch("category")

  const onSubmit = (data, e) => {
    e.preventDefault()
    //sends info to the server

    const formData = new FormData()
    formData.append("image", file)

    //converting the yesGraphic and noGraphic to boolean before we send
    if (data.hasGraphic === "noGraphic") {
      data.hasGraphic = false
    } else {
      data.hasGraphic = "true"
    }

    formData.append("details", JSON.stringify(data))
    sendUploadItem.mutate(formData)
    reset()
  }

  if (!file) {
    // when file is not available in the state
    return <div>No image selected</div>
  }

  return (
    <div>
      <div className="flex text-white font-montserrat py-4">
        <Link
          to={"/app/closet"}
          className="pl-4 pr-6 md:pl-10 md:pr-16 text-xl"
        >
          <IoIosArrowBack />
        </Link>
        <div className="hidden sm:block border-b-2 border-[#201B21] border-opacity-60 w-52 md:w-[26%] pl-4 pb-4">
          Categorize your item
        </div>
      </div>
      {sendUploadItem.isSuccess && <Navigate to="/app/closet" />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap items-center justify-center mx-4 my-0 lg:my-24
       text-white font-montserrat"
      >
        {sendUploadItem.isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="relative w-[270px] h-[270px] sm:w-[384px] sm:h-[384px] bg-white rounded-2xl shadow-xl m-4 sm:mx-10 xl:mr-32 sm:my-10">
              <img
                src={URL.createObjectURL(file)}
                alt="selected image"
                className="w-full h-full object-cover rounded-2xl"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="flex-col w-[320px] sm:w-[455px] sm:mx-10">
              <div className="flex py-3 sm:py-6 items-center">
                {/* Content for Container 1 */}
                <div className=" w-24 sm:w-32 text-lg">Name:</div>
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-white bg-opacity-40 p-2 rounded-3xl text-center placeholder-[#EBEBF5] placeholder-opacity-60 focus:outline-none shadow-xl hover:bg-opacity-30 transition-all duration-100"
                  {...register("name", {
                    required: "A name is required",
                  })}
                />
              </div>
              {errors.name && (
                <p
                  role="alert"
                  className="text-center font-semiboldbold text-red-700"
                >
                  {errors.name.message}
                </p>
              )}
              <div className="flex py-5 sm:py-6 items-center">
                {/* Content for Container 2 */}
                <div className="w-20 sm:w-32 text-lg">Type:</div>
                <select
                  id="firstSelect"
                  {...register("category")}
                  className="w-[110px] px-1 py-2 sm:p-2 mr-2 sm:mr-6 rounded-3xl bg-white bg-opacity-20 shadow-xl text-center focus:outline-none hover:bg-opacity-30 transition-all duration-100"
                >
                  {CLOTHING_CATEGORIES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <select
                  {...register("subcategory")}
                  id="secondSelect"
                  className="w-[110px] px-1 py-2 sm:p-2 rounded-3xl bg-white bg-opacity-20 shadow-xl text-center focus:outline-none hover:bg-opacity-30 transition-all duration-100"
                >
                  {console.log(selectedCategory)}
                  {CLOTHING_SUBCATEGORIES[selectedCategory]?.map(
                    (option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="flex py-5 sm:py-6 items-center">
                {/* Content for Container 3 */}
                <div className="w-28 sm:w-32 text-lg">Color:</div>
                <select
                  className="p-2 rounded-3xl bg-white bg-opacity-20 shadow-xl text-center focus:outline-none hover:bg-opacity-30 transition-all duration-100 w-40"
                  {...register("color")}
                >
                  {COLORS.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex py-5 sm:py-6 items-center">
                {/* Content for Container 4 */}
                <div className="w-32 text-lg">Graphic:</div>
                <div className="flex pr-12">
                  <div className="p-2">yes</div>
                  <input
                    type="radio"
                    value="yesGraphic"
                    {...register("hasGraphic")}
                    className="border border-gray-200 p-2 rounded-md bg-black bg-opacity-30"
                  />
                </div>
                <div className="flex">
                  <div className="p-2">no</div>
                  <input
                    type="radio"
                    value="noGraphic"
                    {...register("hasGraphic")}
                    className="border border-gray-200 p-2 rounded-md bg-black bg-opacity-30"
                  />
                </div>
              </div>
              <div className="flex py-6 sm:py-8 px-0 sm:px-10 items-center text-lg">
                {/* Content for Container 5 */}
                <Link
                  to={"/app/closet"}
                  className="bg-[#D9D9D9] bg-opacity-50 p-2 rounded-2xl text-center shadow-xl hover:bg-opacity-60 transition-all duration-100 px-8 ml-5 mr-8 sm:mx-8"
                >
                  cancel
                </Link>
                <button
                  type="submit"
                  className="bg-[#D9D9D9] bg-opacity-50 p-2 rounded-2xl 
            text-center shadow-xl hover:bg-opacity-60 transition-all duration-100 
            px-8 mx-0 sm:mx-8"
                >
                  upload
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default Upload
