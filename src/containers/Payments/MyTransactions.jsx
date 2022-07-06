import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaMinus, FaPlus, FaPaperclip } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataNotFound,
  DataSpinner,
  ReloadButton,
  TabMenu,
} from '../../components/common';
import { paymentActions } from '../../config/actions';
import TransactionTables from './TransactionTables';

const MyTransactions = () => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.myTransaction);
  const [currentMenu, setCurrentMenu] = useState('data');

  const getTransactions = () => dispatch(paymentActions.getMyTransactions());

  useEffect(() => {
    if (isEmpty(transactions)) getTransactions();
  }, []);

  let columns = [
    {
      name: 'ACADEMIC YEAR',
      cell(transaction) {
        const {
          semester,
          academic_year: academicYear,
          programme_study_years: studyYear,
        } = transaction;
        return (
          <span className="font600 text-info">
            <FaPaperclip className="me-1" />
            {`${studyYear} - ${semester} - ${academicYear}`}
          </span>
        );
      },
    },
  ];

  if (currentMenu === 'deposits') {
    columns = [
      {
        name: 'Invoice No',
        sortable: true,
        cell(row) {
          const { transaction_date: txnDate } = row;
          return (
            <span className="font500 text-uppercase text-info">
              {`${txnDate} Fees Deposits`}
            </span>
          );
        },
      },
    ];
  }

  return (
    <Card>
      <TabMenu
        currentMenu={currentMenu}
        setCurrentMenu={setCurrentMenu}
        menus={[
          {
            title: 'Invoice Payments',
            action: 'data',
          },
          {
            title: 'Fees Deposits',
            action: 'deposits',
          },
        ]}
      >
        <div className="card-options">
          <ReloadButton loading={loading} onClick={() => getTransactions()} />
        </div>
      </TabMenu>

      <Card.Body className="p-0">
        <DataTable
          data={transactions[currentMenu]}
          noHeader
          noTableHead
          progressPending={loading && isEmpty(transactions[currentMenu])}
          progressComponent={<DataSpinner />}
          expandableRows
          columns={columns}
          noDataComponent={
            <DataNotFound message="YOU HAVE NO TRANSACTION HISTORY" />
          }
          expandableRowsComponent={<TransactionTables />}
          expandableRowExpanded={() => true}
          expandOnRowClicked
          striped
          expandableIcon={{
            expanded: <FaMinus className="text-info" />,
            collapsed: <FaPlus className="text-info" />,
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default MyTransactions;
