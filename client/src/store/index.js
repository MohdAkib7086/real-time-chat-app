import {legacy_createStore as createStore,compose,combineReducers,applyMiddleware} from 'redux';

import {thunk} from 'redux-thunk'
import { authRedcuer } from './reducers/authReducer';
import { chatReducer } from './reducers/chatReducer';

const rootReducer=combineReducers({
  auth:authRedcuer,
  chat:chatReducer
});

const middleware=[thunk];
const store= createStore(rootReducer,compose(applyMiddleware(...middleware)
,
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;