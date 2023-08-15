import { combineReducers } from 'redux';
import parts from './parts';

const localReducer = combineReducers({ parts });

export default localReducer;
