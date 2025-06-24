import react from  'React';
import {createStore, applyMiddleware,combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import {createLogger} from 'redux-logger';


const logger = createLogger()
const store = createStore(applyMiddleware(thunk,logger));
export default store;