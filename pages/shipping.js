import Select from 'react-select';
import { useForm } from 'react-hook-form';

import CheckoutWizard from '../components/CheckoutWizard';

import Layout from '../components/Layout';
import { useContext, useEffect } from 'react';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';

export default function ShippingScreen() {
  const options = [
    { value: 'Cairo', label: 'Cairo' },
    { value: 'Alexandria', label: 'Alexandria' },
    { value: 'Dakahlia', label: 'Dakahlia' },
    { value: 'Gharbia', label: 'Gharbia' },
  ];

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('phoneNumber', shippingAddress.phoneNumber);
    setValue('address', shippingAddress.address);
    setValue('area', shippingAddress.area);
    setValue('governorate', shippingAddress.governorate);
  }, [setValue, shippingAddress]);
  const submitHandler = ({
    fullName,
    address,
    phoneNumber,
    area,
    governorate,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, area, governorate },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          phoneNumber,
          area,
          governorate,
        },
      })
    );
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            className="w-full"
            id="phoneNumber"
            autoFocus
            {...register('phoneNumber', {
              required: 'Please enter phone number',
              minLength: { value: 10, message: 'Number is incomplete' },
            })}
          />
          {errors.phoneNumber && (
            <div className="text-red-500">{errors.phoneNumber.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="w-full"
            id="address"
            autoFocus
            {...register('address', {
              required: 'Please enter address',
              minLength: { value: 3, message: 'Adress must be complete' },
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.address.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="area">Area</label>
          <input
            className="w-full"
            id="area"
            autoFocus
            {...register('area', {
              required: 'Please enter area',
            })}
          />
          {errors.area && (
            <div className="text-red-500">{errors.area.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="governorate">Governorate</label>

          <Select options={options} />
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
