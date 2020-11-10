import React, {useState} from 'react';

import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import {Button} from 'reactstrap';
import {register, setMesages} from '../../../redux/reducers/auth-reducer';
import RegularRedirect from '../../common/regular/RegularRedirect/RegularRedirect';
import style from './style.module.css';
import AuthPage from '../../pages/AuthPage/common/AuthPage';
import {registerFields} from '../../../orm/orm';

const RegisterPage = (props) => {   
    let [showModal, setModal] = useState(true);
    
    if(!showModal) {            
        return <Redirect to="/login" />;
    }
    else {
        let bottomContent =
            <Button className={style.cardButton} type="button" color="secondary"
                    onClick={() => {props.setMesages(); setModal(false);}}>
                Отмена
            </Button>;    
        return (
            <div>
                <RegularRedirect redirectTo="/" />
                <AuthPage modalHeader="Регистрация"
                          submitText="Зарегистрироваться"
                          fields={registerFields}
                          successMess={props.successMess}
                          errorMess={props.errorMess}
                          authMethod={props.register}
                          showModal={showModal}
                          bottomContent={bottomContent} />
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        successMess:    state.authStore.successMess,            
        errorMess:      state.authStore.errorMess,        
    }
}

export default connect(mapStateToProps, {register, setMesages})(RegisterPage);