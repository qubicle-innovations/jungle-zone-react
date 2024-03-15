import React, { useState } from 'react';
import PromotionAdd from './Form';
import PromotionList from './List';

const PromotionIndex = () => {
  const [pageType, setPageType] = useState('list');

  const renderPages = () => {
    switch (pageType) {
      case 'list':
        return <PromotionList setPageType={setPageType} />;
      case 'add':
        return <PromotionAdd setPageType={setPageType} />;
      case 'edit':
        return <PromotionAdd setPageType={setPageType} />;
      default:
        return null;
    }
  };

  return <div>{renderPages()}</div>;
};
export default PromotionIndex;
