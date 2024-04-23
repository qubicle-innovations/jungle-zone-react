import React, { useEffect, useState, useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { DispatchContext } from '../../context/AppProvider';
import ComponentCard from '../../components/ComponentCard';
import CustomPagination from '../../components/CustomPagination';
import {
  listAttraction,
  deleteAttraction,
  resetFunction,
} from '../../store/attraction/AttractionSlice';

const AttractionList = ({ setPageType }) => {
  const dispatch = useDispatch();
  const contextDispatch = useContext(DispatchContext);
  const [currentPage, setCurrentPage] = useState(1);

  const listData = useSelector((state) => state.attraction.listAttractionStatus);
  const delteStatus = useSelector((state) => state.attraction.deleteAttractionStatus);

  useEffect(() => {
    dispatch(listAttraction());
  }, [dispatch]);

  useEffect(() => {
    let msg = '';
    if (delteStatus) {
      if (delteStatus.success === true) {
        msg = delteStatus.response;
        toast(msg);
        dispatch(resetFunction());
        dispatch(listAttraction());
      } else if (delteStatus.success === false) {
        toast.error(msg);
        dispatch(resetFunction());
      }
    }
  }, [delteStatus, dispatch]);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  let currentItems = [];
  let totalPages = 0;
  let slCount = 0;
  if (listData && listData.response !== undefined && listData.response.attractions.length > 0) {
    const totalItems = listData.response.attractions.length;
    currentItems = listData.response.attractions.slice(itemOffset, endOffset);
    totalPages = Math.ceil(totalItems / itemsPerPage);

    if (Object.keys(currentItems).length > 0) {
      const index = listData.response.attractions.findIndex((itm) => {
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
      type: 'attraction_edit',
      payload: cpn,
    });
    setPageType('edit');
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteAttraction(id));
  };
  return (
    <Row>
      <Col md="12">
        <ComponentCard
          title="Attraction Management"
          buttontext="New Attraction"
          pagetype="add"
          setPageType={setPageType}
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
                          <span>
                            <Icon.Eye className="icon-view" />
                          </span>
                          <span>
                            <Icon.Trash
                              className="icon-delete"
                              onClick={() => {
                                // eslint-disable-next-line
                                if (window.confirm('Delete the attraction?')) {
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

AttractionList.propTypes = {
  setPageType: PropTypes.func,
};
export default AttractionList;
