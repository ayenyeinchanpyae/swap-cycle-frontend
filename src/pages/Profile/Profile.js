import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/auth/authSlice';

const Profile = ({ user, products }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.user);
    const [editMode, setEditMode] = useState(false);
    // Dummy data for profile information
  const initialValues = {
    fullName: userData.fullName,
    email: userData.email,
    address: userData.address,
    city: userData.city,
    phoneNumber: userData.phoneNumber,
  };

  console.log('initial value', initialValues)

  // Handler to toggle edit mode
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const onSubmit = (values, { setSubmitting }) => {
    // Handle sign-in logic here
    console.log('before',userData.userId, values);
    values.userId = '6564a3a3763f38b268497907';
    try {
      dispatch(updateUser(values));
      setEditMode(false)
      //console.log('Form submitted with data:', values);
     // navigate('/');
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('Login failed:', error);
    }
    setSubmitting(false);
  };
  console.log('edit',editMode)
  return (
    <>
      <div className="flex px-10 bg-gray-200 items-center justify-center">
        
      </div>
      <div className="flex p-10 bg-gray-200 items-center justify-center">
        <div className="w-1/2 bg-white p-4 rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-2xl mb-2">Profile Info</h2>
            {editMode ? '' : <button onClick={handleEditClick}>Edit</button>}
          </div>
          {editMode ? (
            <div>
              <Formik
                initialValues={initialValues}
                //   validationSchema={validationSchema}
                onSubmit={onSubmit}
                className="pb-20"
              >
                <Form className="h-auto py-6 flex flex-col gap-6">
                  <div>
                    <p className="text-base font-titleFont font-semibold px-2">Full Name</p>
                    <Field
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                    />
                    <ErrorMessage name="fullName" component="div" className="text-red-400" />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-base font-titleFont font-semibold px-2">
                      Email
                    </label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      readOnly
                      className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="text-base font-titleFont font-semibold px-2"
                    >
                      Phone Number
                    </label>
                    <Field
                      type="number"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                    />
                    <ErrorMessage name="phoneNumber" component="div" />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="text-base font-titleFont font-semibold px-2"
                    >
                      Address
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                    />
                    <ErrorMessage name="address" component="div" />
                  </div>

                  <div>
                    <label htmlFor="city" className="text-base font-titleFont font-semibold px-2">
                      City
                    </label>
                    <Field
                      type="text"
                      id="city"
                      name="city"
                      className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                    />
                    <ErrorMessage name="city" component="div" />
                  </div>

                  <div className="flex gap-4 justify-end">
                    <button
                      type="submit"
                      onClick={handleEditClick}
                      className="w-44 text-primeColor bg-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:text-black hover:bg-white duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
                    >
                      Update
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          ) : (
            <div className="flex">
              <div className="flex flex-col space-y-2">
                <p className="text-base font-titleFont font-semibold px-2">Full Name</p>
                <p className="text-base font-titleFont font-semibold px-2">Email</p>
                <p className="text-base font-titleFont font-semibold px-2">Phone Number</p>
                <p className="text-base font-titleFont font-semibold px-2">Address</p>
                <p className="text-base font-titleFont font-semibold px-2">City</p>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-base font-titleFont font-semibold px-2">{userData.fullName}</p>
                <p className="text-base font-titleFont font-semibold px-2">{userData.email}</p>
                <p className="text-base font-titleFont font-semibold px-2">
                  {userData.phoneNumber}
                </p>
                <p className="text-base font-titleFont font-semibold px-2">{userData.address}</p>
                <p className="text-base font-titleFont font-semibold px-2">{userData.city}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Profile;



