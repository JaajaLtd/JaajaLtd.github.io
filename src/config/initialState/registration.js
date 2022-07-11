const registration = {
  registration: {
    loadError: {},
    currentSemester: {},
    currentSemesterError: {},
    gettingCurrentSemester: false,

    gettingRegistrationEvent: false,
    registrationEvent: {},
    registrationEventError: {},

    gettingRegistrationHistory: false,
    registrationHistoryError: {},
    registrationHistories: [],

    registeringStudent: false,
    registrationError: {},
    registrationSuccess: [],

    gettingCourseUnits: false,
    getCourseUnitError: {},
    courseUnitsByStudyYear: [],
  },
  users: {
    loading: false,
    users: [],
    loadError: {},
  },
};

export default registration;
