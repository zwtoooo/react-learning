
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import shopsMap from './shopCartReducer';

const reducersAll = combineReducers({
  shopsMap
});

export default createStore(reducersAll, applyMiddleware(logger));





