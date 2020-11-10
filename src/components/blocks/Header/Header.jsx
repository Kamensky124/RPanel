import React from 'react';

import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Alert, Row, Col} from 'reactstrap';
import {logout} from '../../../redux/reducers/auth-reducer';
import StrapButton from '../../common/strap/StrapButton/StrapButton';
import StrapBreadcrumb from '../../common/strap/StrapBreadcrumb/StrapBreadcrumb';

const Header = (props) => { 
    return (
        <div>
            <Row>
                <Col lg="2"></Col>
                <Col lg="7">
                    <br />
                    <h3>Панель управления</h3>
                    <br />
                </Col>
                <Col lg="3">                
                    <Alert color="info">                   
                        <Row>
                            <Col lg="8">
                            Личный кабинет:<br />
                            <NavLink to="/cabinet" className="alert-link">                                
                                {props.name}
                            </NavLink>                                
                            </Col>
                            <Col lg="4">
                            <StrapButton color="primary"
                                 text="Выход"
                                 onClick={props.logout}/>
                            </Col>
                        </Row>
                    </Alert>                
                </Col>            
            </Row>
            <Row>
                <Col lg="2"></Col>
                <Col lg="10">
                    <StrapBreadcrumb />
                </Col>            
            </Row>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {name: state.authStore.name}
}

export default connect(mapStateToProps, {logout})(Header);