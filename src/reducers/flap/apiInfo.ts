import { AnyAction } from 'redux';
import {
  GET_FLAP_API_INFO_ERROR,
  GET_FLAP_API_INFO_RESPONSE,
  GET_FLAP_API_INFO_START,
} from '../../actions/apiInfo';

const initialState = { loading: false, error: null as string };

const apiInfoReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_FLAP_API_INFO_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_FLAP_API_INFO_RESPONSE: {
      delete state.error;
      return {
        ...state,
        data: { ...action.response },
        loading: false,
      };
    }
    case GET_FLAP_API_INFO_ERROR: {
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

export default apiInfoReducer;
