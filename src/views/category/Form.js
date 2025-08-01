import React, { useContext, useState } from 'react';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Label, Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../../components/ComponentCard';
import { createCategory, updateCategory } from '../../store/category/CategorySlice';
import { StateContext } from '../../context/AppProvider';

const CategoryForm = ({ setPageType }) => {
  const dispatch = useDispatch();
  const contData = useContext(StateContext);
  const editData = contData.categoryEditData;
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
    const valid = 0;
    setErrorValidation({
      ...errorValidation,
    });
    if (valid === 0) {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('title_ar', data.title_ar);
      if (Object.keys(editData).length === 0) {
        dispatch(createCategory(formData));
      } else {
        const payload = { categoryId: editData.id, data: formData };
        dispatch(updateCategory(payload));
      }
    }
  };

  const handleCancelButtonClick = () => {
    setPageType('list');
  };

  return (
    <Row>
      <Col md="12">
        <form onSubmit={handleSubmit(submitForm)}>
          <ComponentCard
            title="Category Management"
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
          </ComponentCard>
          <Card>
            <CardBody className="border-top gap-2 d-flex align-items-center">
              <Button type="submit" className="btn btn-success">
                Save
              </Button>
              <Button
                type="button"
                className="btn btn-dark ml-2"
                onClick={() => handleCancelButtonClick()}
              >
                Cancel
              </Button>
            </CardBody>
          </Card>
        </form>
      </Col>
    </Row>
  );
};

CategoryForm.propTypes = {
  setPageType: PropTypes.func,
};

export default CategoryForm;
