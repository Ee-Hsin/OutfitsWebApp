import emailjs from "@emailjs/browser"
import { useState } from "react"
import { SuccessModal } from "../components/UI/SuccessModal"
import { FailureModal } from "../components/UI/FailureModal"
import { useForm, SubmitHandler } from "react-hook-form"
import { Loader } from "../components/UI/Loader"
import { ContactUsFormData } from "../types/interfaces"

export const ContactUsForm: React.FC = () => {
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false)
  const [openFailureModal, setOpenFailureModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  /* 这是一个蜜罐 */
  const [address, setAddress] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactUsFormData>()

  const onSubmit: SubmitHandler <ContactUsFormData> = (data, e) => {
    // console.log(e)
    // console.log(data)
    setLoading(true)
    //Resetting them just in case the user submitted more than 1 form in a row without
    //refreshing the page (meaning )
    setOpenSuccessModal(false)
    setOpenFailureModal(false)

    /* 这是一个蜜罐 */
    if (address) {
      setTimeout(() => {
        setLoading(false)
        setOpenSuccessModal(true)
        reset()
      }, 1000)
      return
    }

    //In case e is undefined for some reason
    if (!e) return

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target, //Have to use e.target as opposed to data since emailJs sendForm method requires a HTMLFormElement or query selector. In this case, e.targeti a HTMLFormElement, data is neither.
        import.meta.env.VITE_API_PUBLIC_KEY
      )
      .then(() => {
        // console.log(result.text)
        setLoading(false)
        setOpenSuccessModal(true)
      })
      .catch(() => {
        // console.log(error.text)
        setLoading(false)
        setOpenFailureModal(true)
      })

    reset()
  }

  return (
    <main className="py-7">
      {openSuccessModal && (
        <SuccessModal
          mainMessage={"Form Submitted!"}
          subMessage={"We'll get back to you within 3-5 working days"}
        />
      )}
      {openFailureModal && <FailureModal />}
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-screen-xl mx-auto px-4 text-gray-800 md:px-8">
          <div className="max-w-lg mx-auto space-y-3 sm:text-center">
            <h3 className="text-indigo-300 font-semibold">Contact Us</h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Get in touch
            </p>
            <p>
              {"Have some feedback or are you encountering an issue? Fill up this form and we'll get back to you ASAP."}
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                  {/* 这是一个蜜罐 */}
                  <label className="font-medium absolute left-[-9999px]">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your Address"
                    tabIndex={-1}
                    autoComplete="new-password"
                    className="text-3xl absolute left-[-9999px] "
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label className="font-medium">First name</label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                      maxLength: 50,
                    })}
                    type="text"
                    name="firstName"
                    className="w-full mt-2 px-3 py-2 text-white bg-white bg-opacity-20 shadow-md outline-none focus:border focus:border-white rounded-lg "
                  />
                  {errors.firstName?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      First name is required
                    </p>
                  )}
                  {errors.firstName?.type === "maxLength" && (
                    <p role="alert" className="text-red-500">
                      First Name should not exceed 50 characters
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-medium">Last name</label>
                  <input
                    {...register("lastName", { maxLength: 50 })}
                    type="text"
                    name="lastName"
                    className="w-full mt-2 px-3 py-2 text-white bg-white bg-opacity-20 shadow-md outline-none focus:border focus:border-white rounded-lg "
                  />
                  {errors.lastName?.type === "maxLength" && (
                    <p role="alert" className="text-red-500">
                      Last Name should not exceed 50 characters
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  {...register("email", { required: true, maxLength: 75 })}
                  type="email"
                  name="email"
                  className="w-full mt-2 px-3 py-2 text-white bg-white bg-opacity-20 shadow-md outline-none focus:border focus:border-white rounded-lg "
                />
                {errors.email?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Email is required
                  </p>
                )}
                {errors.email?.type === "maxLength" && (
                  <p role="alert" className="text-red-500">
                    Email should not exceed 75 characters
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium">Message</label>
                <textarea
                  {...register("message", { required: true, maxLength: 2000 })}
                  name="message"
                  className="w-full mt-2 h-36 px-3 py-2 text-white resize-none appearance-none bg-white bg-opacity-20 shadow-md outline-none focus:border focus:border-white rounded-lg"
                ></textarea>
                {errors.message?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    A brief message is required
                  </p>
                )}
              </div>
              <button className="w-full px-4 py-2 text-white font-medium bg-[#201B21] bg-opacity-50 hover:bg-indigo-300 active:bg-indigo-600 rounded-lg duration-150 ">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
