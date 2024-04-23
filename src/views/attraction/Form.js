import React, { useEffect, useContext, useState } from 'react';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, FormGroup, Label, Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ComponentCard from '../../components/ComponentCard';
import { createAttraction, updateAttraction } from '../../store/attraction/AttractionSlice';
import { listCategory, listSubcategory } from '../../store/category/CategorySlice';
import { StateContext } from '../../context/AppProvider';

const uploadurl = `${process.env.REACT_APP_UPLOAD_URL}`;

const AttractionForm = ({ setPageType }) => {
  const dispatch = useDispatch();
  const contData = useContext(StateContext);
  const editData = contData.attractionEditData;
  const [errorValidation, setErrorValidation] = useState({});

  const listData = useSelector((state) => state.category.listCategoryStatus);
  const [selectCatOptions, setSelectCatOptions] = useState([]);
  const [catSelected, setCatSelected] = useState({
    label: 'Select Category',
    value: '',
  });

  const listSubData = useSelector((state) => state.category.listSubcategoryStatus);
  const [selectSubcatOptions, setSelectSubcatOptions] = useState([]);
  const [subcatSelected, setSubcatSelected] = useState({
    label: 'Select Sub-category',
    value: '',
  });

  useEffect(() => {
    if (listSubData && listSubData.success === true) {
      const data = listSubData.response.categories;
      const subcatOptions = data.map((item) => ({
        label: item.title, // <-- input values you are matching + item.title_ar
        value: item.id,
      }));
      setSelectSubcatOptions(subcatOptions);
    }
  }, [dispatch, listSubcategory]);

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  useEffect(() => {
    if (listData && listData.success === true) {
      const data = listData.response.categories;
      const catOptions = data.map((item) => ({
        label: item.title, // <-- input values you are matching + item.title_ar
        value: item.id,
      }));
      setSelectCatOptions(catOptions);
    }
  }, [dispatch, listCategory]);

  const handleCatChange = (val) => {
    setCatSelected(val);
    const payload = { categoryId: val.value };
    dispatch(listSubcategory(payload));
  };

  const handleSubcatChange = (val) => {
    setSubcatSelected(val);
  };

  useEffect(() => {
    if (listSubData && listSubData.success === true) {
      const data = listSubData.response.categories;
      const subcatOptions = data.map((item) => ({
        label: item.title, // <-- input values you are matching + item.title_ar
        value: item.id,
      }));
      setSelectSubcatOptions(subcatOptions);
    }
  }, [dispatch, listSubcategory]);

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
    formData.append('category_id', catSelected.value);
    formData.append('subcategory_id', subcatSelected.value);
    formData.append('title_ar', data.title_ar);
    formData.append('description', data.description);
    formData.append('description_ar', data.description_ar);
    formData.append('image', data.image[0]);
    if (Object.keys(editData).length === 0) {
      dispatch(createAttraction(formData));
    } else {
      const payload = { attractionId: editData.id, data: formData };
      dispatch(updateAttraction(payload));
    }
  };

  return (
    <Row>
      <Col md="12">
        <form onSubmit={handleSubmit(submitForm)}>
          <ComponentCard
            title="Attraction Management"
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
                <Label sm="2">Category</Label>
                <Col sm="10">
                  <Select
                    value={catSelected}
                    onChange={(selected) => handleCatChange(selected)}
                    options={selectCatOptions}
                    classNamePrefix="select2-selection"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="category"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">Sub-category</Label>
                <Col sm="10">
                  <Select
                    value={subcatSelected}
                    onChange={(selected) => handleSubcatChange(selected)}
                    options={selectSubcatOptions}
                    classNamePrefix="select2-selection"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="category"
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
                <Label sm="2">Attraction Image</Label>
                <Col sm="10">
                  <input
                    className="form-control"
                    type="file"
                    placeholder=""
                    {...register('image', {
                      required: editData?.image ? false : 'Please upload attraction image.',
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
                <Col sm="10" className="text-center mt-3">
                  {Object.keys(editData).length > 0 ? (
                    <img alt="" src={uploadurl + editData.image} width={100} height={100} />
                  ) : (
                    ''
                  )}
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

AttractionForm.propTypes = {
  setPageType: PropTypes.func,
};

export default AttractionForm;
