const result = {
  GET_MY_RESULT_REQUEST: 'GET_MY_RESULT_REQUEST',
  GET_MY_RESULT_SUCCESS: 'GET_MY_RESULT_SUCCESS',
  GET_MY_RESULT_ERROR: 'GET_MY_RESULT_ERROR',

  getMyResult: (studentProgrammeId) => ({
    type: result.GET_MY_RESULT_REQUEST,
    studentProgrammeId,
  }),
};

export default result;
