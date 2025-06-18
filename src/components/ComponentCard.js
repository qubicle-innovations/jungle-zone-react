import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col, Button } from 'reactstrap';
import { DispatchContext } from '../context/AppProvider';

const ComponentCard = ({ children, title, subtitle, buttontext, pagetype,setPageType, contextType }) => {
  const contextDispatch = useContext(DispatchContext);
  const handleButtonClick=()=>{
    setPageType(pagetype);
    contextDispatch({
      type: contextType,
      payload: {},
    });
  }
  return (
    <Card>
      <CardTitle tag="h4" className="border-bottom px-4 py-3 mb-0">
        <Row>
          <Col md="6">{title}</Col>
          {buttontext && pagetype !=="" &&
          <Col md="6" className="text-end">
            <Button className="btn-info" onClick={()=>handleButtonClick()}>{buttontext}</Button>
          </Col>
        }
        </Row>
      </CardTitle>
      <CardBody className="p-4">
        <CardSubtitle className="text-muted mb-3">{subtitle || ''}</CardSubtitle>
        <div>{children}</div>
      </CardBody>
    </Card>
  );
};

ComponentCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.node,
  buttontext: PropTypes.string,
  pagetype: PropTypes.string,
  setPageType:PropTypes.func,
  contextType:PropTypes.string,
};

export default ComponentCard;
