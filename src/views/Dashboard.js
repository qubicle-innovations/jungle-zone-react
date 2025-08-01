import React, { useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardCounts } from '../store/dashboard/DashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const counts = useSelector((state) => state.dashboard.dashboardCountAction);
  
  useEffect(() => {
    dispatch(dashboardCounts());
  }, [dispatch]);

  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
        <Col lg="12">
          <h3>Welcome to Jungle Zone..!</h3>
        </Col>
      </Row>
      <Row>
        <Col lg="3">
          <Card color="primary" className="text-white text-center cursor-pointer">
            <CardBody>
              <h2>{counts && counts.users}</h2>
              <h5>Users</h5>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3">
          <Card color="warning" className="text-white text-center cursor-pointer">
            <CardBody>
              <h2>{counts && counts.coupons}</h2>
              <h5>Coupons</h5>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3">
          <Card color="success" className="text-white text-center cursor-pointer">
            <CardBody>
              <h2>{counts && counts.promotions}</h2>
              <h5>Promotions</h5>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3">
          <Card color="danger" className="text-white text-center cursor-pointer">
            <CardBody>
              <h2>{counts && counts.attractions}</h2>
              <h5>Attractions</h5>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
