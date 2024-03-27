import React, { useContext, useState } from 'react';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Label, Card, CardBody, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import PropTypes from 'prop-types';
import ComponentCard from '../../components/ComponentCard';
import { createCoupon, updateCoupon } from '../../store/coupon/CouponSlice';
import { StateContext } from '../../context/AppProvider';


const uploadurl = `${process.env.REACT_APP_UPLOAD_URL}`;

const CouponForm = ({ setPageType }) => {
  const dispatch = useDispatch();
  const contData = useContext(StateContext);
  const editData = contData.couponEditData;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorValidation, setErrorValidation] = useState({
    startDate: 0,
    endDate: 0,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: Object.keys(editData).length > 0 ? editData.title : '',
      title_ar: Object.keys(editData).length > 0 ? editData.title_ar : '',
      description: Object.keys(editData).length > 0 ? editData.description : '',
      description_ar: Object.keys(editData).length > 0 ? editData.description_ar : '',
      image: Object.keys(editData).length > 0 ? editData.image : null,
      total_no: Object.keys(editData).length > 0 ? editData.total_no : '',
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
    let valid = 0;
    let validStartDate = 0;
    let validEndDate = 0;

    if (startDate === '') {
      valid = 1;
      validStartDate = 1;
    }

    if (endDate === '') {
      valid = 1;
      validEndDate = 1;
    }
    setErrorValidation({
      ...errorValidation,
      startDate: validStartDate,
      endDate: validEndDate,
    });
    if (valid === 0) {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('title_ar', data.title_ar);
      formData.append('description', data.description);
      formData.append('description_ar', data.description_ar);
      formData.append('start_date', moment(startDate).format('YYYY-MM-DD'));
      formData.append('end_date', moment(endDate).format('YYYY-MM-DD'));
      formData.append('total_no', data.total_no);
      formData.append('image', data.image[0]);
      if (Object.keys(editData).length === 0) {
        dispatch(createCoupon(formData));
      } else {
        const payload = { couponId: editData.id, data: formData };
        dispatch(updateCoupon(payload));
      }
    }
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
                <Label sm="2">Title in Arabic</Label>
                <Col sm="10">
                  <input
                    className="form-control input-direction"
                    type="text"
                    placeholder="Title in Arabic"
                    {...register('title_ar', {
                      required: 'Please enter Arabic title.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="title_ar"
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
                <Label sm="2">Description in Arabic</Label>
                <Col sm="10">
                  <textarea
                    className="form-control input-direction"
                    rows="5"
                    {...register('description_ar', {
                      required: 'Please enter Arabic description.',
                    })}
                  ></textarea>
                  <ErrorMessage
                    errors={errors}
                    name="description_ar"
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
                      required: editData?.image ? false : 'Please upload coupon image.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="image"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
              <Row>
                <Col sm="10" className='text-center mt-3'>
                  {Object.keys(editData).length > 0 ? (
                    <img alt="" src={uploadurl+editData.image} width={100} height={100} />
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">Start Date</Label>
                <Col sm="10">
                  <DatePicker
                    selected={startDate}
                    className="form-control"
                    onChange={(date) => {
                      setStartDate(date);
                    }}
                    placeholderText="Select Date"
                    dateFormat="dd-MM-yyyy"
                  />
                  {errorValidation.startDate === 1 && (
                    <p className="val-error">Please enter start date.</p>
                  )}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">End Date</Label>
                <Col sm="10">
                  <DatePicker
                    selected={endDate}
                    className="form-control"
                    onChange={(date) => {
                      setEndDate(date);
                    }}
                    placeholderText="Select Date"
                    dateFormat="dd-MM-yyyy"
                  />

                  {errorValidation.endDate === 1 && (
                    <p className="val-error">Please enter end date.</p>
                  )}
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
