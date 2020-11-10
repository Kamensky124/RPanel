import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Alert} from 'reactstrap';

const MainPage = (props) => { 
    return (                
        <Alert color="info">
            <h4 className="alert-heading">Добро пожаловать в панель управления, {props.name}!</h4>
            <p>
              Управление пользователями <NavLink to="/users" className="alert-link">здесь</NavLink>
            </p>
            <hr />
            <p className="mb-0">
              Либо воспользуйтесь левым вертикальным меню.
            </p>
      </Alert>
    );
}

let mapStateToProps = (state) => {
    return {name: state.authStore.name}
}

export default connect(mapStateToProps)(MainPage);