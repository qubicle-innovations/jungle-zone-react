/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Themeroutes from './routes/Router';
import ThemeSelector from './layouts/theme/ThemeSelector';
import Loader from './layouts/loader/Loader';
import axiosInstance from './service/ApiHelper';

const App = () => {
  const routing = useRoutes(Themeroutes);
  const direction = useSelector((state) => state.customizer.isRTL);
  const isMode = useSelector((state) => state.customizer.isDark);
  const loginData = useSelector((state) => state.login.logData);

  useEffect(() => {
    if (loginData && loginData.user) {
      const token = loginData?.user?.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        // Other headers can be added similarly
      };
      axiosInstance.defaults.headers=headers;
    }
  }, [loginData]);

  return (
    <Suspense fallback={<Loader />}>
      <div
        className={`${direction ? 'rtl' : 'ltr'} ${isMode ? 'dark' : ''}`}
        dir={direction ? 'rtl' : 'ltr'}
      >
        <ThemeSelector />
        {routing}
      </div>
    </Suspense>
  );
};

export default App;
