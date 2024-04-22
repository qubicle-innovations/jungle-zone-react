import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetFunction } from '../../store/category/CategorySlice';
import CategoryAdd from './Form';
import CategoryList from './List';

const CategoryIndex = () => {
  const [pageType, setPageType] = useState('list');
  const dispatch = useDispatch();
  const createStatus = useSelector((state) => state.category.createCategoryStatus);
  const updateStatus = useSelector((state) => state.category.updateCategoryStatus);

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
        return <CategoryList setPageType={setPageType} />;
      case 'add':
        return <CategoryAdd setPageType={setPageType} />;
      case 'edit':
        return <CategoryAdd setPageType={setPageType} />;
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
export default CategoryIndex;
