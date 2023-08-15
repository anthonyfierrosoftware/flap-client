import axios from 'axios';
import { Dispatch } from 'redux';

export const GET_SCHOOLS_START = 'flap/GET_SCHOOLS_START';
export const GET_SCHOOLS_RESPONSE = 'flap/GET_SCHOOLS_RESPONSE';
export const GET_SCHOOLS_ERROR = 'flap/GET_SCHOOLS_ERROR';

export const getSchools = () => (dispatch: Dispatch<any>) => {
  dispatch({ type: GET_SCHOOLS_START });

  const req = axios
    .get('/api/list/0/999')
    .then(res => {
      dispatch({ type: GET_SCHOOLS_RESPONSE, response: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_SCHOOLS_ERROR, error: err });
    });

  return req;
};
