// Signup.jsx
import { Link, useNavigate } from "react-router-dom"
//import { GoogleIcon } from "../assets/icons/GoogleIcon";
// import { API_URL } from "../constants"
import { GoogleLogin } from "@react-oauth/google"
import { User } from "../model/user"
import { useForm } from "react-hook-form"
import { useCreateUser } from "../hooks/query"

function Signup() {
  const navigate = useNavigate()
  const mutation = useCreateUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data, e) => {
    e.preventDefault()

    //sends info to the server
    console.log(data)
    mutation.mutate(data)

    reset()
  }

  return (
    <main className="fixed w-full h-screen flex flex-col items-center justify-center px-4 ">
      <div className="max-w-sm w-full text-gray-300 p-10 rounded-xl bg-[#111827]">
        <div className="text-center">
          <div className="mx-auto w-32">
            <h1 className="font-monoton text-3xl text-indigo-400">Fitsss</h1>
          </div>
          <div className="mt-5 space-y-2">
            <h1 className="text-white text-2xl font-bold sm:text-3xl">
              Register
            </h1>
            <p className="">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-purple-500 hover:text-purple-600 duration-150"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          // onSubmit={async (e) => {
          //   e.preventDefault();
          //   const form = e.target;
          //   const formData = new FormData(form);

          //   const formJson = Object.fromEntries(formData.entries());
          //   const jsonBody = JSON.stringify(formJson);
          //   const response = await fetch(`${API_URL}/users`, {
          //     method: "POST",
          //     headers: {
          //       Accept: "*/*",
          //       "Content-Type": "application/json",
          //     },
          //     body: jsonBody,
          //   });

          //   if (response.ok) {
          //     navigate("/verify"); // no actual email verification
          //   }
          // }}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="font-medium">Username</label>
            <input
              name="username"
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
              name="email"
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
            Sign up
          </button>
          {/* <button
            type="button"
            className="w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-800 rounded-lg text-sm font-medium bg-gray-800/40 hover:bg-gray-800 ring-purple-500 focus:ring duration-150"
          >
            Continue with Google
          </button> */}

          <div className="flex justify-center mt-4">
            <GoogleLogin
              onSuccess={(r) =>
                navigate("/app/closet", {
                  state: { user: User.fromGoogleId(r.clientId) },
                })
              }
            />
          </div>
        </form>
      </div>
    </main>
  )
}
// const Signup = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const onSubmit = data => console.log(data);

//   return (
//     <section>
//       <div className="register">
//         <div className="col-1">
//           <h2>Sign Up</h2>
//           <p>Register and enjoy the service</p>

//           {/* Username Input */}
//           <div className="relative max-w-xs">
//             <svg
//               className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//               />
//             </svg>
//             <input
//               type="text"
//               {...register("username")}
//               placeholder="Enter your username"
//               className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//             />
//           </div>

//           {/* Password Input */}
//           <div className="relative max-w-xs">
//             <svg
//               className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//               />
//             </svg>
//             <input
//               type="password"
//               {...register("password")}
//               placeholder="Enter your password"
//               className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//             />
//           </div>

//           {/* Confirm Password Input */}
//           <div className="relative max-w-xs">
//             <svg
//               className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//               />
//             </svg>
//             <input
//               type="password"
//               {...register("confirmpwd")}
//               placeholder="Confirm your password"
//               className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//             />
//           </div>

//           {/* Mobile Number Input */}
//           <div className="relative max-w-xs">
//             <svg
//               className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//               />
//             </svg>
//             <input
//               type="text"
//               {...register("mobile", { required: true, maxLength: 10 })}
//               placeholder="Enter your mobile number"
//               className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//             />
//             {errors.mobile?.type === "required" && <span className="error">Mobile Number is required</span>}
//             {errors.mobile?.type === "maxLength" && <span className="error">Max Length Exceeded</span>}
//           </div>

//           <button className='btn' type="submit">Sign Up</button>
//         </div>
//       </div>
//     </section>
//   );
// }

export default Signup
