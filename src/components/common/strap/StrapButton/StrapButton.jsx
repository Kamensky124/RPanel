import React from 'react';
import {compose} from "redux";
import {Button} from 'reactstrap';
import withNavLink from '../../../hoc/withNavLink/withNavLink';

const StrapButton = (props) => {    
    return (        
        <Button 
            className   =   {props.className} 
            type        =   {props.type ? props.type : "button"} 
            color       =   {props.color ? props.color : "secondary"}
            onClick     =   {() => {props.onClick && props.onClick()}}>
            {props.text}
        </Button>                              
    );
}

export default compose(withNavLink)(StrapButton);