// const Footer = () => {
//     const year = new Date().getFullYear();
  
//     return <footer>{`Copyright © Fitsss ${year}`}</footer>;
//   };
  
//   export default Footer;

import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/locker.png"


const Footer = () => {
    const navigate = useNavigate()
  const footerNavs = [
    {
      href: 'javascript:void()',
      name: 'Terms',
    },
    // {
    //   href: 'javascript:void()',
    //   name: 'License',
    // },
    {
      href: 'javascript:void()',
      name: 'Help',
    },
    {
      href: 'javascript:void()',
      name: 'About us',
    },
  ];

  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
          <img src={Logo} className="w-32 sm:mx-auto" alt="Logo" />
          <p></p>
          <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
            
          <Link
              to="/signup"
              className="py-3 px-4 text-center text-[#201B21] bg-[#d5cffa] md:bg-[#cfc9d6] hover:bg-white shadow-md hover:shadow-xl rounded-md mx-auto block md:inline w-[40%] transition-all duration-100"
              onClick={() => navigate("/signup")}
            >
              Let's get started
            </Link>
            <Link
                to="/signup"
            
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
              onClick={() => navigate("/signup")}
            >
              Get access
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                  clipRule="evenodd"
                />
              </svg>

            </Link>
          </div>
        </div>
        <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
          <p>© 2023 Fitsss. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
            {footerNavs.map((item, idx) => (
              <li className="text-gray-800 hover:text-gray-500 duration-150" key={idx}>
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


  