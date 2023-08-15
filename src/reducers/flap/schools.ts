import { AnyAction } from 'redux';
import {
  GET_SCHOOLS_START,
  GET_SCHOOLS_ERROR,
  GET_SCHOOLS_RESPONSE,
} from '../../actions/schools';

const initialState = { loading: false, error: null as string };

const schoolsArrayToObject = (schools: School[]) =>
  schools.reduce((acc, school) => ({ ...acc, [school.CDSCode]: school }), {});

interface SchoolsResponse {
  hits: School[];
  more: boolean;
}

const schoolsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_SCHOOLS_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_SCHOOLS_RESPONSE: {
      delete state.error;
      return {
        ...state,
        data: {
          ...schoolsArrayToObject((action.response as SchoolsResponse).hits),
        },
        loading: false,
      };
    }
    case GET_SCHOOLS_ERROR: {
      return {
        ...state,
        error: action.error as string,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default schoolsReducer;
