import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./LandingPageNavbar.css"
import Logo from "../assets/logoTop.png"
import { useAuth } from "../hooks/AuthContext"

const LandingPageNavbar : React.FC = () => {
  const [state, setState] = useState<boolean>(false)
  const navRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    const body = document.body

    // Disable scrolling
    const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"]
    if (state) body?.classList?.add(...customBodyStyle)
    // Enable scrolling
    else body?.classList?.remove(...customBodyStyle)

    // Sticky strick
    const customStyle = ["sticky-nav", "fixed"]
    window.onscroll = () => {
      if (window.scrollY > 80) navRef?.current?.classList?.add(...customStyle)
      else navRef?.current?.classList?.remove(...customStyle)
    }
  }, [state])

  return (
    <>
      <nav
        ref={navRef}
        className="sticky z-20 bg-[#201B21] bg-opacity-60 w-full h-[90px] md:h-28 top-0 border-none"
      >
        <div className="items-center px-4 md:pt-3 max-w-screen-xl mx-auto md:px-8 md:flex">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="flex items-center">
              <h1 className="font-monoton text-4xl text-white hover:text-[#d6ccde]">
                Ouffix
              </h1>
              <img src={Logo} className="h-14 ml-2" alt="Logo" />{" "}
              {/* Adjust the width and height as needed */}
            </Link>
            <div className="md:hidden">
              <button
                className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`flex-1 justify-between flex-row-reverse md:overflow-visible md:flex md:pb-0 md:pr-0 md:h-auto ${
              state ? "block" : "hidden"
            }`}
          >
            <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0 text-lg font-montserrat">
              {user ? (
                <li className="mt-8 md:mt-0">
                  <Link
                    to="/app"
                    className="py-3 px-4 text-center text-[#201B21] bg-[#d5cffa] md:bg-[#cfc9d6] hover:bg-white shadow-md hover:shadow-xl rounded-md mx-auto block md:inline w-[40%] transition-all duration-100"
                  >
                    Enter App
                  </Link>
                </li>
              ) : (
                <>
                  <li className="mt-4 md:mt-0">
                    <Link
                      to="/login"
                      className="py-3 px-4 bg-[#ddd8e6]  text-center bordertext-[#201B21] md:text-white hover:bg-white md:hover:bg-opacity-0 shadow-md hover:shadow-xl rounded-md mx-auto block md:inline md:border-0 md:bg-opacity-0 w-[40%] "
                    >
                      Login
                    </Link>
                  </li>
                  <li className="mt-8 md:mt-0">
                    <Link
                      to="/signup"
                      className="py-3 px-4 text-center text-[#201B21] bg-[#d5cffa] md:bg-[#cfc9d6] hover:bg-white shadow-md hover:shadow-xl rounded-md mx-auto block md:inline w-[40%] transition-all duration-100"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {state ? (
        <div
          className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setState(false)}
        ></div>
      ) : (
        ""
      )}
    </>
  )
}

export default LandingPageNavbar