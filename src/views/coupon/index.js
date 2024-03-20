import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetFunction } from '../../store/coupon/CouponSlice';
import CouponAdd from './Form';
import CouponList from './List';

const CouponIndex = () => {
  const [pageType, setPageType] = useState('list');
  const dispatch = useDispatch();
  const createSuccess = useSelector((state) => state.coupon.createCouponStatus);
  const createError = useSelector((state) => state.coupon.createCouponStatusError);

  useEffect(() => {
    let msg = '';
    if (createSuccess && createSuccess.success === true) {
      msg = createSuccess.response;
    }
    if (msg !== '') {
      toast(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(resetFunction());
    }
    setPageType('list');
  }, [createSuccess, dispatch]);

  useEffect(() => {
    let msg = '';
    if (createError && createError.data && createError.data.success === false) {
      msg = createError.data.response;
    }
    if (msg !== '') {
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(resetFunction());
    }
  }, [createError, dispatch]);

  const renderPages = () => {
    switch (pageType) {
      case 'list':
        return <CouponList setPageType={setPageType} />;
      case 'add':
        return <CouponAdd setPageType={setPageType} />;
      case 'edit':
        return <CouponAdd setPageType={setPageType} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div>{renderPages()}</div>
      <ToastContainer />
    </>
  );
};
export default CouponIndex;
