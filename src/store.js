import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { createLogger } from 'redux-logger';
import loanReducer from './reducers/loanReducer';
import clientsReducer from './reducers/clientsReducer';

const logger = createLogger();

const rootReducer = combineReducers({
  loan: loanReducer,
  clients: clientsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
