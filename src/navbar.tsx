import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import mainlogo from './Images/logo.jpg';
import Cookies from 'js-cookie';

import {
  Menu,
  X,
  ChevronDown,
  Home,
  Settings,
  Users,
  Phone,
  BookOpen,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
} from 'lucide-react';

type SubMenuItem = {
  title: string;
  path: string;
  external?: boolean;
};

type MenuItemType = {
  title: string;
  icon: JSX.Element;
  path?: string;
  submenu?: SubMenuItem[];
};

const menuItems: MenuItemType[] = [
  {
    title: 'Home',
    icon: <Home className="w-5 h-5" />,
    path: '/',
  },
  {
    title: 'About',
    icon: <Settings className="w-5 h-5" />,
    submenu: [
      { title: 'Introduction', path: '/introduction' },
      { title: 'Vision and Mission', path: '/vision-missions' },
      { title: 'Bylaws', path: '/by-laws' },
      { title: 'Operational Guidelines', path: '/operationalguidelines' },
    ],
  },
  {
    title: 'Leadership',
    icon: <Users className="w-5 h-5" />,
    submenu: [
      { title: 'President Message', path: '/president-message' },
      { title: 'Members Board', path: '/members-board' },
      // { title: 'Special Committees', path: '' },
      { title: 'NAPA Convention', path: 'https://www.napaconvention.org/', external: true },
      { title: 'NAPA Chapters', path: '/chapters' },
    ],
  },
  {
    title: 'News',
    icon: <Phone className="w-5 h-5" />,
    path: '/news',
  },
  {
    title: 'Services',
    icon: <BookOpen className="w-5 h-5" />,
    submenu: [
      { title: 'Matrimony', path: 'https://matrimony.napausa.org/', external: true },
      { title: 'Donations', path: 'https://checkout.square.site/merchant/XQQYWZ0XCSB8B/checkout/DT7LDQF2CO5RPLHPRXHDHYIH', external: true },
    ],
  },
  {
    title: 'Media',
    icon: <BookOpen className="w-5 h-5" />,
    submenu: [
      { title: 'Gallery', path: '/gallery' },
      { title: 'Videos', path: '/video-gallery' },
    ],
  },
  {
    title: 'Projects',
    icon: <Phone className="w-5 h-5" />,
    path: '/projects',
  },
  {
    title: 'Contact',
    icon: <Phone className="w-5 h-5" />,
    path: '/contact',
  },
];

