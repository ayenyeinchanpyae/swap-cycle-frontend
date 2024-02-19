import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { add } from '../../redux/product/productSlice';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.user.userId);
    const isLoading = useSelector((state) => state.product.isLoading);
    const error = useSelector((state) => state.product.error);
   const validationSchema = Yup.object().shape({
    productName: Yup.string().required('Product Name is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required')
      .min(0, 'Price must be greater than or equal to 0'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    quantity: Yup.number()
      .typeError('Quantity must be a number')
      .required('Quantity is required')
      .min(0, 'Quantity must be greater than or equal to 0'),
    imageUrl: '',
  });

  // Initial form values
  const initialValues = {
    productName: '',
    price: '',
    category: '',
    description: '',
    quantity: '',
    imageUrl: '',
    ownerId: userId,
  };
  const categories = ['Electronics', 'Clothing', 'Books', 'Toys', 'Other'];
  const ImageUpload = () => {
    const [field, helpers] = useField('imageUrl');
    const { setFieldValue } = useFormikContext();

    const onDrop = (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFieldValue('imageUrl', file);
      //helpers.setValue(file); // Update the Formik field value
    };

    //console.log(`imageUrl ${imageUrl}`)
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: 'image/*', // Allow only image files
    });

    return (
      <div>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <button
            type="button"
            className="upload-button w-44 text-primeColor bg-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold"
          >
            Upload image
          </button>
          {/* <p>Drag 'n' drop an image here, or click to select an image</p> */}
        </div>
        {field.value && (
          <img
            src={URL.createObjectURL(field.value)}
            alt="Preview"
            style={{ width: '300px', height: '300px', marginTop: '10px' }}
          />
        )}
      </div>
    );
  };
    const onSubmit = async(values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('productName', values.productName);
      formData.append('price', values.price);
      formData.append('category', values.category);
      formData.append('description', values.description);
      formData.append('quantity', values.quantity);
      formData.append('ownerId', values.ownerId);
      formData.append('imageUrl', values.imageUrl);
     try { 
       await dispatch(add(formData));
       console.log('Form submitted with data:', formData);
       navigate('/my-product')
     } catch (error) {
       // Handle error (e.g., display an error message)
       console.error('Login failed:', error);
     }
      setSubmitting(false);
    };

    return (
      <div className="flex items-center justify-center max-w-full mx-auto px-4">
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          className="pb-20"
        >
          <Form className="w-[500px] h-auto py-6 flex flex-col gap-6">
            <div>
              <p className="text-base font-titleFont font-semibold px-2">Product Name</p>
              <Field
                type="text"
                id="productName"
                name="productName"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
              <ErrorMessage name="productName" component="div" className="text-red-400" />
            </div>

            <div>
              <label htmlFor="price" className="text-base font-titleFont font-semibold px-2">
                Price
              </label>
              <Field
                type="text"
                id="price"
                name="price"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
              <ErrorMessage name="price" component="div" />
            </div>

            <div>
              <label
                htmlFor="category"
                className="text-base font-titleFont font-semibold px-2 pb-2"
              >
                Category
              </label>
              <Field
                as="select"
                id="category"
                name="category"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" />
            </div>

            <div>
              <label htmlFor="description" className="text-base font-titleFont font-semibold px-2">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
              <ErrorMessage name="description" component="div" />
            </div>

            <div>
              <label htmlFor="quantity" className="text-base font-titleFont font-semibold px-2">
                Quantity
              </label>
              <Field
                type="number"
                id="quantity"
                name="quantity"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
              <ErrorMessage name="quantity" component="div" />
            </div>

            <div>
              <label htmlFor="imageUrl" className="text-base font-titleFont font-semibold px-2">
                Image
              </label>
              <Field name="imageUrl" component={ImageUpload} />

              <ErrorMessage name="imageUrl" component="div" />
            </div>

            <div className="flex gap-4 justify-end">
              <button
                type="submit"
                className="w-44 text-primeColor bg-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:text-black hover:bg-white duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    );
  
};

export default AddProduct;
