import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { addToCart } from "../../../redux/product/cartSlice";
import Cookies from 'js-cookie';
import Alert from '@mui/material/Alert';
const ProductInfo = ({ productInfo }) => {
  console.log('productInfo', productInfo);
  const currentUserId = Cookies.get('userId');
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000); // Adjust the duration in milliseconds (e.g., 5000 for 5 seconds)

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);
  const handleAddToCart = () => {
    dispatch(addToCart(productInfo));
    if(currentUserId === null || 'null'){
      console.log('sign in')
      setShowAlert(true);
    } else {
       console.log('handleAddToCart', currentUserId, productInfo);
       dispatch(addToCart(productInfo));
    }
    //
  };
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> {productInfo.badge}
      </p>
      {currentUserId === productInfo.ownerId ? (
        ''
      ) : (
        <>
          {/* {showAlert && <Alert severity="error">Please sign in first</Alert>} */}

          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
          >
            Add to Cart
          </button>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default ProductInfo;
