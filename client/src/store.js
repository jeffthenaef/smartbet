import { createStore } from 'redux';

import reducers from './duck';

const store = createStore(reducers);
 
export default store
