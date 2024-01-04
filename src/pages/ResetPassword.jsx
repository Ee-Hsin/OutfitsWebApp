import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useResetPassword } from "../hooks/query"
import { FailureModal } from "../components/UI/FailureModal"
import { SuccessModal } from "../components/UI/SuccessModal"
import { Loader } from "../components/UI/Loader"

function ResetPassword() {
  const { id, token } = useParams()
  const mutation = useResetPassword({ id: id, token: token })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data, e) => {
    e.preventDefault()

    //sends info to the server
    mutation.mutate(data)

    reset()
  }

  return (
    <main className="fixed w-full h-screen flex flex-col items-center justify-center px-4 ">
      {/* TODO: Add mutation.isError and mutation.isLoading */}
      {mutation.isError && (
        <FailureModal
          mainMessage="Oops, looks like something went wrong."
          subMessage="There may not be an account with this email.
          Please try again and contact us if the error persists"
        />
      )}
      {mutation.isSuccess && (
        <SuccessModal
          mainMessage="Success!"
          subMessage="Your Password has been reset."
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
              Reset Password
            </h1>
          </div>
        </div>
        {mutation.isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="font-medium">New Password</label>
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800"
              />
              {errors.password && (
                <p role="alert" className="text-red-500">
                  {errors.password.message}
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

export default ResetPassword
