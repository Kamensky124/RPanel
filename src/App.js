import React, {useEffect} from 'react';

import {connect} from 'react-redux';
import {Container, Row, Col} from 'reactstrap';
import {getAuthData} from './redux/reducers/auth-reducer';
import withAuthRedirect from './components/hoc/withAuthRedirect/withAuthRedirect';
import {Route} from "react-router-dom";
import {compose} from "redux";

import LoginPage from './components/pages/AuthPage/LoginPage';
import RegisterPage from './components/pages/AuthPage/RegisterPage';
import StrapSpinner from './components/common/strap/StrapSpinner/StrapSpinner';

import Header from './components/blocks/Header/Header';
import LeftMenu from './components/blocks/LeftMenu/LeftMenu';
import Content from './components/blocks/Content/Content';

function App(props) {
    
    useEffect(() => {    
        props.getAuthData();
    });
    
    return (
            <div>                
                <StrapSpinner color="primary" />
                {props.isAuth
                &&  <Container fluid={true}>
                        <Header />    
                        <Row>
                            <Col lg="2"><LeftMenu /></Col>
                            <Col lg="10"><Content /></Col>
                        </Row>
                    </Container>
                }
                <Route path="/login"
                       render={() => <LoginPage />}
                />                
                <Route path="/registrate"
                       render={() => <RegisterPage />}
                />
            </div>
    );
}

let mapStateToProps = (state) => {    
    return {isAuth: state.authStore.isAuth}
}

export default compose(   
    connect(mapStateToProps, {getAuthData}),
    withAuthRedirect(['/registrate'])
)(App);