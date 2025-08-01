import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import LogoWhiteText from '../../assets/images/logos/logo.png';

const Logo = () => {
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  return (
    <Link to="/home" className="d-flex align-items-center gap-2">

        <>
          {toggleMiniSidebar ? '' : <img src={LogoWhiteText} className="d-none d-lg-block" width="100%" alt='logo-text' />}
        </>
    </Link>
  );
};

export default Logo;
