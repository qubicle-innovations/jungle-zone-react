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
    title: 'Coupon',
    href: '/coupon',
    icon: <Icon.CreditCard />,
    id: 2,
    collapisble: false,
  },
  {
    title: 'Gallery',
    href: '/gallery',
    icon: <Icon.Image />,
    id: 3,
    collapisble: false,
  },
  {
    title: 'Promotion',
    href: '/promotion',
    icon: <Icon.Volume2 />,
    id: 4,
    collapisble: false,
  },
];

export default SidebarData;
