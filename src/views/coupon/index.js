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
  const updateStatus = useSelector((state) => state.coupon.updateCouponStatus);

  useEffect(() => {
    let msg = '';
    let chnge = 0;
    if (createStatus) {
      if (createStatus.success === true) {
        msg = createStatus.response;
        chnge = 1;
      } else if (createStatus.success === false) {
        chnge = 2;
      }
    }
    if (updateStatus) {
      if (updateStatus.success === true) {
        msg = updateStatus.response;
        chnge = 1;
      } else if (updateStatus.success === false) {
        chnge = 2;
      }
    }

    if (chnge === 1) {
      toast(msg);
      dispatch(resetFunction());
      setPageType('list');
    } else if (chnge === 2) {
      toast.error(msg);
    }
  }, [createStatus, updateStatus, dispatch]);

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
