import React from 'react';

import { Row, Col, FormGroup, Label, Input, Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../../components/ComponentCard';

const GalleryForm = ({ setPageType }) => {
  return (
    <Row>
      <Col md="12">
        <ComponentCard
          title="Gallery Management"
          buttontext="Back"
          pagetype="list"
          setPageType={setPageType}
        >
          <FormGroup>
            <Row>
              <Label sm="2">Title</Label>
              <Col sm="10">
                <Input type="text" placeholder="Title" name="title" />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Images/Videos</Label>
              <Col sm="10">
                <Input type="file" placeholder="" accept="*" />
              </Col>
            </Row>
          </FormGroup>
        </ComponentCard>
        <Card>
          <CardBody className="border-top gap-2 d-flex align-items-center">
            <Button type="submit" className="btn btn-success">
              Save
            </Button>
            <Button type="button" className="btn btn-dark ml-2">
              Cancel
            </Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

GalleryForm.propTypes = {
  setPageType: PropTypes.func,
};

export default GalleryForm;
