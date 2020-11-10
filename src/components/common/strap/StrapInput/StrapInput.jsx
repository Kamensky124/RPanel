import React from 'react';
import {Input} from 'reactstrap';

const StrapInput = (props) => {    
    return (        
        <Input 
            className       =   {props.className}
            placeholder     =   {props.placeholder}
            onChange        =   {(e) => {
                props.onChange && props.onChange(e.target.value)
            }}
        />                    
    );
}

export default StrapInput;