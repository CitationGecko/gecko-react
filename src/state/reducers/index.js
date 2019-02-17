import { combineReducers } from 'redux';
import { data } from './data';
import { ui } from './ui';

export const reducer = combineReducers({ data, ui });
