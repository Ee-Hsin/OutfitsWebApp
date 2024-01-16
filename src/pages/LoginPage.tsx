import { Link, Navigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { useSignInUser, useSignInGoogleUser } from "../hooks/query"
import { useForm, SubmitHandler } from "react-hook-form"
import { FailureModal } from "../components/UI/FailureModal"
import { Loader } from "../components/UI/Loader"
import { CustomError, LoginFormData } from "../types/interfaces"

const LoginPage: React.FC = () => {
  const mutation = useSignInUser()
  const googleMutation = useSignInGoogleUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>()

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    //sends info to the server
    mutation.mutate(data)
    reset()
  }

  return (
    <main className="fixed w-full h-screen flex flex-col items-center justify-center px-4 ">
      {mutation.isSuccess && <Navigate to="/app/closet" />}
      {/* {mutation.isError && console.log(mutation.error)} */}
      {mutation.isError && (
        <FailureModal
          mainMessage={
            (mutation.error as CustomError)?.response?.data?.message ||
            "Oops, looks like something went wrong"
          }
          subMessage="Your email or password may be incorrect"
        />
      )}
      {googleMutation.isSuccess && <Navigate to="/app/closet" />}
      {googleMutation.isError && (
        <FailureModal
          mainMessage={
            (googleMutation.error as CustomError)?.response?.data?.message ||
            "Oops, looks like something went wrong"
          }
          subMessage="Please try again and contact us if the error persists"
        />
      )}
      <div className="max-w-sm w-full text-gray-300 p-10 rounded-xl bg-[#111827]">
        <div className="text-center">
          <Link to={"/"} className="mx-auto w-32">
            <h1 className="font-monoton text-3xl text-indigo-300">Ouffix</h1>
          </Link>
          <div className="mt-5 space-y-2">
            <h1 className="text-white text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h1>
            <p className="">
              {"Don't have an account? "}
              <Link
                to="/signup"
                className="font-medium text-purple-300 hover:text-purple-400 duration-150"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        {mutation.isPending || googleMutation.isPending ? (
          <div className="my-6">
            <Loader />
          </div>
        ) : (
          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
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
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                autoComplete="password"
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
              Sign in
            </button>
            <div className="flex justify-center mt-4">
              <GoogleLogin
                onSuccess={(r) =>
                  // Sends clientId and credential from google to backend to create user
                  googleMutation.mutate({
                    googleId: r.clientId,
                    googleCred: r.credential,
                  })
                }
              />
            </div>
          </form>
        )}
        <div className="text-center mt-5 space-y-2">
          <Link
            to="/forgot-password"
            className="font-medium text-purple-300 hover:text-purple-400 duration-150"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
