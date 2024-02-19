import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../redux/auth/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';
import Alert from '@mui/material/Alert';

const SignUp = () => {
  const { signUp } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccessAlert, setSuccessShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessShowAlert(false);
     
    }, 5000); // Adjust the duration in milliseconds (e.g., 5000 for 5 seconds)

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phoneNumber: Yup.number().required('Phone Number is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
  });

  // Initial form values
  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    city: ''
  };

  const onSubmit = async(values, { setSubmitting }) => {
    // Handle sign-up logic here
    console.log('before', values);
    try {
       await signUp(values)
        console.log('sign up');
        setTimeout(() => {
          navigate('/');
        }, 3000); 
        setSuccessShowAlert(true);  
          
      // dispatch(signUp(values))
      //   .unwrap() // This will return the actual action payload, and throw errors if any.
      //   .then(async (user) => {
         
      //   })
      //   .catch((error) => {
      //     setShowErrorAlert(true);
      //   })
      //   .finally(() => {
      //     setSubmitting(false); // This will be executed whether the promise was fulfilled or rejected.
      //   });

      console.log('Form submitted with data:', values);
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('Signup failed:', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
      {showSuccessAlert && <Alert severity="info">Sign up successfully</Alert>}
      {showErrorAlert && <Alert severity="error">Sign up failed</Alert>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col gap-6">
          <div>
            <label htmlFor="fullName" className="text-base font-titleFont font-semibold px-2">
              Full Name
            </label>
            <Field
              type="text"
              id="fullName"
              name="fullName"
              className="w-full py-1 border-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
            />
            <ErrorMessage name="fullName" component="div" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="email" className="text-base font-titleFont font-semibold px-2">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full py-1 border-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          <div>
            <label htmlFor="password" className="text-base font-titleFont font-semibold px-2">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full py-1 border-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="text-base font-titleFont font-semibold px-2">
              Phone Number
            </label>
            <Field
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full py-1 border-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
            />
            <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="address" className="text-base font-titleFont font-semibold px-2">
              Address
            </label>
            <Field
              type="text"
              id="address"
              name="address"
              className="w-full py-1 border-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
            />
            <ErrorMessage name="address" component="div" className="text-red-500" />
          </div>

          <div>
            <label htmlFor="city" className="text-base font-titleFont font-semibold px-2">
              City
            </label>
            <Field
              type="text"
              id="city"
              name="city"
              className="w-full py-1 border-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
            />
            <ErrorMessage name="city" component="div" className="text-red-500" />
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              Sign Up
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
