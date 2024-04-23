import React, { useEffect, useState, useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { DispatchContext } from '../../context/AppProvider';
import ComponentCard from '../../components/ComponentCard';
import CustomPagination from '../../components/CustomPagination';
import {
  listCategory,
  listSubcategory,
  deleteCategory,
  resetFunction,
} from '../../store/category/CategorySlice';

const uploadurl = `${process.env.REACT_APP_UPLOAD_URL}`;

const CategoryList = ({ setPageType }) => {
  const dispatch = useDispatch();
  const contextDispatch = useContext(DispatchContext);
  const [currentPage, setCurrentPage] = useState(1);

  const listData = useSelector((state) => state.category.listCategoryStatus);
  const listSubData = useSelector((state) => state.category.listSubcategoryStatus);
  const delteStatus = useSelector((state) => state.category.deleteCategoryStatus);

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
      const data = listData.response.categories;
      const catOptions = data.map((item) => ({
        label: item.title, // <-- input values you are matching + item.title_ar
        value: item.id,
      }));
      setSelectCatOptions(catOptions);
    }
  }, [dispatch, listCategory]);

  useEffect(() => {
    let msg = '';
    if (delteStatus) {
      if (delteStatus.success === true) {
        msg = delteStatus.response;
        toast(msg);
        dispatch(resetFunction());
      } else if (delteStatus.success === false) {
        toast.error(msg);
        dispatch(resetFunction());
      }
      const payload = { categoryId: catSelected.value };
      dispatch(listSubcategory(payload));
    }
  }, [delteStatus, dispatch]);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  let currentItems = [];
  let totalPages = 0;
  let slCount = 0;
  if (
    listSubData &&
    listSubData.response !== undefined &&
    listSubData.response.categories.length > 0
  ) {
    const totalItems = listSubData.response.categories.length;
    currentItems = listSubData.response.categories.slice(itemOffset, endOffset);
    totalPages = Math.ceil(totalItems / itemsPerPage);

    if (Object.keys(currentItems).length > 0) {
      const index = listSubData.response.categories.findIndex((itm) => {
        return itm.id === currentItems[0].id;
      });
      slCount = index;
    }
  }

  const handleCatChange = (val) => {
    setCatSelected(val);
    const payload = { categoryId: val.value };
    dispatch(listSubcategory(payload));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const pg = page - 1;
    const newOffset = pg * itemsPerPage;
    setItemOffset(newOffset);
  };

  const handleEditClick = (cpn) => {
    contextDispatch({
      type: 'category_edit',
      payload: cpn,
    });
    setPageType('edit');
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <Row>
      <Col md="12">
        <ComponentCard
          title="Sub-category Management"
          buttontext="New Sub-category"
          pagetype="add"
          setPageType={setPageType}
        >
          <Col md="3">
            <Select
              value={catSelected}
              onChange={(selected) => handleCatChange(selected)}
              options={selectCatOptions}
              classNamePrefix="select2-selection"
            />
          </Col>
          <Table responsive>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Arabic Title</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {catSelected.value && currentItems ? (
                currentItems.map((cpn) => {
                  slCount += 1;
                  return (
                    <tr key={cpn.id}>
                      <th scope="row">{slCount}</th>
                      <td>{cpn.title}</td>
                      <td>{cpn.title_ar}</td>
                      <td>
                        <img alt="" src={uploadurl + cpn.image} width={100} height={100} />
                      </td>
                      <td>
                        <div className="actions">
                          <span>
                            <Icon.Edit className="icon-edit" onClick={() => handleEditClick(cpn)} />
                          </span>
                          <span>
                            <Icon.Eye className="icon-view" />
                          </span>
                          <span>
                            <Icon.Trash
                              className="icon-delete"
                              onClick={() => {
                                // eslint-disable-next-line
                                if (window.confirm('Delete the category?')) {
                                  handleDeleteClick(cpn.id);
                                }
                              }}
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3}>No Records Found</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Row>
            <Col xs="12">
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Col>
          </Row>
        </ComponentCard>
      </Col>
    </Row>
  );
};

CategoryList.propTypes = {
  setPageType: PropTypes.func,
};
export default CategoryList;
