const IS_LOADED = 'IS_LOADED';
const IS_LOADING = 'IS_LOADING';

let initialState = {
    loadingComplete: true    
}

const loadReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADED:
            return {...state,
                loadingComplete: true
            }
        case IS_LOADING:
            return {...state,
                loadingComplete: false
            }        
        default:
            return state;
    }
}

export const setLoaded = () => ({type: IS_LOADED});
export const setLoading = () => ({type: IS_LOADING});

export default loadReducer;