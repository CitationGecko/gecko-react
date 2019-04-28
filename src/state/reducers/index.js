import { combineReducers } from 'redux';
import { data } from './data';
import { ui } from './ui';
import { search } from './search';

export const reducer = combineReducers({ data, ui, search });
