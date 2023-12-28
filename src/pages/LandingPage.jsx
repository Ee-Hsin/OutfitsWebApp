//import React from "react"
import { useNavigate, Link } from "react-router-dom"

import LandingPageNavbar from "../components/LandingPageNavbar"
import Footer from "../components/Footer"
import Preview from "../assets/preview.png"
import Upload from "../assets/upload.png"

const LandingPage = () => {
  const navigate = useNavigate()
  const imageStyle = {
    border: '2px solid #000', // Adjust the border style as needed
    borderRadius: '8px', // Optional: Add border-radius for rounded corners
    boxShadow: '0 20px 20px rgba(0, 0, 0, 0.1)',
  };
  
  return (
    <div>
      <LandingPageNavbar />
      <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 px-4 flex-1 text-center sm:text-center lg:text-left">
          <h1 className="text-white font-bold text-4xl xl:text-5xl">
            Welcome to
            <span className="text-indigo-300"> Fitsss!</span>
          </h1>
          <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            An application designed to elevate your style game and simplify your
            daily routine. Discover the power of a well-organized closet and
            effortlessly express your unique fashion sense.
          </p>
          <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <Link
              to="/signup"
              className="px-7 py-3 w-36 bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-36 mx-auto  sm:mx-0 hover:bg-opacity-80"
              onClick={() => navigate("/signup")}
            >
              Get started
            </Link>
            {/* <a
              href="javascript:void(0)"
              className="px-7 py-3 w-full bg-gray-700 text-gray-200 text-center rounded-md block sm:w-auto"
            >
              Try it out
            </a> */}
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <img
          src={Preview} alt="" style={imageStyle}
          className="w-full mx-auto sm:w-10/12 lg:w-full"
          />
        </div>
      </section>
      <section className="mx-auto px-4 py-14">
        <div className="max-w-screen-xl md:px-8 ">
          <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex space-y-4">
            <div className="flex-1 text-center mt-7 lg:block lg:mt-0 lg:ml-3">
              <img
                src={Upload} style={imageStyle}
                className="w-full mx-auto sm:w-10/12 lg:w-full"
                alt=""
              />
            </div>
            <div className="max-w-screen-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl mx-auto md:px-8">
              <h3 className="text-indigo-300 font-semibold">
                Professional services
              </h3>
              <p className="text-white text-3xl font-semibold xl:text-4xl">
                Free outfit organizer with customized clothing recommendations
              </p>
              <p className="mt-3 text-gray-300 sm:mx-auto lg:ml-0">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum, sed ut perspiciatis unde omnis iste
                natus error sit voluptatem accusantium doloremque laudantium
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default LandingPage
