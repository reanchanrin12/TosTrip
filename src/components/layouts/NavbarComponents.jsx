import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../assets/Final_Tostriplogo.png";
import { fetchAllUsers } from "../../services/userService"; 
import { FaRegUserCircle } from "react-icons/fa";
export function NavbarComponents() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user data
  const [error, setError] = useState(null);

  // Check login status and fetch user data
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsLoggedIn(true);
        try {
          const userData = await fetchAllUsers(); // Fetch user data after login
          setUser(userData); // Store user data in state
        } catch (err) {
          setError("Error fetching user data.");
          console.error(err);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUser(null); 
  };


  const handleMobileMenuClose = () => setIsOpen(false);


  const menu = [
    { path: "/", title: "ទំព័រដើម" },
    { path: "/place", title: "ដំណើរទេសចរណ៍" },
    { path: "/about", title: "អំពីយើង" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md font-[Suwannaphum]">
      <nav className="max-w-screen-2xl mx-auto py-4 px-6 md:px-[7%] flex items-center justify-between">
        
        <NavLink to="/">
          <img src={logo} alt="logo" className="h-16 object-cover" />
        </NavLink>

        
        <div className="hidden md:flex space-x-6 gap-15">
          {menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "text-[#faa834] font-semibold" : "text-black hover:text-[#faa834]"
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>

        
        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2 text-[#faa834] font-semibold">
              <span className="text-4xl"><FaRegUserCircle /></span>
              <button
                onClick={() => {
                  handleLogout();
                  handleMobileMenuClose();
                }}
                className="text-black border border-[#faa834] px-4 py-2 rounded-md hover:bg-[#faa834] hover:text-white"
              >
                ចេញពីគណនី
              </button>
            </div>
          ) : (
            <>
              <Link to="/auth/login" onClick={handleMobileMenuClose}>
                <div className="border border-[#faa834] text-black px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-white">
                  ចូលគណនី
                </div>
              </Link>
              <Link to="/auth/register" onClick={handleMobileMenuClose}>
                <div className="bg-[#faa834] text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                  ចុះឈ្មោះ
                </div>
              </Link>
            </>
          )}
        </div>

       
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      
      <div
        className={`md:hidden bg-white absolute w-full top-[60px] left-0 shadow-md transform transition-transform ${isOpen ? "block" : "hidden"
          }`}
      >
        <div className="flex flex-col items-center space-y-4 py-5">
          {menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={handleMobileMenuClose}
              className="text-black hover:text-[#faa834] text-lg"
            >
              {item.title}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <div className="flex items-center space-x-2 text-[#faa834] font-semibold">
              <span className="text-xl">👤</span>
              <button
                onClick={() => {
                  handleLogout();
                  handleMobileMenuClose();
                }}
                className="text-black border border-[#faa834] px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-white"
              >
                ចេញពីគណនី
              </button>
            </div>
          ) : (
            <>
              <Link to="/auth/login" onClick={handleMobileMenuClose}>
                <div className="border border-[#faa834] text-black px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-white">
                  ចូលគណនី
                </div>
              </Link>
              <Link to="/auth/register" onClick={handleMobileMenuClose}>
                <div className="bg-[#faa834] text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                  ចុះឈ្មោះ
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
