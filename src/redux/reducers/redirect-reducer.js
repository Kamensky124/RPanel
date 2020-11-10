const START_REDIRECT = 'START_REDIRECT';
const STOP_REDIRECT = 'STOP_REDIRECT';

let initialState = {
    isRedirecting: false    
}

const redirectReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_REDIRECT:            
            return {...state,
                isRedirecting: true
            }
        case STOP_REDIRECT:
            return {...state,
                isRedirecting: false
            }        
        default:
            return state;
    }
}

const startRedirect = () => ({type: START_REDIRECT});
const stopRedirect = () => ({type: STOP_REDIRECT});

export const makeRedirect = () => {    
    return (dispatch) => {
        dispatch(startRedirect());
        dispatch(stopRedirect());
    }
};

export default redirectReducer;