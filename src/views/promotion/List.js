import React from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../assets/scss/ReactBootstrapTable.scss';
import PropTypes from 'prop-types';

import ComponentCard from '../../components/ComponentCard';

//This is for the Delete row
function onAfterDeleteRow(rowKeys) {
  // eslint-disable-next-line no-alert
  alert(`The rowkey you drop: ${rowKeys}`);
}
//This is for the insert new row
/*
function onAfterInsertRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
}*/
//This is for the Search item
function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log(`Fruit: ${result[i].id}, ${result[i].name}, ${result[i].price}`);
  }
}
const options = {
  //afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
  afterDeleteRow: onAfterDeleteRow, // A hook for after droping rows.
  afterSearch, // define a after search hook
};
const selectRowProp = {
  mode: 'checkbox',
};
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
};

const jsonData = [];

const PromotionList = ({ setPageType }) => {
  return (
    <Row>
      <Col md="12">
        <ComponentCard
          title="Promotions Management"
          buttontext="New Promotion"
          pagetype="add"
          setPageType={setPageType}
        >
          <BootstrapTable
            striped
            hover
            condensed
            search
            data={jsonData}
            selectRow={selectRowProp}
            pagination
            options={options}
            cellEdit={cellEditProp}
            tableHeaderClass="mb-0"
          >
            <TableHeaderColumn width="100" dataField="title" isKey>
              Title
            </TableHeaderColumn>
            <TableHeaderColumn width="100" dataField="date">
              Date
            </TableHeaderColumn>
          </BootstrapTable>
        </ComponentCard>
      </Col>
    </Row>
  );
};

PromotionList.propTypes = {
  setPageType: PropTypes.func,
};
export default PromotionList;
