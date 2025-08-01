import React, { useContext, useState } from 'react';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Label, Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../../components/ComponentCard';
import { createSubadmin, updateSubadmin } from '../../store/subadmin/SubadminSlice';
import { StateContext } from '../../context/AppProvider';

const SubadminForm = ({ setPageType }) => {
  const dispatch = useDispatch();
  const contData = useContext(StateContext);
  const editData = contData.subadminEditData;
  const [errorValidation, setErrorValidation] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: Object.keys(editData).length > 0 ? editData.name : '',
      email: Object.keys(editData).length > 0 ? editData.email : '',
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

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', 'sub_admin');

    if (Object.keys(editData).length === 0) {
      dispatch(createSubadmin(formData));
    } else {
      const payload = { subadminId: editData.id, data: formData };
      dispatch(updateSubadmin(payload));
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
            title="Subadmin Management"
            buttontext="Back"
            pagetype="list"
            setPageType={setPageType}
          >
            <FormGroup>
              <Row>
                <Label sm="2">Name</Label>
                <Col sm="10">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    {...register('name', {
                      required: 'Please enter name.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">Email</Label>
                <Col sm="10">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Email"
                    {...register('email', {
                      required: 'Please enter an Email.',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address.',
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">Password</Label>
                <Col sm="10">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                      required: 'Please enter Password.',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters.',
                      },
                      pattern: {
                        value: /[!@#$%^&*(),.?":{}|<>]/,
                        message: 'Password must contain at least one special character.',
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
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

SubadminForm.propTypes = {
  setPageType: PropTypes.func,
};

export default SubadminForm;
