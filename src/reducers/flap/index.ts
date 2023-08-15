import { combineReducers } from 'redux';
import apiInfo from './apiInfo';
import schools from './schools';

const flapReducer = combineReducers({ apiInfo, schools });

export default flapReducer;
