import React, { useContext, useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, FormGroup, Label, Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ComponentCard from '../../components/ComponentCard';
import { listCategory, createCategory, updateCategory } from '../../store/category/CategorySlice';
import { StateContext } from '../../context/AppProvider';

const uploadurl = `${process.env.REACT_APP_UPLOAD_URL}`;

const CategoryForm = ({ setPageType }) => {
  const dispatch = useDispatch();
  const contData = useContext(StateContext);
  const editData = contData.categoryEditData;
  const [errorValidation, setErrorValidation] = useState({});

  const listData = useSelector((state) => state.category.listCategoryStatus);

  const [selectCatOptions, setSelectCatOptions] = useState([]);
  const [catSelected, setCatSelected] = useState({
    label: 'Select Category',
    value: '',
  });

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  useEffect(() => {
    if (listData && listData.success === true) {
      console.log(listData, 'listData');
      const data = listData.response.categories;
      const catOptions = data.map((item) => ({
        label: item.title, // <-- input values you are matching + item.title_ar
        value: item.id,
      }));
      setSelectCatOptions(catOptions);

      if (Object.keys(editData).length > 0) {
        if (editData.category_id) {
          const v = {
            label: editData.category.name, // <-- input values you are matching
            value: editData.category.id,
          };
          setCatSelected(v);
        }
      }
    }
  }, [dispatch, listCategory]);

  const handleCatChange = (val) => {
    setCatSelected(val);
  };

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
      image: Object.keys(editData).length > 0 ? editData.image : null,
      banner: Object.keys(editData).length > 0 ? editData.banner : null,
      banner_mob: Object.keys(editData).length > 0 ? editData.banner_mob : null,
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
      formData.append('image', data.image[0]);
      formData.append('banner', data.banner[0]);
      formData.append('banner_mob', data.banner_mob[0]);
      formData.append('category_id', catSelected && catSelected.value);
      if (Object.keys(editData).length === 0) {
        dispatch(createCategory(formData));
      } else {
        const payload = { categoryId: editData.id, data: formData };
        dispatch(updateCategory(payload));
      }
    }
  };

  return (
    <Row>
      <Col md="12">
        <form onSubmit={handleSubmit(submitForm)}>
          <ComponentCard
            title="Sub-category Management"
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
                    name="title_ar"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Label sm="2">Category Image</Label>
                <Col sm="10">
                  <input
                    className="form-control"
                    type="file"
                    placeholder=""
                    {...register('image', {
                      required: editData?.image ? false : 'Please upload category image.',
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
            <FormGroup>
              <Row>
                <Label sm="2">Banner Image</Label>
                <Col sm="10">
                  <input
                    className="form-control"
                    type="file"
                    placeholder=""
                    {...register('banner', {
                      required: editData?.banner ? false : 'Please upload banner image.',
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="banner"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
              <Row>
                <Col sm="10" className="text-center mt-3">
                  {Object.keys(editData).length > 0 ? (
                    <img alt="" src={uploadurl + editData.banner} width={100} height={100} />
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm="2">Mobile Banner Image</Label>
                <Col sm="10">
                  <input
                    className="form-control"
                    type="file"
                    placeholder=""
                    {...register('banner_mob')}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="banner_mob"
                    render={({ message }) => <p className="val-error">{message}</p>}
                  />{' '}
                </Col>
              </Row>
              <Row>
                <Col sm="10" className="text-center mt-3">
                  {Object.keys(editData).length > 0 ? (
                    <img alt="" src={uploadurl + editData.banner_mob} width={100} height={100} />
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

CategoryForm.propTypes = {
  setPageType: PropTypes.func,
};

export default CategoryForm;
