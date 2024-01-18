import { Link, Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateUser, useCreateGoogleUser } from "../hooks/query";
import { FailureModal } from "../components/UI/FailureModal";
import { Loader } from "../components/UI/Loader";
import { CustomError, SignUpFormData } from "../types/interfaces";

const Signup: React.FC = () => {
  const mutation = useCreateUser();
  const googleMutation = useCreateGoogleUser();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    //sends info to the server
    mutation.mutate(data);

    reset();
  }

  return (
    <main className="fixed w-full h-screen flex flex-col items-center justify-center px-4 ">
      {/* TODO: Add mutation.isError and mutation.isPending */}
      {mutation.isSuccess && <Navigate to="/app/closet" />}
      {mutation.isError && (
        <FailureModal
          mainMessage={
            (mutation.error as CustomError)?.response?.data?.message ||
            "Oops, looks like something went wrong"
          }
          subMessage="Please try again and contact us if the error persists"
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
              Register
            </h1>
            <p className="">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-purple-300 hover:text-purple-400 duration-150"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
        {(mutation.isPending || googleMutation.isPending) ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="font-medium">Username</label>
              <input
                type="text"
                autoComplete="new-username"
                {...register("username", {
                  required: "A username is required",
                })}
                className="w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800"
              />
              {errors.username && (
                <p role="alert" className="text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
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
            <div>
              <label className="font-medium">Confirm Password</label>
              <input
                type="password"
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                className="w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800"
              />
              {errors.confirmPassword && (
                <p role="alert" className="text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button className="w-full text-gray-800 bg-gray-100 hover:bg-gray-200 ring-offset-2 focus:ring rounded-lg">
              Sign up
            </button>
            <div className="flex justify-center mt-4">
              {/* TODO: Have to figure out what exactly Google Login returns on success and
            how we can use it to update the user in AuthContext */}
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
      </div>
    </main>
  );
}

export default Signup;
