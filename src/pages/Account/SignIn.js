import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../redux/auth/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';

const SignIn = () => {
  const { signIn } = useAuth(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // Initial form values
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values, { setSubmitting }) => {
    // Handle sign-in logic here
    console.log('before',values);
    try {
      dispatch(loginUser(values))
      .unwrap() // This will return the actual action payload, and throw errors if any.
        .then(async(user) => {
          await signIn(values);
          console.log('sign in',user)
          // Assuming the toast library provides a 'success' method:
          //toast.success('Signin successfully!');
          Cookies.set('userId', user.user.userId, { expires: 7 });
          navigate('/');
        })
        .catch((error) => {
          toast.error(`Signin failed: ${error.message}`);

        })
        .finally(() => {
          setSubmitting(false); // This will be executed whether the promise was fulfilled or rejected.
        });
       
       console.log('Form submitted with data:', values);
       
     } catch (error) {
       // Handle error (e.g., display an error message)
       console.error('Login failed:', error);
     }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col gap-6">
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

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              Sign In
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
