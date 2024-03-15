import React from 'react';
import LogoWhiteText from '../../assets/images/logos/logo.png';

const AuthLogo = () => {

  return (
    <div className="p-4 d-flex justify-content-center gap-2">
        <>
          <img src={LogoWhiteText} className="d-none d-lg-block" alt='logo-text' />
        </>
    </div>
  );
};

export default AuthLogo;
