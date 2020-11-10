import {usersAPI} from '../../api/endpoints/usersAPI';
import {setLoading, setLoaded} from './load-reducer';
import {setOpenModal, setCloseModal, setYesAction} from './modal-reducer';

const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_PER_PAGE = 'SET_PER_PAGE';
const SET_TOTAL = 'SET_TOTAL';
const SET_SEARCH_STRING = 'SET_SEARCH_STRING';

let initialState = {
    users:          null,
    current_page:   null,
    per_page:       null,    
    total:          null,
    search_string:  '',
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {...state,
                current_page: action.currentPage
            }
        case SET_PER_PAGE:
            return {...state,
                per_page: action.perPage
            }
        case SET_TOTAL:
            return {...state,
                total: action.total
            }        
        case SET_SEARCH_STRING:
            return {...state,
                search_string: action.searchString
            }            
        default:
            return state;
    }
}

export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setPerPage = (perPage) => ({type: SET_PER_PAGE, perPage});
export const setTotal = (total) => ({type: SET_TOTAL, total});
export const setSearchString = (searchString) => ({type: SET_SEARCH_STRING, searchString});

export const deleteUser = (userId, currentPage = null) => {    
    return (dispatch) => {
        dispatch(
            setYesAction(() => {            
                dispatch(setCloseModal());
                dispatch(setLoading());

                usersAPI.deleteUser(userId).then(response => {
                    if(response === 204) {
                        getUsers(currentPage)(dispatch);                
                    }
                });                    
            })
        );
        dispatch(setOpenModal());
    }
};

export const getUsers = (page = 1) => {    
    return(dispatch) => {        
        dispatch(setLoading());
        
        usersAPI.getUsers(page).then(response => {                        
            dispatch(setCurrentPage(response.current_page));
            dispatch(setPerPage(response.per_page));
            dispatch(setTotal(response.total));            
            dispatch(setUsers(response.data));
            
            dispatch(setLoaded());
        });
    }
};

export const searchUsers = (page = 1, login = '') => {    
    return(dispatch) => {        
        dispatch(setLoading());
        
        usersAPI.searchUsers(page, login).then(response => {                        
            dispatch(setSearchString(login));
            dispatch(setCurrentPage(response.current_page));
            dispatch(setPerPage(response.per_page));
            dispatch(setTotal(response.total));            
            dispatch(setUsers(response.data));
            
            dispatch(setLoaded());
        });
    }
};

export default usersReducer;