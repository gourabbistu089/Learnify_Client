import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropdown from "../core/auth/ProfileDropdown";
import { categories } from "../../services/api";
import { apiConnector } from "../../services/apiConnector";
import { 
  Home, 
  BookOpen, 
  Phone, 
  Info, 
  User, 
  ShoppingCart, 
  Search,
  GraduationCap,
  ChevronDown 
} from "lucide-react";

// Icon mapping function - customize this based on your actual NavbarLinks
const getIconForLink = (title) => {
  const iconMap = {
    "Home": Home,
    "About": Info,
    "Contact": Phone,
    "Catalog": BookOpen,
    "Courses": GraduationCap,
    "Profile": User,
    "Cart": ShoppingCart,
    "Search": Search,
    // Add more mappings as needed for your specific links
  };
  
  return iconMap[title] || BookOpen; // Default icon if not found
};


function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsCatalogOpen(false);
  };

  const Logo = () => (
    <svg 
      width="180" 
      height="38" 
      viewBox="0 0 370 136" 
      className="w-auto h-8 md:h-10"
    >
      <defs>
        <linearGradient id="logoGradient">
          <stop stopColor="#905e26" offset="0" />
          <stop stopColor="#f5ec9b" offset="0.5" />
          <stop stopColor="#905e26" offset="1" />
        </linearGradient>
      </defs>
      <g fill="url(#logoGradient)">
        <rect y="131" width="370" height="5" />
        <g transform="matrix(1.222,0,0,1.222,-4.99,14.01)">
          <circle cx="45" cy="44.404" r="4.621" />
          <path d="M31.56,35.003c2.132,2.208,4.766,3.639,7.549,4.287c-0.549-2.804-1.886-5.487-4.018-7.695c-2.132-2.209-4.766-3.639-7.549-4.288C28.091,30.11,29.428,32.794,31.56,35.003z" />
          <path d="M35.003,58.439c2.208-2.131,3.639-4.766,4.287-7.549c-2.803,0.55-5.486,1.888-7.695,4.019c-2.208,2.133-3.64,4.767-4.288,7.55C30.11,61.908,32.793,60.572,35.003,58.439z" />
          <path d="M58.44,54.998c-2.133-2.209-4.767-3.64-7.55-4.287c0.549,2.804,1.887,5.487,4.019,7.694c2.132,2.209,4.767,3.64,7.549,4.288C61.908,59.89,60.57,57.206,58.44,54.998z" />
          <path d="M54.999,31.561c-2.21,2.132-3.641,4.766-4.288,7.549c2.803-0.551,5.486-1.886,7.694-4.019c2.21-2.132,3.641-4.766,4.288-7.548C59.89,28.091,57.206,29.429,54.999,31.561z" />
          <path d="M45,4.085c-20.801,27.626,0,27.927,0,27.927S65.801,31.712,45,4.085z" />
          <path d="M45,85.914c20.8-27.625,0-27.926,0-27.926S24.199,58.289,45,85.914z" />
          <path d="M4.085,45c27.626,20.801,27.927,0,27.927,0S31.711,24.199,4.085,45z" />
          <path d="M85.915,45c-27.626-20.801-27.927,0-27.927,0S58.289,65.802,85.915,45z" />
        </g>
        <g transform="matrix(2.071,0,0,2.071,115.86,2.18)">
          <path d="M2 40 l0 -32 l4 0 l0 28 l5.2 0 l0 4 l-9.2 0 z M16.1 40 l0 -32 l9.2 0 l0 3.2 l-5.2 0 l0 10.4 l4.4 0 l0 3.2 l-4.4 0 l0 11.2 l5.2 0 l0 4 l-9.2 0 z M30.6 40 l0 -16.8 c0 -11.16 0 -15.56 6 -15.56 s6 4.4 6 15.56 l0 16.8 l-4 0 l0 -9.2 l-4 0 l0 9.2 l-4 0 z M34.6 27.6 l4 0 l0 -4.4 c0 -10.4 0 -12.36 -2 -12.36 s-2 1.96 -2 12.36 l0 4.4 z M49.1 40 l0 -32 l6.48 0 c4.12 0 5.52 2.52 5.52 7.36 c0 4.36 -0.52 6.84 -1.76 8.04 l0 0.24 c1.04 0.36 1.36 2.24 1.76 6.92 l0.8 9.44 l-4 0 l-0.52 -9.44 c-0.28 -4.76 -1 -5.76 -2.2 -5.76 l-2.08 0 l0 15.2 l-4 0 z M53.1 21.6 l2.48 0 c1.4 0 1.8 -1.4 1.8 -6.24 c0 -3.16 -0.6 -4.16 -1.8 -4.16 l-2.48 0 l0 10.4 z M67.6 40 l0 -32 l3.6 0 l5.24 19.6 l-0.04 -0.4 l0 -19.2 l4 0 l0 32 l-3.6 0 l-5.24 -17.6 l0.04 0.4 l0 17.2 l-4 0 z M86.89999999999999 40 l0 -32 l4 0 l0 32 l-4 0 z M97.39999999999999 40 l0 -32 l8.4 0 l0 3.2 l-4.4 0 l0 12 l3.6 0 l0 3.2 l-3.6 0 l0 13.6 l-4 0 z M109.5 8 l4 0 l2.4 12.32 l0.4 0 l2.4 -12.32 l4 0 l-4.6 18.08 l0 13.92 l-4 0 l0 -13.92 z" />
        </g>
        <g transform="matrix(1.028,0,0,1.028,117.39,98.86)">
          <path d="M2.54 18.76 l0 -10.76 c0 -0.42 0.32 -0.64 0.64 -0.64 s0.66 0.22 0.66 0.64 l0 10.06 l3.98 0 c0.44 0 0.68 0.34 0.68 0.68 s-0.24 0.66 -0.68 0.66 l-4.62 0 c-0.4 0 -0.66 -0.32 -0.66 -0.64 z" />
        </g>
      </g>
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-richblack-900 border-b border-richblack-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 md:h-[60px]">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
            onClick={closeMobileMenu}
          >
            <Logo />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NavbarLinks.map((link, index) => (
              <div key={index} className="relative">
                {link.title === "Catalog" ? (
                  <div className="group">
                    <button className="flex items-center space-x-1 text-richblack-200 hover:text-yellow-100 font-medium text-lg transition-colors duration-200 py-2">
                      <span>{link.title}</span>
                      <IoIosArrowDown className="text-xl group-hover:rotate-180 transition-transform duration-200" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-1/2 transform -translate-x-1/2 pt-2 transition-all duration-200 z-50">
                      <div className="bg-richblack-800 rounded-lg shadow-xl border border-richblack-700 py-3 px-2 min-w-64">
                        <div className="absolute -top-2 left-[64%] transform -translate-x-1/2 w-4 h-4 bg-richblack-800 border-l border-t border-richblack-700 rotate-45"></div>
                        {subLinks?.length > 0 && subLinks.map((subLink, idx) => (
                          <NavLink
                            key={idx}
                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}/${subLink._id}`}
                            className="block text-richblack-100 hover:text-yellow-100 hover:bg-richblack-700 px-4 py-3 rounded-md transition-all duration-200 text-sm font-medium"
                          >
                            {subLink.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `font-medium text-lg transition-colors duration-200 py-2 px-1 relative ${
                        isActive 
                          ? "text-yellow-100" 
                          : "text-richblack-200 hover:text-yellow-100"
                      }`
                    }
                  >
                    {link.title}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user && user.accountType === "student" && (
              <NavLink 
                to="/dashboard/cart" 
                className="relative p-2 text-richblack-25 hover:text-yellow-100 transition-colors duration-200"
              >
                <AiOutlineShoppingCart className="text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-100 text-richblack-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            )}

            {token === null ? (
              <div className="flex items-center space-x-3">
                <NavLink to="/login">
                  <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-richblack-900 font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/signup">
                  <button className="bg-richblack-800 hover:bg-richblack-700 text-yellow-50 font-semibold px-6 py-2.5 rounded-lg border-2 border-richblack-600 hover:border-richblack-500 transition-all duration-200 transform hover:scale-105">
                    Sign Up
                  </button>
                </NavLink>
              </div>
            ) : (
              <ProfileDropdown />
            )}
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="flex items-center space-x-2 lg:hidden">
              <div className="px-1 relative">
                     {user && user.accountType === "student" && (
              <NavLink 
                to="/dashboard/cart" 
                className="relative p-2 text-richblack-25 hover:text-yellow-100 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                <AiOutlineShoppingCart className="text-[24px]" />
                {totalItems > 0 && (
                  <span className="absolute md:-top-1 md:-right-1 top-6 left-4
                  bg-yellow-100 text-richblack-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            )}
                </div>
            <ProfileDropdown />

            <button
              className="menu-toggle p-2 text-richblack-25 hover:text-yellow-100 transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose className="text-2xl" />
              ) : (
                <AiOutlineMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="py-4 space-y-2 border-t border-richblack-700">
            {/* Mobile Navigation Links */}
         {NavbarLinks.map((link, index) => {
        const IconComponent = getIconForLink(link.title);
  
  return (
    <div key={index}>
      {link.title === "Catalog" ? (
        <>
          <button
            className="flex items-center justify-between w-full text-left text-richblack-200 hover:text-yellow-100 font-medium py-4 px-5 rounded-xl hover:bg-richblack-800 transition-all duration-300 group hover:shadow-lg"
            onClick={() => setIsCatalogOpen(!isCatalogOpen)}
          >
            <div className="flex items-center gap-3">
              <IconComponent 
                size={20} 
                className="transition-colors duration-300 group-hover:text-yellow-100" 
              />
              <span className="text-base">{link.title}</span>
            </div>
            <ChevronDown 
              size={18} 
              className={`transition-all duration-300 ${
                isCatalogOpen ? 'rotate-180 text-yellow-100' : 'text-richblack-300'
              }`} 
            />
          </button>
                     
          {/* Mobile Catalog Dropdown */}
          <div className={`transition-all duration-300 ease-in-out ${
            isCatalogOpen
               ? 'max-h-96 opacity-100'
               : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="pl-8 space-y-2 pt-2">
              {subLinks?.length > 0 && subLinks.map((subLink, idx) => (
                <NavLink
                  key={idx}
                  to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}/${subLink._id}`}
                  className="flex items-center gap-3 text-richblack-100 hover:text-yellow-100 hover:bg-richblack-800 py-3 px-4 rounded-lg transition-all duration-300 text-sm group hover:shadow-md"
                  onClick={closeMobileMenu}
                >
                  <div className="w-2 h-2 bg-richblack-400 rounded-full group-hover:bg-yellow-100 transition-colors duration-300"></div>
                  <span>{subLink.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </>
      ) : (
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `flex items-center gap-3 font-medium py-4 px-5 rounded-xl transition-all duration-300 group hover:shadow-lg ${
              isActive
                 ? "text-yellow-100 bg-richblack-800 shadow-md"
                 : "text-richblack-200 hover:text-yellow-100 hover:bg-richblack-800"
            }`
          }
          onClick={closeMobileMenu}
        >
          <IconComponent 
            size={20} 
            className="transition-colors duration-300 group-hover:text-yellow-100" 
          />
          <span className="text-base">{link.title}</span>
        </NavLink>
      )}
    </div>
  );
})}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-richblack-700">
              {token === null ? (
                <div className="space-y-3 flex flex-col sm:flex-row gap-y-1">
                  <NavLink to="/login" onClick={closeMobileMenu}>
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-richblack-900 font-semibold py-3 rounded-lg transition-all duration-200 shadow-md">
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="/signup" onClick={closeMobileMenu}>
                    <button className="w-full bg-richblack-800 hover:bg-richblack-700 text-yellow-50 font-semibold py-3 rounded-lg border-2 border-richblack-600 hover:border-richblack-500 transition-all duration-200">
                      Sign Up
                    </button>
                  </NavLink>
                </div>
              ) : (
              <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;