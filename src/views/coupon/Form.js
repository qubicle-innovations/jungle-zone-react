import React from 'react';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Row, Col, FormGroup, Label, Input, Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../../components/ComponentCard';

const CouponForm = ({ setPageType }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      image: null,
      start_date: '',
      end_date: '',
      total_no: '',
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });
  const submitForm = async (data) => {
    console.log(data);
  };

  return (
    <Row>
      <Col md="12">
        <form onSubmit={handleSubmit(submitForm)}>
          <ComponentCard
            title="Coupon Management"
            buttontext="Back"
            pagetype="list"
            setPageType={setPageType}
          >
            <FormGroup>
              <Row>
                <Label sm="2">Title</Label>
                <Col sm="10">
                  <Input
                    type="text"
                    defaultValue=""
                    placeholder="Title"
                    {...register('title', {
                      // required: 'Please enter title.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">Description</Label>
                <Col sm="10">
                  <Input
                    type="textarea"
                    rows="5"
                    defaultValue=""
                    {...register('description', {
                      // required: 'Please enter description.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="description"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">Coupon Image</Label>
                <Col sm="10">
                  <Input
                    type="file"
                    placeholder=""
                    {...register('image', {
                      // required: 'Please upload coupon image.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="image"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">Start Date</Label>
                <Col sm="10">
                  <Input
                    type="date"
                    placeholder="Start Date"
                    {...register('start_date', {
                      // required: 'Please enter start date.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="start_date"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">End Date</Label>
                <Col sm="10">
                  <Input
                    type="date"
                    placeholder="End Date"
                    {...register('end_date', {
                      // required: 'Please enter end date.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="end_date"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">No.of coupons to generate</Label>
                <Col sm="10">
                  <Input
                    type="number"
                    defaultValue=""
                    placeholder="No.of coupons to generate"
                    {...register('total_no', {
                      // required: 'Please enter no.of coupons to generate.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="total_no"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
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
        </form>
      </Col>
    </Row>
  );
};

CouponForm.propTypes = {
  setPageType: PropTypes.func,
};

export default CouponForm;
