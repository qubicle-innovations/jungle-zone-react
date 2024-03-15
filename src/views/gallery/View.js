import { Card, CardImg, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import bg1 from '../../assets/images/bg/bg1.jpg';
import ComponentCard from '../../components/ComponentCard';

const BlogData = [
  {
    image: bg1,
    title: 'This is simple blog',
    subtitle: '2 comments, 1 Like',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    btnbg: 'primary',
  },
];

const GalleryView = ({ setPageType }) => {
  return (
    <Row>
      <Col md="12">
        <ComponentCard
          title="Gallery Management"
          buttontext="Back"
          pagetype="list"
          setPageType={setPageType}
        >
          {BlogData.map((blg) => (
            <Col sm="6" lg="6" xl="3" key={blg.image}>
              <Card>
                <CardImg alt="Card image cap" src={blg.image} />
                <CardBody className="p-4">
                  <CardTitle tag="h4">{blg.title}</CardTitle>
                  <Button color={blg.btnbg} onClick={()=>setPageType('galview')}>View</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </ComponentCard>
      </Col>
    </Row>
  );
};
GalleryView.propTypes = {
    setPageType: PropTypes.func,
  };
export default GalleryView;
