import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/product/productSlice'; 
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Product
 from '../../components/home/Products/Product';
const Shop = () => {

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.allProducts);
  const isLoading = useSelector((state) => state.product.isLoading);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    // Dispatch the action to fetch all products when the component mounts
    dispatch(getAllProducts());
  }, [dispatch]);
  console.log('allProducts', allProducts);
  return (
    <div className=" ">
      {isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          //onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {error && <p>Error: {error}</p>}
      {allProducts && (
        // <div className="w-full h-full flex items-center justify-center">
        //   <div className="flex flex-wrap pb-20 gap-10"></div>
        // </div>
        <div className="w-full h-full flex flex-wrap items-center justify-center gap-4 m-4">
          {allProducts.map((item) => (
            <div key={item._id} className="md:w-1/3 w-full lg:w-1/4 ">
              <Product
                _id={item._id}
                img={item.imageUrl}
                productName={item.productName}
                price={item.price}
                color="red"
                badge={item.category}
                des={item.description}
                ownerId={item.ownerId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
