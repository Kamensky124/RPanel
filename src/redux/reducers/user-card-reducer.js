import {usersAPI} from '../../api/endpoints/usersAPI';
import {setLoading, setLoaded} from './load-reducer';
import {makeRedirect} from './redirect-reducer';

const SET_USER_CARD     = 'SET_USER_CARD';
const CLEAR_USER_CARD   = 'CLEAR_USER_CARD';

let initialState = {
    id:         null,
    login:      '',
    password:   '',
    email:      '',
    latitude:   '',
    longitude:  '',
    created_at: '',
    updated_at: ''
}

const userCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_CARD:            
            return {...state, ...action.user}        
        case CLEAR_USER_CARD:            
            return {...state, ...initialState}        
        default:
            return state;
    }
}

// Выполнить установку объекта пользователя user
let makeSetUser = dispatch => user => {
    dispatch(setUserCard(user));            
    dispatch(setLoaded());    
}

// Выполнить действие action с карточкой пользователя user
let makeCardAction = action => user => {
    return (dispatch) => {        
        dispatch(setLoading());
        
        action(user).then(response => {                                    
            makeSetUser(user);
            dispatch(makeRedirect());
        });
    }
}

//ACTION CREATORS
export const setUserCard = (user) => ({type: SET_USER_CARD, user});
export const clearUserCard = () => ({type: CLEAR_USER_CARD});

//THUNK CREATORS
export const getUserCard = (userId = 1) => {
    return (dispatch) => {
        dispatch(setLoading());
        
        if(userId === 'new') { makeSetUser(dispatch)({id: 'new'}); }
        else {
            usersAPI.getUserCard(userId).then(user => {                                    
                makeSetUser(dispatch)(user);
            });
        }
    }
};

export const updateUserCard = (user) => {
    return makeCardAction(usersAPI.updateUserCard)(user);
};

export const createUserCard = (user) => {
    return makeCardAction(usersAPI.createUserCard)(user);    
};

export default userCardReducer;