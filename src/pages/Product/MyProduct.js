import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByUser, deleteProduct } from '../../redux/product/productSlice'; 
import  moment  from 'moment';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
const MyProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector((state) => state.product.productsByUser);
    const currentUserId = useSelector((state) => state.auth.user.userId);
    const isLoading = useSelector((state) => state.product.isLoading);
    const error = useSelector((state) => state.product.error);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [productId, setProductId]  = useState(null);
    console.log('current user id', currentUserId);
     const openModal = () => {
       
       setModalIsOpen(true);
       
     };

     const closeModal = () => {
       setModalIsOpen(false);
     };

     const handleDelete = async () => {
        console.log('item id to be deleted',productId)
        try {
        await dispatch(deleteProduct(productId));
        setModalIsOpen(false)
        dispatch(getProductsByUser(currentUserId));
          
        } catch (error) {
          // Handle error (e.g., display an error message)
          console.error('Login failed:', error);
        }
     }

     const handleEditClick = (product) => {
       navigate(`/edit-product/${product._id}`, { state: { product } });
     };

    useEffect(() => {
      // Dispatch the action to fetch all products when the component mounts
      dispatch(getProductsByUser(currentUserId));
    }, []);
    console.log('getProductsByUser',currentUserId, allProducts);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className=" w-full h-screen bg-white p-4  rounded-lg mx-auto">
        <div className="flex flex-col">
          <h2 className="text-center text-2xl mb-2">My Products</h2>
          <div className="flex justify-end">
            {' '}
            <button
              onClick={() => navigate('/add-product')}
              className=" w-40 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className=" px-4 py-2">Name</th>
                <th className=" px-4 py-2">Image</th>
                <th className=" px-4 py-2">Price</th>
                <th className=" px-4 py-2">Date Added</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allProducts &&
                allProducts?.map((product, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{product.productName}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={product.imageUrl}
                        className="w-[100px] h-[100px]"
                        alt="my-product-img"
                      />
                    </td>
                    <td className="border px-4 py-2">{product.price}</td>
                    <td className="border px-4 py-2">
                      {moment(product.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEditClick(product)}>
                          <MdModeEdit size={30} />
                        </button>
                        <button
                          onClick={() => {
                            setProductId(product._id);
                            openModal();
                          }}
                        >
                          <MdDelete size={30} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={{
              content: {
                width: '30%', // Adjust the width as needed
                height: '25%',
                margin: 'auto', // Center the modal horizontally
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
              },
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <h2 className="py-4">Are you sure you want to delete this product?</h2>
              <div className="flex justify-end gap-16">
                <button onClick={closeModal} className="ml-auto">
                  Cancel
                </button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default MyProduct