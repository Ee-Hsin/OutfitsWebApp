import { Link, useNavigate } from "react-router-dom";
import { GoogleIcon } from "../assets/icons/GoogleIcon";
const API_URL = "https://fitss.up.railway.app/";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <main className="fixed w-full h-screen flex flex-col items-center justify-center px-4 ">
      <div className="max-w-sm w-full text-gray-300 p-10 rounded-xl bg-[#111827]">
        <div className="text-center">
          <div className="mx-auto w-32">
            <h1 className="font-monoton text-3xl text-indigo-400">Fitsss</h1>
          </div>
          <div className="mt-5 space-y-2">
            <h1 className="text-white text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h1>
            <p className="">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-purple-500 hover:text-purple-600 duration-150"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <form
          method="post"
          onSubmit={async (e) => {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);

            const formJson = Object.fromEntries(formData.entries());
            const jsonBody = JSON.stringify(formJson);
            const response = await fetch(`${API_URL}/users/login`, {
              method: "POST",
              headers: {
                api_key: "ebb4f508-zyrj-4087-tgnu-a5a8441b3ca4",
                Accept: "*/*",
                "Content-Type": "application/json",
              },
              body: jsonBody,
            });
            if (response.ok) {
              console.log("User signed in");
              //redirect to main page
              navigate("/closet");
            }
          }}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800"
            />
          </div>
          <button className="w-full text-gray-800 bg-gray-100 hover:bg-gray-200 ring-offset-2 focus:ring rounded-lg">
            Sign in
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-800 rounded-lg text-sm font-medium bg-gray-800/40 hover:bg-gray-800 ring-purple-500 focus:ring duration-150"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
