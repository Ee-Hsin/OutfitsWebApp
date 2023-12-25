import { Link } from "react-router-dom"

const LandingPageNavbar = () => {
  // Replace javascript:void(0) path with your path
  // const navigation = [
  //   { title: "Customers", path: "javascript:void(0)" },
  //   { title: "Careers", path: "javascript:void(0)" },
  // ]

  return (
    <header className="bg-[#201B21] bg-opacity-60 py-3">
      <nav className="items-center px-4 mx-auto max-w-screen-xl sm:px-8 sm:flex sm:space-x-6">
        {/* <a href="javascript:void(0)">
          <img
            src="https://www.floatui.com/images/logo.svg"
            width={120}
            height={50}
            alt="Float UI logo"
          />
        </a> */}
        <Link to="/">
          <h1 className="font-monoton text-3xl text-indigo-400">Fitsss</h1>
        </Link>
        <ul className="py-4 flex-1 items-center flex space-x-3 sm:space-x-6 sm:justify-end">
          {/* {navigation.map((item, idx) => (
            <li className="text-gray-200" key={idx}>
              <a href={item.path}>{item.title}</a>
            </li>
          ))} */}
          <li className="mt-4 lg:mt-0">
            <Link
              to="/login"
              className="py-3 px-4 text-center border text-gray-200 hover:text-gray-300 rounded-md block lg:inline lg:border-0"
            >
              Login
            </Link>
          </li>
          <li className="mt-8 lg:mt-0">
            <Link
              to="/signup"
              className="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default LandingPageNavbar
