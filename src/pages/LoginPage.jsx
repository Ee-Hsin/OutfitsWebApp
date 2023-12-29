import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { API_URL } from "../constants";
import { User } from "../model/user";
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
          <div className="flex justify-center mt-4">
            <GoogleLogin
              onSuccess={async (r) => {
                console.log(r);
                const response = await fetch(`${API_URL}/users/login/google`, {
                  method: "POST",
                  body: { googleId: r.clientId },
                });
                const responseJson = await response.json();
                const token = responseJson["user"];
                console.log(token);
                localStorage.setItem("token", token);
                return navigate("/app/closet", {
                  state: { user: User.fromGoogleId(r.clientId) },
                });
              }}
              onError={(e) => console.error(e)}
            />
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
