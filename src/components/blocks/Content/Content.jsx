import React from 'react';

import {Route} from "react-router-dom";
import {Row, Col} from 'reactstrap';
import MainPage from '../../pages/MainPage/MainPage';
import CabinetPage from '../../pages/CabinetPage/CabinetPage';
import UsersList from '../../pages/UsersPage/UsersList';
import UserCard from '../../pages/UsersPage/UserCard';

const Content = (props) => {
    return (
        <div>
            <Route path="/" exact 
                   render={() => <MainPage />} />
            <Route path="/users" exact 
                   render={() => <UsersList />} />
            <Row>
                <Col lg="6">
                    <Route path="/users/:userId"
                           render={() => <UserCard />} />
                </Col>
            </Row>
            <Route path="/cabinet" exact 
                   render={() => <CabinetPage />} />
        </div>
    );
}

export default Content;