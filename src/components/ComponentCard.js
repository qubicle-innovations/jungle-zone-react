import { Card, CardBody, CardTitle, CardSubtitle, Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ComponentCard = ({ children, title, subtitle, buttontext, pagetype,setPageType }) => {
  return (
    <Card>
      <CardTitle tag="h4" className="border-bottom px-4 py-3 mb-0">
        <Row>
          <Col md="6">{title}</Col>
          <Col md="6" className="text-end">
            <Button className="btn-info" onClick={()=>setPageType(pagetype)}>{buttontext}</Button>
          </Col>
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
};

export default ComponentCard;
