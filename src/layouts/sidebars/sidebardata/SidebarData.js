import * as Icon from 'react-feather';

const SidebarData = [
  {
    title: 'Dashboard',
    href: '/home',
    icon: <Icon.Home />,
    id: 1,
    collapisble: false,
  },
  {
    title: 'Sub Admins',
    href: '/subadmin',
    icon: <Icon.Users />,
    id: 2,
    collapisble: false,
  },
  {
    title: 'Coupon',
    href: '/coupon',
    icon: <Icon.CreditCard />,
    id: 3,
    collapisble: false,
  },
  {
    title: 'Gallery',
    href: '/gallery',
    icon: <Icon.Image />,
    id: 4,
    collapisble: false,
  },
  {
    title: 'Promotion',
    href: '/promotion',
    icon: <Icon.Volume2 />,
    id: 5,
    collapisble: false,
  },
  {
    title: 'Attractions',
    href: '#',
    id: 6,
    icon: <Icon.Grid />,
    collapisble: true,
    children: [
      {
        title: 'Catergories',
        href: '/attraction/category',
        icon: <Icon.Disc />,
        id: 6.1,
        collapisble: false,
      },
      {
        title: 'Sub-catergories',
        href: '/attraction/subcategory',
        icon: <Icon.Disc />,
        id: 6.2,
        collapisble: false,
      },
      {
        title: 'Details',
        href: '/attraction',
        icon: <Icon.Disc />,
        id: 6.3,
        collapisble: false,
      },
    ],
  },
  {
    title: 'Working Hours',
    href: '/workhours',
    icon: <Icon.Clock />,
    id: 7,
    collapisble: false,
  },
];

export default SidebarData;
