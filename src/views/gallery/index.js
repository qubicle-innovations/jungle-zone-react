import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetFunction } from '../../store/gallery/GallerySlice';
import GalleryAdd from './Form';
// import GalleryList from './List';
import GalleryView from './View';
import MyGalview from './GalView';

const GalleryIndex = () => {
  const [pageType, setPageType] = useState('list');
  const dispatch = useDispatch();
  const createStatus = useSelector((state) => state.gallery.creategalleryStatus);
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
    if (chnge === 1) {
      toast(msg);
      dispatch(resetFunction());
      setPageType('list');
    } else if (chnge === 2) {
      toast.error(msg);
    }
  }, [createStatus, dispatch]);

  const renderPages = () => {
    switch (pageType) {
      // case 'list':
      //   return <GalleryList setPageType={setPageType} />;
      case 'add':
        return <GalleryAdd setPageType={setPageType} />;
      case 'list':
        return <GalleryView setPageType={setPageType} />;
      case 'view':
        return <MyGalview setPageType={setPageType} />;
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
export default GalleryIndex;
