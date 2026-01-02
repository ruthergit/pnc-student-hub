import { useEffect, useState } from "react"
import { House, Search, Plus, MessageCircle, User, Bell, Menu } from "lucide-react"
import { NavLink } from "react-router-dom"
import logo from "../../assets/images/pnc-logo.png"

const Navbar = () => {
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down
        setShowNav(false)
      } else {
        // scrolling up
        setShowNav(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])


  return (
    <>
      {/* MOBILE TOP */}
      <header className={`fixed w-full flex items-center justify-between px-4.5 p-3 top-0 right-0 z-50 bg-white md:hidden text-slate-700 ${showNav ? "translate-x-0" : "translate-x-full"}`}>
        <div>
          <Menu size={22} className="text-slate-700 hover:text-green rounded transition-all duration-200"/>
        </div>
        <div>
          <Bell size={22} className="text-slate-700 hover:text-green rounded transition-all duration-200"/>
        </div>
      </header>
      {/* MOBILE BOTTOM NAV */}
      <nav
          className={`
            fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 md:hidden
            transition-transform duration-300 ease-in-out text-slate-700 border pb-3 pt-0.5
            }
          `}
        >
        <div className="flex justify-between items-center px-6 py-3">
          <NavLink to="/feed" end>
              {({ isActive }) => (
                <House className={isActive ? "text-green" : ""} />
              )}
          </NavLink>
            <NavLink to="/feed/search">
                {({ isActive }) => (
                <Search className={isActive ? "text-green" : ""} />
              )}
            </NavLink>
            <NavLink to="/feed/create">
              {({ isActive }) => (
                <Plus className={isActive ? "text-green" : ""} />
              )}
            </NavLink>
             <NavLink to="/feed/chats">
              {({ isActive }) => (
                <MessageCircle className={isActive ? "text-green" : ""} />
              )}
            </NavLink>
             <NavLink to="/feed/profile">
              {({ isActive }) => (
                <User className={isActive ? "text-green" : ""} />
              )}
            </NavLink>
        </div>
      </nav>
      

      {/* TOP NAVIGATION BAR */}
      <header
        className={`
          hidden md:block fixed top-0 left-0 right-0 h-16
          bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-4 md:px-8
          transition-transform duration-300 ease-in-out
          ${showNav ? "translate-y-0" : "-translate-y-full"}
        `}
      >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        <div className="flex items-center gap-2 cursor-pointer">
          <img className="w-8 h-8 object-contain" src={logo} alt="PNC Logo" />
          <h1 className="text-lg font-bold text-green hidden sm:block tracking-tight">PNC</h1>
        </div>

        <nav>
          <ul className="flex items-center gap-1 sm:gap-6">
            {[
              { icon: <House size={22} />, label: "Home" },
              { icon: <Search size={22} />, label: "Search" },
              { icon: <Plus size={22} />, label: "Create" },
              { icon: <MessageCircle size={22} />, label: "Messages" },
              { icon: <User size={22} />, label: "Profile" },
            ].map((item, index) => (
              <li key={index} className="relative group">
                <button 
                  className="p-3 text-slate-700 rounded hover:bg-green/10 hover:text-green transition-all duration-200 flex items-center justify-center"
                  aria-label={item.label}
                >
                  {item.icon}

                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block px-7">
          <Bell size={22} className="text-slate-700 hover:text-green rounded transition-all duration-200"/>
        </div>
        
      </div>
      </header>
  </>
  )
}

export default Navbar
