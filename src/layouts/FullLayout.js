import { Outlet, useLocation, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import Header from './header/Header';
import Sidebar from './sidebars/vertical/Sidebar';
import HorizontalHeader from './header/HorizontalHeader';
import HorizontalSidebar from './sidebars/horizontal/HorizontalSidebar';

const FullLayout = () => {
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const showMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const LayoutHorizontal = useSelector((state) => state.customizer.isLayoutHorizontal);
  const isFixedSidebar = useSelector((state) => state.customizer.isSidebarFixed);

  const location = useLocation();
  const firstUrl = location.pathname.split('/')[1];
  const secondUrl = location.pathname.split('/')[2];

  let token = false;
  token = localStorage.getItem('token');
  
  const auth = { token };

  return (
     auth.token ? (
    <main>
      <div
        className={`pageWrapper d-md-block d-lg-flex ${toggleMiniSidebar ? 'isMiniSidebar' : ''}`}
      >
        {/******** Sidebar **********/}
        {LayoutHorizontal ? (
          ''
        ) : (
          <aside className={`sidebarArea ${showMobileSidebar ? 'showSidebar' : ''}`}>
            <Sidebar />
          </aside>
        )}
        {/********Content Area**********/}

        <div className={`contentArea ${topbarFixed ? 'fixedTopbar' : ''}`}>
          {/********header**********/}
          {LayoutHorizontal ? <HorizontalHeader /> : <Header />}
          {LayoutHorizontal ? <HorizontalSidebar /> : ''}
          {/********Middle Content**********/}
          <div className={isFixedSidebar && LayoutHorizontal ? 'HsidebarFixed' : ''}>
            <div className="bg-white p-3 text-capitalize">
              <Container fluid className="boxContainer">
                <Row>
                  <Col md="6">
                    <Breadcrumb>
                      <BreadcrumbItem to="/" tag={Link} className="text-decoration-none">
                        Home
                      </BreadcrumbItem>
                      {firstUrl ? <BreadcrumbItem active>{firstUrl}</BreadcrumbItem> : ''}
                      {secondUrl ? <BreadcrumbItem active>{secondUrl}</BreadcrumbItem> : ''}
                    </Breadcrumb>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>

          <Container fluid className="p-4 boxContainer">
            <div>
              <Outlet />
            </div>
            {showMobileSidebar ? <div className="sidebarOverlay" /> : ''}
          </Container>
        </div>
      </div>
    </main>
    ): (
      <Navigate to="/" />
    )
  );
};

export default FullLayout;
