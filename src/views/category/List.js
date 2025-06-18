import React, { useEffect, useState, useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { DispatchContext } from '../../context/AppProvider';
import ComponentCard from '../../components/ComponentCard';
import CustomPagination from '../../components/CustomPagination';
import { listCategory, deleteCategory, resetFunction } from '../../store/category/CategorySlice';

const CategoryList = ({ setPageType }) => {
  const dispatch = useDispatch();
  const contextDispatch = useContext(DispatchContext);
  const [currentPage, setCurrentPage] = useState(1);

  const listData = useSelector((state) => state.category.listCategoryStatus);
  const delteStatus = useSelector((state) => state.category.deleteCategoryStatus);

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

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
    }
    dispatch(listCategory());
  }, [delteStatus, dispatch]);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  let currentItems = [];
  let totalPages = 0;
  let slCount = 0;
  if (listData && listData.response !== undefined && listData.response.categories.length > 0) {
    const totalItems = listData.response.categories.length;
    currentItems = listData.response.categories.slice(itemOffset, endOffset);
    totalPages = Math.ceil(totalItems / itemsPerPage);

    if (Object.keys(currentItems).length > 0) {
      const index = listData.response.categories.findIndex((itm) => {
        return itm.id === currentItems[0].id;
      });
      slCount = index;
    }
  }

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
          title="Category Management"
          buttontext="New Category"
          pagetype="add"
          setPageType={setPageType}
          contextType='category_edit'
        >
          <Table responsive>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Arabic Title</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems ? (
                currentItems.map((cpn) => {
                  slCount += 1;
                  return (
                    <tr key={cpn.id}>
                      <th scope="row">{slCount}</th>
                      <td>{cpn.title}</td>
                      <td>{cpn.title_ar}</td>
                      <td>
                        <div className="actions">
                          <span>
                            <Icon.Edit className="icon-edit" onClick={() => handleEditClick(cpn)} />
                          </span>
                          {/* <span>
                            <Icon.Eye className="icon-view" />
                          </span> */}
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
