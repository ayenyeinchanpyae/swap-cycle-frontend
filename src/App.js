import React, { createContext, useContext } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import Footer from './components/home/Footer/Footer';
import FooterBottom from './components/home/Footer/FooterBottom';
import Header from './components/home/Header/Header';
import About from './pages/About/About';
import SignIn from './pages/Account/SignIn';
import SignUp from './pages/Account/SignUp';
import Cart from './pages/Cart/Cart';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Shop from './pages/Shop/Shop';
import AddProduct from './pages/Product/AddProduct';
import Profile from './pages/Profile/Profile';
import MyProduct from './pages/Product/MyProduct';
import EditProduct from './pages/Product/EditProduct';
import Order from './pages/Order/Order';
import Checkout from './pages/Checkout/Checkout';
import { AuthProvider
 } from './AuthContext';
import { useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';


const Layout = () => {
  const { user } = useAuth();
  return (
    <div>
      <Header user={user} />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};


function App() {
  const currentUserId = Cookies.get('userId');
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/product/:_id" element={<ProductDetails />}></Route>

          <Route element={<ProtectedRoute currentUserId={currentUserId} />}>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/order" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-product" element={<MyProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Route>,
    ),
  );
  return (
    <AuthProvider>
      <div className="font-bodyFont">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
