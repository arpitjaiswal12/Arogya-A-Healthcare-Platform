import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { navBarList } from "./Constants/index.js";
import { motion } from "framer-motion";
import logo from "../assets/Arogya_logo.png"; // Import your logo here
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-2 py-2 h-14 sm:p-2">
        <Link to="/" className="flex items-center">
          {/* Logo Image */}
          <img src={logo || " "} alt="Logo" className="w-10 h-10 mr-2" />
          {/* Logo Text */}
          <h1 className="font-serif font-bold text-sm sm:text-2xl flex flex-wrap">
            <span className="text-green-800">Arogya</span>
          </h1>
        </Link>

        <div>
          {showMenu && (
            <motion.ul
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center w-auto z-50 p-0 gap-2"
            >
              <>
                {navBarList.map(({ _id, title, link }) => (
                  <NavLink
                    key={_id}
                    className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#454444] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                    to={link}
                    state={{ data: location.pathname.split("/")[1] }}
                  >
                    <li>{title}</li>
                  </NavLink>
                ))}
              </>
              <Link to="/profile">
                {currentUser ? (
                  <img
                    className="rounded-full h-7 w-7 object-cover"
                    src={currentUser?.user?.image || " "}
                    alt="profile"
                  />
                ) : (
                  <li className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#454444] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0">
                    <Link to="/login">Login</Link>
                  </li>
                )}
              </Link>
            </motion.ul>
          )}
          <HiMenuAlt2
            onClick={() => setSidenav(!sidenav)}
            className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
          />
          {sidenav && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80%] h-full relative"
              >
                <div className="w-full h-full bg-primeColor p-6">
                  <img src={logo} alt="Logo" className="w-10 h-10 mb-4" />
                  <span className="text-green-800">Arogya</span>
                  <ul className="text-gray-200 flex flex-col gap-2">
                    {navBarList.map((item) => (
                      <li
                        className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                        key={item._id}
                      >
                        <NavLink
                          to={item.link}
                          state={{ data: location.pathname.split("/")[1] }}
                          onClick={() => setSidenav(false)}
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                  <Link to="/profile">
                    {currentUser ? (
                      <img
                        className="rounded-full h-7 w-7 object-cover mt-4"
                        src={currentUser?.user?.image || " "}
                        alt="profile"
                      />
                    ) : (
                      <li className="list-none font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0">
                        <Link to="/login" onClick={() => setSidenav(false)}>
                          Login
                        </Link>
                      </li>
                    )}
                  </Link>
                </div>
                <span
                  onClick={() => setSidenav(false)}
                  className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                >
                  <MdClose />
                </span>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
