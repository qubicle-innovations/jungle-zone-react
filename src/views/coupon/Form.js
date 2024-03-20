import React from 'react';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Label, Card, CardBody, Button } from 'reactstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import ComponentCard from '../../components/ComponentCard';
import { createCoupon } from '../../store/coupon/CouponSlice';

const CouponForm = ({ setPageType }) => {
  const dispatch = useDispatch();
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
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('start_date', data.start_date);
    formData.append('end_date', data.end_date);
    formData.append('total_no', data.total_no);
    formData.append('image', data.image[0]);

    dispatch(createCoupon(formData));
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
                  <input
                    className="form-control"
                    type="text"
                    defaultValue=""
                    placeholder="Title"
                    {...register('title', {
                      required: 'Please enter title.',
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
                  <textarea
                    className="form-control"
                    rows="5"
                    defaultValue=""
                    {...register('description', {
                      required: 'Please enter description.',
                    })}
                  ></textarea>
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
                  <input
                    className="form-control"
                    type="file"
                    placeholder=""
                    {...register('image', {
                      required: 'Please upload coupon image.',
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
                  <input
                    className="form-control"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    placeholder="Start Date"
                    {...register('start_date', {
                      required: 'Please enter start date.',
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
                  <input
                    className="form-control"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    placeholder="End Date"
                    {...register('end_date', {
                      required: 'Please enter end date.',
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
                  <input
                    className="form-control"
                    type="number"
                    defaultValue=""
                    placeholder="No.of coupons to generate"
                    {...register('total_no', {
                      required: 'Please enter no.of coupons to generate.',
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
