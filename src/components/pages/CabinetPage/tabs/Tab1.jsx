import React from 'react';

import {connect} from 'react-redux';
import {getReport} from '../../../../redux/reducers/report-reducer';
import {Alert, Container, Row, Col} from 'reactstrap';
import excelIcon from "../../../../assets/icons/file-ruled.svg";
import style from '../style.module.css';

const Tab1 = (props) => {        
    return (
        <div>
            <Alert color="light">            
                <h5>Скачать отчет по пользователям</h5>
                <hr />
                <Container fluid={true}>
                    <Row>                    
                        <Col lg="1" >
                            <img onClick={() => props.getReport()}
                             className={`${style.gIcon} ${style.big}`} src={excelIcon} alt="" />
                        </Col>                    
                    </Row>
                </Container>            
            </Alert>
            <Alert color="info">            
                <h5>Количество пользователей в отчете</h5>
                <hr />
                <Container fluid={true}>
                    <Row>                    
                        <Col lg="1" >
                            {props.total}
                        </Col>                    
                    </Row>
                </Container>            
            </Alert>
        </div>      
    );
}

let mapStateToProps = (state) => {
    return {
        total:          state.usersStore.total,
    }
}

export default connect(mapStateToProps, {getReport})(Tab1);