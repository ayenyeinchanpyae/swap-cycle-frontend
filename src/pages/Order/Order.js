import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByUser, deleteProduct } from '../../redux/product/productSlice';
import { getByBuyer, getBySeller } from '../../redux/order/orderSlice';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buyerOrder = useSelector((state) => state.order.buyerOrder);
  const sellerOrder = useSelector((state) => state.order.sellerOrder);

  const currentUserId = useSelector((state) => state.auth.user.userId);
  const isLoading = useSelector((state) => state.product.isLoading);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    // Dispatch the action to fetch all products when the component mounts
    dispatch(getByBuyer('65649512ba7aa74545acec85'));
    dispatch(getBySeller('65649512ba7aa74545acec85'));
  }, []);
  console.log('buyer', currentUserId, buyerOrder);
  return (
    <div className="overflow-y-auto">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className=" w-full bg-white p-4  rounded-lg mx-auto">
        <div className="flex flex-col">
          <h2 className="text-center text-2xl mb-2">My Purchases</h2>
        </div>
        <div>
          {buyerOrder?.length > 0 ? (
            <table className="table-fixed w-full p-4">
              <thead>
                <tr>
                  <th className=" px-4 py-2">Name</th>
                  <th className=" px-4 py-2">Image</th>
                  <th className=" px-4 py-2">Price</th>
                  <th className=" px-4 py-2">Seller</th>
                  <th className=" px-4 py-2">Date Purchased</th>
                  <th className=" px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {buyerOrder &&
                  buyerOrder?.map((order, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{order.productId.productName}</td>
                      <td className="border px-4 py-2">
                        {/* <img
                        src={product.imageUrl}
                        className="w-[100px] h-[100px]"
                        alt="my-product-img"
                      /> */}
                      </td>
                      <td className="border px-4 py-2">{order.price}</td>
                      <td className="border px-4 py-2">{order.ownerId.fullName}</td>
                      <td className="border px-4 py-2">
                        {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                      </td>
                      <td className="border px-4 py-2">Shipping</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-bold text-xl">You haven't purchased anything</p>
          )}
        </div>
      </div>
      <div className=" w-full  bg-white p-4  rounded-lg mx-auto">
        <div className="flex flex-col">
          <h2 className="text-center text-2xl mb-2">My Products' Order</h2>
        </div>
        <div>
          {sellerOrder?.length > 0 ? (
            <table className="table-fixed w-full p-4">
              <thead>
                <tr>
                  <th className=" px-4 py-2">Name</th>
                  <th className=" px-4 py-2">Image</th>
                  <th className=" px-4 py-2">Price</th>
                  <th className=" px-4 py-2">Seller</th>
                  <th className=" px-4 py-2">Date Purchased</th>
                  <th className=" px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {sellerOrder &&
                  sellerOrder?.map((order, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{order.productId.productName}</td>
                      <td className="border px-4 py-2">
                        {/* <img
                        src={product.imageUrl}
                        className="w-[100px] h-[100px]"
                        alt="my-product-img"
                      /> */}
                      </td>
                      <td className="border px-4 py-2">{order.price}</td>
                      <td className="border px-4 py-2">{order.buyerId.fullName}</td>
                      <td className="border px-4 py-2">
                        {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                      </td>
                      <td className="border px-4 py-2">status</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-bold text-center text-xl">You don't have any order at the moment</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
