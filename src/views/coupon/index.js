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
  const createStatus = useSelector((state) => state.coupon.createCouponStatus);
  useEffect(() => {
    let msg = '';
    if (createStatus) {
      if (createStatus.success === true) {
        msg = createStatus.response;
        toast(msg);
        dispatch(resetFunction());
        setPageType('list');
      } else if (createStatus.success === false) {
        toast.error(msg);
      }
    }
  }, [createStatus, dispatch]);

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
