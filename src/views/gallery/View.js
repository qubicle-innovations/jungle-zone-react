import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Card, CardImg, CardBody, Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ComponentCard from '../../components/ComponentCard';
import { listGallery, deleteGallery, resetFunction } from '../../store/gallery/GallerySlice';

const GalleryView = ({ setPageType }) => {
  const dispatch = useDispatch();

  const listData = useSelector((state) => state.gallery.listGalleryStatus);
  const delteStatus = useSelector((state) => state.gallery.deleteGalleryStatus);

  const uploadurl = `${process.env.REACT_APP_UPLOAD_URL}`;

  useEffect(() => {
    dispatch(listGallery());
  }, [dispatch]);

  useEffect(() => {
    let msg = '';
    if (delteStatus) {
      if (delteStatus.success === true) {
        msg = delteStatus.response;
        toast(msg);
        dispatch(resetFunction());
        dispatch(listGallery());
      } else if (delteStatus.success === false) {
        toast.error(msg);
        dispatch(resetFunction());
      }
    }
  }, [delteStatus, dispatch]);

  const [itemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  let currentItems = [];
  if (listData && listData.response !== undefined && listData.response.gallery.length > 0) {
    currentItems = listData.response.gallery.slice(itemOffset, endOffset);
    console.log(currentItems);
  }

  const handleDeleteClick = (id) => {
    dispatch(deleteGallery(id));
  };

  return (
    <Row>
      <Col md="12">
        <ComponentCard
          title="Gallery Management"
          buttontext="Add Image"
          pagetype="add"
          setPageType={setPageType}
        >
          {currentItems ? (
            currentItems.map((cpn) => {
              return (
                <Col sm="6" lg="6" xl="3" key={cpn.id}>
                  <Card>
                    <CardImg alt="Card image cap" src={uploadurl + cpn.name} />
                    <CardBody className="p-4">
                      {/* <CardTitle tag="h4">{blg.title}</CardTitle> */}
                      <Button
                        color="primary"
                        onClick={() => {
                          // eslint-disable-next-line
                          if (window.confirm('Delete the promotion?')) {
                            handleDeleteClick(cpn.id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              );
            })
          ) : (
            <tr>
              <td colSpan={3}>No Records Found</td>
            </tr>
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

GalleryView.propTypes = {
  setPageType: PropTypes.func,
};
export default GalleryView;
