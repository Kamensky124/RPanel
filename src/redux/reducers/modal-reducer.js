const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const SET_YES_ACTION = 'SET_YES_ACTION';

let initialState = {
    showModal: false,
    yesAction: {}
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:            
            return {...state,
                showModal: true
            }
        case CLOSE_MODAL:            
            return {...state,
                showModal: false
            }
        case SET_YES_ACTION:            
            return {...state,
                yesAction: action.yesAction
            }        
        default:
            return state;
    }
}

export const setOpenModal = () => ({type: OPEN_MODAL});
export const setCloseModal = () => ({type: CLOSE_MODAL});
export const setYesAction = (yesAction) => ({type: SET_YES_ACTION, yesAction});

export default modalReducer;