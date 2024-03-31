import { combineReducers } from 'redux';
import postReducer from './posts';
import userReducer from './users';

const rootReducer = combineReducers({postReducer,userReducer});

export default rootReducer;
