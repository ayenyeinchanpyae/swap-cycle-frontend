import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { HiMenuAlt2 } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { logo, logoLight } from '../../../assets/images';
import Image from '../../designLayouts/Image';
import { navBarList, navBarListUser } from '../../../constants';
import Flex from '../../designLayouts/Flex';
import { BsCart } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { logoutUser } from '../../../redux/auth/authSlice';
import Cookies from 'js-cookie';
import { current } from '@reduxjs/toolkit';


const Header = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const location = useLocation();
  const [currentUserId, setCurrentUserId] = useState( Cookies.get('userId'))
  const [navLink, setNavLink] = useState(user === null ? navBarList : navBarListUser);
  const [cartTotal, setCartTotal] = useState(null);
  const cartItems = useSelector(state => state.cart.items);
  console.log('auth in header', currentUserId);

  useEffect(() => {
    
    setCurrentUserId(Cookies.get('userId'));
    //setNavLink(currentUserId === null || 'null' ? navBarList : navBarListUser);
    setCartTotal(cartItems?.length);
    console.log('use effect in header',currentUserId);
  }, [currentUserId, cartItems]);
  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener('resize', ResponsiveMenu);
  }, []);

  const onLogout = () => {
    console.log('logout clicked');
    dispatch(logoutUser())
      .unwrap() // This will return the actual action payload, and throw errors if any.
      .then(() => {
        console.log('logout');

        // Assuming the toast library provides a 'success' method:
        Cookies.set('userId', null, { expires: 7 });
        setTimeout(() => {
           setCurrentUserId(Cookies.get('userId'));
           console.log('after logout', currentUserId);
        }, 3000); 
       
        //navigate('/');
      })
      .catch((error) => {})
      .finally(() => {});
  };

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              <Image className="w-20 object-cover" imgSrc={logo} />
            </div>
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
                  <NavLink
                    className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                    to="/shop"
                    state={{ data: location.pathname.split('/')[1] }}
                  >
                    <li>Shop</li>
                  </NavLink>
                  {/* <NavLink
                    className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                    to="/signin"
                    state={{ data: location.pathname.split('/')[1] }}
                  >
                    <li>SignIn</li>
                  </NavLink> */}
                  {currentUserId !== null || 'null' || undefined || 'undefined' ? (
                    <>
                      <div className="flex items-center px-4">
                        <button className="border-r-gray-300 " onClick={() => navigate('/cart')}>
                          <BsCart size={30} />
                        </button>
                        <span>{cartTotal}</span>
                      </div>
                      <div className="dropdown dropdown-end bg-white">
                        <div tabIndex={0} role="button" className="btn m-1 bg-white">
                          Account
                        </div>
                        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li>
                            <Link to="/profile">Profile</Link>
                          </li>
                          <li>
                            <Link to="/my-product">My Products</Link>
                          </li>
                          <li>
                            <Link to="/order">Order</Link>
                          </li>
                          <li>
                            <button onClick={onLogout}>Logout</button>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <NavLink
                        className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                        to="/signin"
                        state={{ data: location.pathname.split('/')[1] }}
                      >
                        <li>SignIn</li>
                      </NavLink>
                    </>
                  )}
                </>
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
                    <img className="w-28 mb-6 pb-4" src={logoLight} alt="logoLight" />

                    <NavLink
                      className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 pb-4 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                      to="/shop"
                      state={{ data: location.pathname.split('/')[1] }}
                    >
                      Shop
                    </NavLink>

                    {currentUserId !== null || 'null' || undefined || 'undefined' ? (
                      <div className="space-y-4">
                        <NavLink
                          className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          to="/cart"
                          state={{ data: location.pathname.split('/')[1] }}
                        >
                          Cart
                        </NavLink>
                        <NavLink
                          className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          to="/my-product"
                          state={{ data: location.pathname.split('/')[1] }}
                        >
                          Profucts
                        </NavLink>
                        <NavLink
                          className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          to="/profile"
                          state={{ data: location.pathname.split('/')[1] }}
                        >
                          Profile
                        </NavLink>
                        <NavLink
                          className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          to="/order"
                          state={{ data: location.pathname.split('/')[1] }}
                        >
                          Order
                        </NavLink>

                        <button
                          className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          onClick={onLogout}
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <NavLink
                        className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                        to="/signin"
                        state={{ data: location.pathname.split('/')[1] }}
                      >
                        SignIn
                      </NavLink>
                    )}
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
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
