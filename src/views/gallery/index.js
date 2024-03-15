import React, { useState } from 'react';
import GalleryAdd from './Form';
import GalleryList from './List';
import GalleryView from './View';
import MyGalview from './GalView';

const GalleryIndex = () => {
  const [pageType, setPageType] = useState('list');

  const renderPages = () => {
    switch (pageType) {
      case 'list':
        return <GalleryList setPageType={setPageType} />;
      case 'add':
        return <GalleryAdd setPageType={setPageType} />;
      case 'edit':
        return <GalleryAdd setPageType={setPageType} />;
      case 'view':
        return <GalleryView setPageType={setPageType} />;
      case 'galview':
        return <MyGalview setPageType={setPageType} />;
      default:
        return null;
    }
  };

  return <div>{renderPages()}</div>;
};
export default GalleryIndex;
