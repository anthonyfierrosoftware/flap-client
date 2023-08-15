import { combineReducers } from 'redux';
import flap from './flap';
import local from './local';

export default combineReducers({ flap, local });
