import React from 'react';

import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import {NavLink} from 'react-router-dom';
import {Alert} from 'reactstrap';
import {login, setMesages} from '../../../redux/reducers/auth-reducer';
import AuthPage from '../../pages/AuthPage/common/AuthPage';
import {loginFields} from '../../../orm/orm';

const LoginPage = (props) => {    
    if(props.isAuth === true || props.isAuth === null) {
        return <Redirect to="/" />;
    }
    if(props.isAuth === false) {
        let bottomContent =
            <div>
                <br/>
                <Alert color="info">
                    Еще не с нами? - &nbsp;
                    <NavLink to="/registrate" onClick={() => props.setMesages()}>
                        зарегистрируйтесь
                    </NavLink>
                </Alert>
            </div>;
        return (         
            <AuthPage modalHeader="Авторизация"
                      submitText="Войти"
                      fields={loginFields}
                      errorMess={props.errorMess}
                      authMethod={props.login}
                      showModal={true}
                      bottomContent={bottomContent} />            
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth:     state.authStore.isAuth,
        errorMess:  state.authStore.errorMess,
    }
}

export default connect(mapStateToProps, {login, setMesages})(LoginPage);