import {authAPI} from '../../api/endpoints/authAPI';
import {setLoading, setLoaded} from './load-reducer';

const SET_AUTH_DATA = 'SET_AUTH_DATA';
const SET_IS_AUTH   = 'SET_IS_AUTH';
const SET_MESSAGES  = 'SET_MESSAGES';

const NEED_IS_AUTH  = 'NEED_IS_AUTH';

let initialState = {
    id:             null,
    name:           '',
    email:          '',
    isAuth:         null,
    successMess:    null,
    errorMess:      null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:            
            return {...state,
                    ...action.authData,                    
                    successMess:    action.successMess,
                    errorMess:      action.errorMess,
            }
        case SET_IS_AUTH:            
            return {...state,                    
                    isAuth:         action.authData ? true : false,                    
            }            
        case SET_MESSAGES:            
            return {...state,                    
                    successMess:    action.successMess,
                    errorMess:      action.errorMess,
            }        
        default:
            return state;
    }
}

// Выполнить установку аутентификационных данных
let makeSetAuthData = dispatch => (authData, successMess = null, errorMess = null) => {
    dispatch(setAuthData(authData, successMess, errorMess));
    dispatch(setLoaded());    
}

// Выполнить действие action с параметрами data
let makeAuthAction = (action, needIsAuth = null) => data => {
    return (dispatch) => {      
        dispatch(setLoading());
        action(data).then(response => {
            let successMess = null;
            if(response.message) {
                successMess = response.message;
            }
            let errorMess = null;
            if(response.error && response.error.response.data) {
                errorMess = response.error.response.data;
            }
            makeSetAuthData(dispatch)(response.user, successMess, errorMess);            
            if(needIsAuth === NEED_IS_AUTH) {
                dispatch(setIsAuth(response.user));
            }
        });
    }
}

//ACTION CREATORS
export const setAuthData = (authData, successMess = null, errorMess = null) => ({type: SET_AUTH_DATA, authData, successMess, errorMess});
export const setIsAuth = (authData) => ({type: SET_IS_AUTH, authData});
export const setMesages = (successMess = null, errorMess = null) => ({type: SET_MESSAGES, successMess, errorMess});

//THUNK CREATORS
export const getAuthData = () => {
    return (dispatch) => {      
        dispatch(setLoading());
        authAPI.getAuthData().then(response => {            
            makeSetAuthData(dispatch)(response);            
            dispatch(setIsAuth(response));
        });
    }
};

export const logout = () => {
    return (dispatch) => {      
        dispatch(setLoading());
        authAPI.logout().then(response => {            
            window.location.reload();
        });
    }
};

export const login = (data) => {
    return makeAuthAction(authAPI.login, NEED_IS_AUTH)(data);    
};

export const register = (data) => {
    return makeAuthAction(authAPI.register)(data);    
};

export default authReducer;