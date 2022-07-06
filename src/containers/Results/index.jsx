import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertMessage,
  DataNotFound,
  DataSpinner,
  ReloadButton,
} from '../../components/common';
import { resultActions } from '../../config/actions';
import usePrevious from '../Hooks/usePrevious';
import MyResult from './MyResult';

const Result = () => {
  const dispatch = useDispatch();
  const { results, loading, loadError } = useSelector((state) => state.result);
  const { currentStudentProgramme } = useSelector((state) => state.auth);
  const [myResult, setMyResult] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const prevState = usePrevious({ loadError });

  const getMyResult = () => {
    setErrorMessage(null);
    dispatch(resultActions.getMyResult(currentStudentProgramme?.id));
  };

  useEffect(() => {
    if (results) {
      const findResult = results.find(
        (result) =>
          result.programme_code === currentStudentProgramme.programme_code
      );
      if (findResult) setMyResult(findResult);
      else getMyResult();
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(results)) {
      const findResult = results.find(
        (result) =>
          result?.programme_code === currentStudentProgramme?.programme_code
      );
      if (findResult) setMyResult(findResult);
      else {
        setMyResult({});
        setErrorMessage(null);
      }
    }
  }, [results, loading]);

  useEffect(() => {
    if (
      !isEmpty(prevState) &&
      !isEmpty(loadError) &&
      loadError !== prevState.loadError
    ) {
      setErrorMessage(loadError?.error?.message || loadError?.server?.message);
    }
  }, [loadError]);

  return (
    <div>
      <Card>
        <Card.Header className="py-2">
          <div className="font600 text-uppercase text-sm">My Result</div>
          <div className="card-options">
            <ReloadButton loading={loading} onClick={getMyResult} />
          </div>
        </Card.Header>
        <Card.Body>
          {errorMessage && <AlertMessage message={errorMessage} />}
          {loading && isEmpty(myResult) ? (
            <DataSpinner />
          ) : (
            <>
              {isEmpty(myResult) ? (
                <DataNotFound message="You have No Results" />
              ) : (
                <>
                  <MyResult result={myResult} />
                </>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Result;
