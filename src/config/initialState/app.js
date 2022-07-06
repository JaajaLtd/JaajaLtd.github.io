const app = {
  server: {
    errorMessage: {},
    successMessage: {},
  },

  metadata: {
    metadata: [],
    gettingMetadata: false,
  },

  institutionStructure: {
    gettingInstitutionStructure: false,
    institutionStructure: {},
    institutionStructureError: {},
  },

  currentSemester: {
    currentSemester: {},
    currentSemesterError: {},
    gettingCurrentSemester: false,
  },
};

export default app;
