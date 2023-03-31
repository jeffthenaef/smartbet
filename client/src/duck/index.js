import { combineReducers } from 'redux';

import userReducer from './user';
import eventsReducer from './events';
import ordersReducer from './orders';

const reducers = combineReducers({
  user: userReducer,
  events: eventsReducer,
  orders: ordersReducer
});

export default reducers;
