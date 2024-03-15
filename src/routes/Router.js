import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';
/****Layouts*****/

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));

/*****Routes******/
const Dashboard = Loadable(lazy(() => import('../views/Dashboard')));
const Coupon = Loadable(lazy(() => import('../views/coupon')));
const Promotion = Loadable(lazy(() => import('../views/promotion')));
const Gallery = Loadable(lazy(() => import('../views/gallery')));

const ThemeRoutes = [
  {
    element: <FullLayout />,
    children: [
      { path: '/home', name: 'Dashboard', exact: true, element: <Dashboard /> },
      { path: '/coupon', name: 'Coupon', exact: true, element: <Coupon /> },
      { path: '/promotion', name: 'Promotion', exact: true, element: <Promotion /> },
      { path: '/gallery', name: 'Gallery', exact: true, element: <Gallery /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/', element: <LoginFormik /> },
      { path: '/login', element: <LoginFormik /> },
      { path: '/logout', element: <g /> },
    ],
  },
];

export default ThemeRoutes;
