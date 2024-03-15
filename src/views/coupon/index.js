import React, { useState } from 'react';
import CouponAdd from './Form';
import CouponList from './List';

const CouponIndex = () => {
  const [pageType, setPageType] = useState('list');

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

  return <div>{renderPages()}</div>;
};
export default CouponIndex;
