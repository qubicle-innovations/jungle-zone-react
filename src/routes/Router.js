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
const Subadmin = Loadable(lazy(() => import('../views/subadmin')));
const Category = Loadable(lazy(() => import('../views/category')));
const Subcategory = Loadable(lazy(() => import('../views/subcategory')));
const Attraction = Loadable(lazy(() => import('../views/attraction')));
const SettingsForm = Loadable(lazy(() => import('../views/settings')));
const WorkHoursForm = Loadable(lazy(() => import('../views/workinghours')));

const ThemeRoutes = [
  {
    element: <FullLayout />,
    children: [
      { path: '/home', name: 'Dashboard', exact: true, element: <Dashboard /> },
      { path: '/coupon', name: 'Coupon', exact: true, element: <Coupon /> },
      { path: '/promotion', name: 'Promotion', exact: true, element: <Promotion /> },
      { path: '/gallery', name: 'Gallery', exact: true, element: <Gallery /> },
      { path: '/subadmin', name: 'Subadmin', exact: true, element: <Subadmin /> },
      { path: '/attraction/category', name: 'Category', exact: true, element: <Category /> },
      { path: '/attraction/subcategory', name: 'Subcategory', exact: true, element: <Subcategory /> },
      { path: '/attraction', name: 'Attraction', exact: true, element: <Attraction /> },
      { path: '/settings', name: 'Settings', exact: true, element: <SettingsForm /> },
      { path: '/workhours', name: 'WorkHours', exact: true, element: <WorkHoursForm /> },
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
