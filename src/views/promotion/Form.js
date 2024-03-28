import React, { useContext, useState } from 'react';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Label, Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../../components/ComponentCard';
import { createPromotion, updatePromotion } from '../../store/promotion/PromotionSlice';
import { StateContext } from '../../context/AppProvider';

const PromotionForm = ({ setPageType }) => {
  const dispatch = useDispatch();
  const contData = useContext(StateContext);
  const editData = contData.promotionEditData;
  const [errorValidation, setErrorValidation] = useState({});

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
    setErrorValidation({
      ...errorValidation,
    });
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('title_ar', data.title_ar);
    formData.append('description', data.description);
    formData.append('description_ar', data.description_ar);
    if (Object.keys(editData).length === 0) {
      dispatch(createPromotion(formData));
    } else {
      const payload = { promotionId: editData.id, data: formData };
      dispatch(updatePromotion(payload));
    }
  };

  return (
    <Row>
      <Col md="12">
        <form onSubmit={handleSubmit(submitForm)}>
          <ComponentCard
            title="Promotion Management"
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

PromotionForm.propTypes = {
  setPageType: PropTypes.func,
};

export default PromotionForm;
