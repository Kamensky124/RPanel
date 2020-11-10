import React from 'react';

import {CardTitle, Button, Alert} from 'reactstrap';
import {Formik, Field, Form} from "formik";
import StrapModal from '../../../common/strap/StrapModal/StrapModal';
import style from '../style.module.css';

const AuthPage = (props) => {    
    // Контент ошибок
    let errorsContent = [];
    if(props.errorMess) {
        for(let key in props.errorMess) {
            if(Array.isArray(props.errorMess[key])) {         
                props.errorMess[key].forEach(function(error) {
                    errorsContent.push(error);
                });
             }
             else { errorsContent.push(props.errorMess[key]); }
        }
    }
    
    // Контент полей формы
    let fieldsContent = [];    
    for(let key in props.fields) {       
        fieldsContent.push(
            <div>
                <CardTitle className={style.cardTitle}>{props.fields[key].title}</CardTitle>
                <Field name={key} className="form-control" type={props.fields[key].type} />
            </div>
        );            
    }             
    
    // Контент модального окна
    let modalContent = 
        <Formik onSubmit={values => {props.authMethod(values)}} initialValues= {{}}>            
            <Form className={style.loginForm}>
                {props.successMess &&
                    <Alert color="success">{props.successMess}</Alert>
                }            
                {props.errorMess &&
                    <Alert color="warning">
                        <b>{props.errorsHeader}</b>
                        <ul>{errorsContent.map(error => <li>{error}</li>)}</ul>
                    </Alert>
                }            
                
                {fieldsContent}
                
                <Button className={style.cardButton} type="submit" color="info">
                    {props.submitText}
                </Button>
                
                {props.bottomContent}
            </Form>            
        </Formik>;
    
    return (                        
        <StrapModal modalHeader={props.modalHeader}
                    modalContent={modalContent}
                    showModal={props.showModal} />            
    );
}

export default AuthPage;