import React from 'react';
import {Alert, Card, Button, CardTitle, CardText} from 'reactstrap';
import {Formik, Field, Form} from "formik";
import style from './style.module.css';

/*
 * state props: 
 * firstItemId  -   айди первой строки таблицы(остальные увеличиваются по инкременту) 
 * fields       -   поля таблицы(объект типа {"поле": "заголовок", ...})
 * items        -   строки таблицы(массив объектов)
 */

const StrapCard = (props) => {      
    let cardContent = [];
    
    const initialValues = props.data;
    
    let getcardContent = (errors, touched) => {
        cardContent = [];    
        for(var key in props.fields) {       
                cardContent.push(
                    <div className={style.cardFieldBlock} key={'cardblock_'+key}>
                        <CardTitle className={style.cardTitle}>{props.fields[key].title}</CardTitle>
                        {
                            errors[key] && touched[key] ? (
                                <Alert color="warning">{errors[key]}</Alert>
                            ) : null
                        }
                        {
                            props.editMode
                            ? <Field name={key} className="form-control" type="text" />
                            : <CardText>{props.data[key]}</CardText>
                        }

                    </div>
                );            
            }    
        return cardContent;
    }
        
    return (
        <div>            
            {props.data.id !== null &&
                <Formik
                    initialValues={initialValues}
                    validationSchema={props.signupSchema}
                    onSubmit={values => {                          
                          props.callBack(values);
                        }
                    }
                >   
                {({ errors, touched }) => (
                    <Form>          
                      <Card body outline color="primary">                  
                        {getcardContent(errors, touched)}                        
                        {
                            props.editMode
                            &&                            
                            <Button className={style.cardButton} type="submit" color="secondary">
                                {props.buttonText}
                            </Button>
                        }
                      </Card>          
                    </Form>
                )}
                </Formik>
            }
        </div>
    );
}

export default StrapCard;