import {reportAPI} from '../../api/endpoints/reportAPI';
import {setLoading, setLoaded} from './load-reducer';

let initialState = {}

const reportReducer = (state = initialState, action) => {
    switch(action.type) {   
        default:
            return state;
    }
}


export const getReport = (type = 'customers') => {    
    return(dispatch) => {        
        dispatch(setLoading());
        
        reportAPI.getReport(type).then(response => {            
            dispatch(setLoaded());
        });
    }
};

export default reportReducer;