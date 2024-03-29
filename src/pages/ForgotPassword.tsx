import { useForm, SubmitHandler } from "react-hook-form"
import { useForgotPassword } from "../hooks/query"
import { FailureModal } from "../components/UI/FailureModal"
import { SuccessModal } from "../components/UI/SuccessModal"
import { Loader } from "../components/UI/Loader"
import { CustomError, ForgotPasswordFormData } from "../types/interfaces"

const ForgotPassword: React.FC = () => {
  const mutation = useForgotPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>()

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {

    //sends info to the server
    mutation.mutate(data)

    reset()
  }

  return (
    <main className="fixed w-full h-screen flex flex-col items-center justify-center px-4 ">
      {/* TODO: Add mutation.isError and mutation.isPending */}
      {mutation.isError && (
        <FailureModal
          mainMessage={(mutation.error as CustomError)?.response?.data?.message ||
            "There may not be an account with this email."}
          subMessage="Please try again and contact us if the error persists"
        />
      )}
      {mutation.isSuccess && (
        <SuccessModal
          mainMessage="Success!"
          subMessage="Please check your email for a link to reset your password."
          redirectMessage="Return to Login"
          redirectLink="/login"
        />
      )}
      <div className="max-w-sm w-full text-gray-300 p-10 rounded-xl bg-[#111827]">
        <div className="text-center">
          <div className="mx-auto w-32">
            <h1 className="font-monoton text-3xl text-indigo-400">Fitsss</h1>
          </div>
          <div className="mt-5 space-y-2">
            <h1 className="text-white text-2xl font-bold sm:text-3xl">
              Forgot Password?
            </h1>
          </div>
        </div>
        {mutation.isPending ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "An email is required",
                })}
                className="w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800"
              />
              {errors.email && (
                <p role="alert" className="text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button className="w-full text-gray-800 bg-gray-100 hover:bg-gray-200 ring-offset-2 focus:ring rounded-lg">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </main>
  )
}

export default ForgotPassword
