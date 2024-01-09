import { Link } from "react-router-dom";
import Logo from "../assets/logoBottom.png";

const Footer = () => {
  const footerNavs = [
    
    {
      name: "Help",
      href: "/contact",
    },
    {
      name: "Contact us",
      href: "/contact",
    },
  ];

  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
          <img src={Logo} className="w-40 mx-auto" alt="Logo" />
        </div>
        <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
          <p>© 2023 OuFFix. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
            {footerNavs.map((item, idx) => (
              <li
                className="text-gray-800 hover:text-gray-500 duration-150"
                key={idx}
              >
                <Link to={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
