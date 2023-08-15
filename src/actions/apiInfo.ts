import axios from 'axios';
import { Dispatch } from 'redux';

export const GET_FLAP_API_INFO_START = 'flap/GET_FLAP_API_VERSION_START';
export const GET_FLAP_API_INFO_RESPONSE = 'flap/GET_FLAP_API_VERSION_RESPONSE';
export const GET_FLAP_API_INFO_ERROR = 'flap/GET_FLAP_API_VERSION_ERROR';

export const getFlapApiInfo = () => (dispatch: Dispatch<any>) => {
  dispatch({
    type: GET_FLAP_API_INFO_START,
  });

  const req = axios
    .get('/api')
    .then(res => {
      dispatch({
        type: GET_FLAP_API_INFO_RESPONSE,
        response: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_FLAP_API_INFO_ERROR,
        error: err,
      });
    });

  return req;
};
