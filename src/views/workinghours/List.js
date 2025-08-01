import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Input, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import moment from 'moment';
import ComponentCard from '../../components/ComponentCard';
import CustomPagination from '../../components/CustomPagination';
import { listWorkHour, updateWorkHour } from '../../store/workhour/WorkhourSlice';

const WorkHourList = () => {
  const dispatch = useDispatch();

  const listData = useSelector((state) => state.workhour.listWorkHourStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  // Inline edit states
  const [editingRowId, setEditingRowId] = useState(null);
  const [editValues, setEditValues] = useState({
    is_holiday: false,
    from_time: '',
    to_time: '',
  });

  useEffect(() => {
    dispatch(listWorkHour());
  }, [dispatch]);

  // handle input change
  const handleInputChange = (field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // handle edit click
  const handleEditClick = (row) => {
    setEditingRowId(row.id);
    setEditValues({
      is_holiday: !!row.is_holiday,
      from_time: row.from_time || '',
      to_time: row.to_time || '',
    });
  };

  // handle cancel
  const handleCancelEdit = () => {
    setEditingRowId(null);
    setEditValues({});
  };

  const normalizeTime = (time) => {
    if (!time) return null;
    return /^\d{2}:\d{2}:\d{2}$/.test(time) ? time : `${time}:00`;
  };

  // handle save
  const handleSaveEdit = (id) => {
    const fromTime = normalizeTime(editValues.from_time);
    const toTime = normalizeTime(editValues.to_time);
    dispatch(
      updateWorkHour({
        WorkHourId: id,
        data: {
          is_holiday: editValues.is_holiday ? 1 : 0,
          from_time: editValues.is_holiday ? null : fromTime,
          to_time: editValues.is_holiday ? null : toTime,
        },
      }),
    );
    // after save, reload list
    dispatch(listWorkHour());
    setEditingRowId(null);
  };

  // Pagination
  let currentItems = [];
  let totalPages = 0;
  let slCount = 0;
  if (listData && listData.length > 0) {
    const totalItems = listData.length;
    const endOffset = itemOffset + itemsPerPage;
    currentItems = listData.slice(itemOffset, endOffset);
    totalPages = Math.ceil(totalItems / itemsPerPage);

    if (Object.keys(currentItems).length > 0) {
      const index = listData.findIndex((itm) => itm.id === currentItems[0].id);
      slCount = index;
    }
  }

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Working Hours Management">
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Day</th>
                <th>Day in Arabic</th>
                <th>Holiday</th>
                <th>From Time</th>
                <th>To Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((row) => {
                  slCount += 1;
                  const isEditing = editingRowId === row.id;
                  return (
                    <tr key={row.id}>
                      <th>{slCount}</th>
                      <td>{row.day}</td>
                      <td>{row.day_ar}</td>
                      <td>
                        {isEditing ? (
                          <Input
                            type="checkbox"
                            checked={editValues.is_holiday}
                            onChange={(e) => handleInputChange('is_holiday', e.target.checked)}
                          />
                        ) : row.is_holiday ? (
                          'Yes'
                        ) : (
                          'No'
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <Input
                            type="time"
                            value={editValues.from_time || ''}
                            disabled={editValues.is_holiday}
                            onChange={(e) => handleInputChange('from_time', e.target.value)}
                          />
                        ) : (
                          moment(row.from_time, 'HH:mm:ss').format('h:mm A')
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <Input
                            type="time"
                            value={editValues.to_time || ''}
                            disabled={editValues.is_holiday}
                            onChange={(e) => handleInputChange('to_time', e.target.value)}
                          />
                        ) : (
                          moment(row.to_time, 'HH:mm:ss').format('h:mm A')
                        )}
                      </td>
                      <td>
                        {!isEditing ? (
                          <Icon.Edit className="icon-edit" onClick={() => handleEditClick(row)} />
                        ) : (
                          <>
                            <Button
                              color="success"
                              size="sm"
                              className="me-2"
                              onClick={() => handleSaveEdit(row.id)}
                            >
                              Save
                            </Button>
                            <Button color="secondary" size="sm" onClick={handleCancelEdit}>
                              Cancel
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>No Records Found</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Row>
            <Col xs="12">
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  setItemOffset((page - 1) * itemsPerPage);
                }}
              />
            </Col>
          </Row>
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default WorkHourList;
