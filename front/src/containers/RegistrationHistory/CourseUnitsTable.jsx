import { isEmpty, orderBy } from 'lodash';
import PropTypes, { array } from 'prop-types';
import React from 'react';
import DataTable from 'react-data-table-component';
import { DataNotFound } from '../../components/common';
import darkHeader from '../../helpers/dataTableCustomStyle';

const CourseUnitsTable = ({
  courseUnits,
  customColumns,
  columnsBefore,
  columnsAfter,
  ...props
}) => {
  const tableColumns = [
    ...columnsBefore,
    {
      name: 'CODE',
      selector: 'course_unit_code',
      width: '80px',
    },
    {
      name: 'COURSE TITLE',
      selector: 'course_unit_name',
      wrap: true,
      minWidth: '200px',
    },
    {
      name: 'CATEGORY',
      selector: 'category',
      width: '100px',
    },
    {
      name: 'C.U',
      selector: 'credit_unit',
      width: '50px',
      right: true,
    },
    ...columnsAfter,
  ];

  return (
    <>
      <DataTable
        data={orderBy(courseUnits, ['study_year'], 'asc')}
        columns={!isEmpty(customColumns) ? customColumns : tableColumns}
        dense
        striped
        pointerOnHover
        noHeader
        highlightOnHover
        fixedHeader
        fixedHeaderScrollHeight="300px"
        noDataComponent={
          <DataNotFound message="NO COURSES/MODULES AVAILABLE" />
        }
        customStyles={darkHeader}
        {...props}
      />
    </>
  );
};

CourseUnitsTable.defaultProps = {
  columnsBefore: [],
  columnsAfter: [],
  customColumns: [],
  courseUnits: [],
};

CourseUnitsTable.propTypes = {
  columnsAfter: PropTypes.oneOfType([array]),
  columnsBefore: PropTypes.oneOfType([array]),
  customColumns: PropTypes.oneOfType([array]),
  courseUnits: PropTypes.oneOfType([array]),
};

export default CourseUnitsTable;
