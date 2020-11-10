import React from 'react';
import {connect} from 'react-redux';
import {Spinner} from 'reactstrap';
import style from './style.module.css';


/*
 * state props:
 * type     -   тип спиннера
 * color    -   цвет спиннера
 */

const StrapSpinner = (props) => {   
    
    return (       
        <div>
            {
                props.loadingComplete === false 
                && 
                <div className={style.spinnerWrapper}>
                    <Spinner type={props.type} color={props.color} />
                </div>
            }
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        loadingComplete: state.loadStore.loadingComplete        
    }
}

export default connect(mapStateToProps)(StrapSpinner);
