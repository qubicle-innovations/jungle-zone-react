import React from 'react';
import ReactTable from 'react-table-v6';
import { Button, Row, Col } from 'reactstrap';
import 'react-table-v6/react-table.css';
import PropTypes from 'prop-types';

import ComponentCard from '../../components/ComponentCard';

const jsonData = [['Album 1', '11-03-2024']];

const GalleryList = ({ setPageType }) => {
  const data2 = jsonData.map((prop, key) => {
    return {
      id: key,
      title: prop[0],
      date: prop[1],
      actions: (
        <div className="text-center">
          <Button
            onClick={() => {
              // const sobj = data2.find((o) => o.id === key);
              setPageType('view');
            }}
            color="success"
            size="sm"
            round="true"
            icon="true"
          >
            <i className="fe fe-eye" />
          </Button>
        </div>
      ),
    };
  });

  return (
    <Row>
      <Col md="12">
        <ComponentCard
          title="Gallery Management"
          buttontext="New Gallery"
          pagetype="add"
          setPageType={setPageType}
        >
          <ReactTable
            columns={[
              {
                Header: 'Title',
                accessor: 'title',
              },
              {
                Header: 'Date',
                accessor: 'date',
              },
              {
                Header: 'Actions',
                accessor: 'actions',
                sortable: false,
                filterable: false,
              },
            ]}
            defaultPageSize={10}
            showPaginationBottom
            className="-striped -highlight"
            data={data2}
            filterable
          />
        </ComponentCard>
      </Col>
    </Row>
  );
};

GalleryList.propTypes = {
  setPageType: PropTypes.func,
};
export default GalleryList;
