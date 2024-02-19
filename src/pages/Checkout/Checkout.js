import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { add } from '../../redux/order/orderSlice';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { emptyCart } from '../../redux/product/cartSlice';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart
  .items);
  const currentUserId = Cookies.get('userId');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    productId: '',
    buyerId: '',
    quantity: 0,
    price: 0,
    ownerId: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate each field
    if (formData.firstName.trim() === '') {
      newErrors.firstName = 'First name is required.';
    }
    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'Last name is required.';
    }
    if (formData.address1.trim() === '') {
      newErrors.address1 = 'Address line 1 is required.';
    }

    if (formData.city.trim() === '') {
      newErrors.city = 'City is required.';
    }

    if (formData.state.trim() === '') {
      newErrors.state = 'State is required.';
    }

    if (formData.country.trim() === '') {
      newErrors.country = 'Country is required.';
    }

    if (formData.zipCode.trim() === '') {
      newErrors.zipCode = 'Zip Code is required.';
    }

    return newErrors;
  };

  const handleCheckoutClick = (event) => {
    event.preventDefault();
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
       dispatch(emptyCart);
      // Form is valid, perform checkout logic
      // products.forEach((product, index) => {
      // console.log('Perform checkout', product.ownerId, product._id, currentUserId);
       
      //   setTimeout(() => {
      //     setFormData((prevFormData) => ({
      //       ...prevFormData,
      //       productId: product._id,
      //       quantity: product.quantity,
      //       price: product.price,
      //       buyerId: currentUserId,
      //       ownerId: product.ownerId
      //     }));
      //     console.log('Checkout Data:', formData);
      //     dispatch(add(formData))
        
      //         console.log('success')
      //         // Assuming the toast library provides a 'success' method:
      //         //toast.success('Order placed successfully!');
              
      //         navigate('/cart');
        
          
      //   }, index * 100); // Adjust the timeout delay if needed
        
      //});  
    } else {
      // Form is invalid, update error state
      setErrors(validationErrors);
      console.log('Validation errors:', validationErrors);
    }
          
    
  };

  return (
    <div>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <form noValidate>
            {' '}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  onChange={handleInputChange}
                  value={formData.firstName}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  onChange={handleInputChange}
                  value={formData.lastName}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={handleInputChange}
                  value={formData.address1}
                  error={Boolean(errors.address1)}
                  helperText={errors.address1}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  onChange={handleInputChange}
                  value={formData.address2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  onChange={handleInputChange}
                  value={formData.city}
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  variant="standard"
                  onChange={handleInputChange}
                  value={formData.state}
                  error={Boolean(errors.state)}
                  helperText={errors.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zipCode"
                  name="zipCode"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                  onChange={handleInputChange}
                  value={formData.zipCode}
                  error={Boolean(errors.zipCode)}
                  helperText={errors.zipCode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
                  onChange={handleInputChange}
                  value={formData.country}
                  error={Boolean(errors.country)}
                  helperText={errors.country}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button variant="contained" onClick={handleCheckoutClick} sx={{ mt: 3, ml: 1 }}>
                  Checkout
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
