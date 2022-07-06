import { appActions } from '../../actions';
import initialState from '../../initialState';

function metadata(state = initialState.metadata, actions) {
  switch (actions.type) {
    case appActions.GET_CURRENT_SEMESTER_REQUEST:
      return {
        ...state,
        currentSemesterError: {},
        gettingCurrentSemester: true,
      };
    case appActions.GET_CURRENT_SEMESTER_SUCCESS:
      return {
        ...state,
        currentSemester: actions.data,
        gettingCurrentSemester: false,
      };
    case appActions.GET_CURRENT_SEMESTER_ERROR:
      return {
        ...state,
        currentSemesterError: actions.error,
        gettingCurrentSemester: false,
      };

    case appActions.GET_INSTITUTION_STRUCTURE_REQUEST:
      return {
        ...state,
        institutionStructureError: {},
        gettingInstitutionStructure: true,
      };
    case appActions.GET_INSTITUTION_STRUCTURE_SUCCESS:
      return {
        ...state,
        institutionStructure: actions.data,
        gettingInstitutionStructure: false,
      };
    case appActions.GET_INSTITUTION_STRUCTURE_ERROR:
      return {
        ...state,
        institutionStructureError: actions.error,
        gettingInstitutionStructure: false,
      };

    case appActions.GET_META_DATA_REQUEST:
      return {
        ...state,
        metadataError: {},
        gettingMetadata: true,
      };
    case appActions.GET_META_DATA_SUCCESS:
      return {
        ...state,
        metadata: actions.data,
        gettingMetadata: false,
      };
    case appActions.GET_META_DATA_ERROR:
      return {
        ...state,
        metadataError: actions.error,
        gettingMetadata: false,
      };
    default:
      return state;
  }
}

export default metadata;
