import ImageGallery from 'react-image-gallery';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../../components/ComponentCard';
import 'react-image-gallery/styles/css/image-gallery.css';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const MyGallery = ({ setPageType }) => {
  return (
    <Row>
      <Col md="12">
        <ComponentCard
          title="Gallery Management"
          buttontext="Add Image"
          pagetype="add"
          setPageType={setPageType}
        >
          <ImageGallery items={images} />
        </ComponentCard>
      </Col>
    </Row>
  );
};
MyGallery.propTypes = {
  setPageType: PropTypes.func,
};
export default MyGallery;
