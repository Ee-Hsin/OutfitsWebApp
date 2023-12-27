import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./LandingPageNavbar.css"
import Logo from "../assets/locker.png"


const LandingPageNavbar = () => {
  const [state, setState] = useState(false)
  const navRef = useRef()

  // Replace javascript:void(0) path with your path
  //   const navigation = [
  //     { title: "Customers", path: "javascript:void(0)" },
  //     { title: "Careers", path: "javascript:void(0)" },
  //     { title: "Guides", path: "javascript:void(0)" },
  //     { title: "Partners", path: "javascript:void(0)" },
  //     { title: "Teams", path: "javascript:void(0)" },
  //     { title: "Blog", path: "javascript:void(0)" },
  //   ]

  useEffect(() => {
    const body = document.body

    // Disable scrolling
    const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"]
    if (state) body.classList.add(...customBodyStyle)
    // Enable scrolling
    else body.classList.remove(...customBodyStyle)

    // Sticky strick
    const customStyle = ["sticky-nav", "fixed"]
    window.onscroll = () => {
      if (window.scrollY > 80) navRef.current.classList.add(...customStyle)
      else navRef.current.classList.remove(...customStyle)
    }
  }, [state])

  return (
    <nav
      ref={navRef}
      className="bg-[#201B21] bg-opacity-60 w-full h-28 top-0 z-20 border-none"
    >
      <div className="items-center px-4 pt-5 max-w-screen-xl mx-auto md:px-8 md:flex">
      <div className="flex items-center justify-between p-4">
      <Link to="/" className="flex items-center">
        <h1 className="font-monoton text-4xl text-white hover:text-[#d6ccde]">Fitsss</h1>
        <img src={Logo} className="w-16 h-16 ml-2" alt="Logo" /> {/* Adjust the width and height as needed */}
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
            state ? "h-screen pb-20 overflow-auto pr-4" : "hidden"
          }`}
        >
          <div>
            <ul className="flex flex-col-reverse space-x-0 md:space-x-6 md:flex-row">
              {/* <li className="mt-8 mb-8 lg:mt-0 lg:mb-0">
                <a
                  href="javascript:void(0)"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Contact
                </a>
              </li> */}
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
            </ul>
          </div>
          {/* <div className="flex-1">
            <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <li key={idx} className="text-gray-600 hover:text-indigo-600">
                    <a href={item.path}>{item.title}</a>
                  </li>
                )
              })}
            </ul>
          </div> */}
        </div>
      </div>
    </nav>
  )
}

export default LandingPageNavbar
