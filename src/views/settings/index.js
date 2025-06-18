import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, FormGroup, Label, Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ComponentCard from '../../components/ComponentCard';
import { changePassword,resetData } from '../../store/passwordsettings/PSettingsSlice';

const SettingsForm = () => {
  const dispatch = useDispatch();
  const [errorValidation, setErrorValidation] = useState({});
  const passwordSuccess = useSelector((state) => state.psettings.changePasswordSuccess);

  useEffect(() => {
      let msg = '';
      let chnge = 0;
      if (passwordSuccess) {
        if (passwordSuccess.success === true) {
          msg = passwordSuccess.response;
          chnge = 1;
        } else if (passwordSuccess.success === false) {
          chnge = 2;
        }
      }
      if (chnge === 1) {
        toast(msg);
        dispatch(resetData());
      } else if (chnge === 2) {
        toast.error(msg);
      }
    }, [passwordSuccess, dispatch]);

  const {
    register,
    formState: { errors },
    handleSubmit, 
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
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
    formData.append('current_password', data.current_password);
    formData.append('new_password', data.new_password);
    dispatch(changePassword(formData));
  };

  return ( 
  <>
    <Row>
      <Col md="12">
        <form onSubmit={handleSubmit(submitForm)}>
          <ComponentCard title="Settings" pagetype="Settings">
            <FormGroup>
              <Row>
                <Label sm="2">Current Password</Label>
                <Col sm="10">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Current Password"
                    {...register('current_password', {
                      required: 'Please enter current password.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="current_password"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">New Password</Label>
                <Col sm="10">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="New Password"
                    {...register('new_password', {
                      required: 'Please enter new password.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="new_password"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">Confirm Password</Label>
                <Col sm="10">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm Password"
                    {...register('confirm_password', {
                        required: 'Please enter confirm password.',
                        validate: (value) => value === watch('new_password') || 'Passwords do not match.',
                      })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="confirm_password"
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
     <ToastContainer />
    </>
  );
};

SettingsForm.propTypes = {
  setPageType: PropTypes.func,
};

export default SettingsForm;
