import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware  from "redux-thunk";
import usersReducer     from './reducers/users-reducer';
import userCardReducer  from './reducers/user-card-reducer';
import loadReducer      from './reducers/load-reducer';
import modalReducer     from './reducers/modal-reducer';
import redirectReducer  from './reducers/redirect-reducer';
import authReducer      from './reducers/auth-reducer';
import reportReducer    from './reducers/report-reducer';

let reducers = combineReducers({
    usersStore:     usersReducer,
    userCardStore:  userCardReducer,
    loadStore:      loadReducer,
    modalStore:     modalReducer,
    redirectStore:  redirectReducer,
    authStore:      authReducer,
    reportStore:    reportReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;