interface CustomJwtPayload {
  name: string;
  exp: number;
}

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  const getTokenFromCookies = () => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        const expiry = decodedToken?.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        // Check if the token is expired
        if (expiry && expiry < currentTime) {
          console.log('Token expired');
          // If expired, remove the token from cookies
          Cookies.remove('authToken');
          setUserToken(null);
          setUserName(null);
        } else {
          setUserToken(token);
          setUserName(decodedToken?.name || 'User');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      setUserToken(null);
      setUserName(null);
    }
  };

  // Use Effect Hook to check token when the component mounts
  useEffect(() => {
    getTokenFromCookies();
  }, []);

  const logout = () => {
    // Remove the token from cookies
    Cookies.remove('authToken');
    setUserToken(null);
    setUserName(null);
  };

  const toggleSubMenu = (title: string) => {
    setActiveSubMenu(activeSubMenu === title ? null : title);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#43529C] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Contact Info */}
          <div className="flex items-center space-x-4">
            {/* Hide Mobile Number on Mobile Screens */}
            <a
              href="tel:+1234567890"
              className="hidden md:flex items-center text-sm hover:text-blue-400"
            >
              <Phone className="w-4 h-4 mr-1" />
              <span>  +1(703)599 0008
              </span>
            </a>
            <a
              href="mailto:info@example.com"
              className="flex items-center text-sm hover:text-blue-400"
            >
              <Mail className="w-4 h-4 mr-1" />
              <span>  info@napausa.org
              </span>
            </a>
          </div>
          {/* Social Media Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-blue-400">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          {/* Login & Register */}
          <div className="flex space-x-4 border-l border-gray-600 pl-4">
            <a href='https://checkout.square.site/merchant/XQQYWZ0XCSB8B/checkout/DT7LDQF2CO5RPLHPRXHDHYIH' className="text-sm hover:text-blue-400" target="_blank" rel="noopener noreferrer">
              Donations
            </a>
            {userToken ? (
              <>
                <span className="text-sm">Welcome, {userName}</span>
                <button onClick={logout} className="text-sm hover:text-blue-400">
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-sm hover:text-blue-400">
                  Login
                </a>
                <a href="/register" className="text-sm hover:text-blue-400">
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center justify-center w-1/2 lg:w-[15%] mx-auto lg:mx-0">
              <a href="/">
                <img
                  src={mainlogo}
                  className="w-56 md:w-40 lg:w-56"
                  alt="Logo"
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center justify-center w-4/6 lg:w-[70%] space-x-6">
              {menuItems.map((item, index) => {
                // Determine if the main item is active
                const isActive = item.path && location.pathname === item.path;
                return (
                  <div key={index} className="relative">
                    <a
                      href={item.path || '#'}
                      className={`text-gray-700 hover:text-blue-600 ${isActive ? 'font-bold text-blue-600 underline underline-offset-4' : ''}`}
                      onClick={(e) => {
                        if (item.submenu) {
                          e.preventDefault();
                          toggleSubMenu(item.title);
                        }
                      }}
                    >
                      {item.title}
                      {item.submenu && (
                        <ChevronDown className="w-4 h-4 inline-block ml-1" />
                      )}
                    </a>
                    {item.submenu && activeSubMenu === item.title && (
                      <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-xl w-56 font-sans">
                        {item.submenu.map((subItem, subIndex) => {
                          // Determine if the submenu item is active
                          const isSubActive = subItem.path && location.pathname === subItem.path;
                          return subItem.external ? (
                            <a
                              key={subIndex}
                              href={subItem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${isSubActive ? 'font-bold text-blue-600 underline underline-offset-4' : ''}`}
                            >
                              {subItem.title}
                            </a>
                          ) : (
                            <a
                              key={subIndex}
                              href={subItem.path}
                              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${isSubActive ? 'font-bold text-blue-600 underline underline-offset-4' : ''}`}
                            >
                              {subItem.title}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Donate Button */}
            <div className="hidden lg:flex items-center justify-center w-1/6 lg:w-[15%]">
              <a href='/donations'>
                <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-purple-700 transition-colors">
                  Donate
                </button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              >
                <Menu className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out z-50 lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-xl font-semibold text-blue-600">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          {menuItems.map((item, index) => {
            const isActive = item.path && location.pathname === item.path;
            return (
              <div key={index}>
                <a
                  href={item.path || '#'}
                  className={`block text-gray-700 py-4 hover:bg-gray-100 ${isActive ? 'font-bold text-blue-600 underline underline-offset-4' : ''}`}
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault();
                      toggleSubMenu(item.title);
                    }
                  }}
                >
                  {item.title}
                  {item.submenu && (
                    <ChevronDown className="w-4 h-4 inline-block ml-1" />
                  )}
                </a>
                {item.submenu && activeSubMenu === item.title && (
                  <div className="ml-4">
                    {item.submenu.map((subItem, subIndex) => {
                      const isSubActive = subItem.path && location.pathname === subItem.path;
                      return subItem.external ? (
                        <a
                          key={subIndex}
                          href={subItem.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block text-gray-600 py-2 hover:bg-gray-100 ${isSubActive ? 'font-bold text-blue-600 underline underline-offset-4' : ''}`}
                        >
                          {subItem.title}
                        </a>
                      ) : (
                        <a
                          key={subIndex}
                          href={subItem.path}
                          className={`block text-gray-600 py-2 hover:bg-gray-100 ${isSubActive ? 'font-bold text-blue-600 underline underline-offset-4' : ''}`}
                        >
                          {subItem.title}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;