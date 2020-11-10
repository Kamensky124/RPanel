import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const RegularRedirect = (props) => {    
    return (
        <div>
            {
                props.isRedirecting === true 
                && 
                <Redirect to={props.redirectTo} />
            }
        </div>                    
    );
}

let mapStateToProps = (state) => {
    return {
        isRedirecting: state.redirectStore.isRedirecting        
    }
}

export default connect(mapStateToProps)(RegularRedirect);
