import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';
//import SidebarData from '../sidebars/sidebardata/SidebarData';

const BreadCrumbs = () => {
  const location = useLocation();
  const firstUrl = location.pathname.split('/')[1];
  const secondUrl = location.pathname.split('/')[2];
  return (
    <>
      <h4 className="text-capitalize">{secondUrl ? `${secondUrl}` : `${firstUrl}`}</h4>
      <Breadcrumb>
        <BreadcrumbItem to="/home" tag={Link} className="text-decoration-none">
          Home
        </BreadcrumbItem>
        {firstUrl ? <BreadcrumbItem active>{firstUrl}</BreadcrumbItem> : ''}
        {secondUrl ? <BreadcrumbItem active>{secondUrl}</BreadcrumbItem> : ''}
      </Breadcrumb>
    </>
  );
};

export default BreadCrumbs;
