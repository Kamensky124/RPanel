import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {getUsers} from '../../../../redux/reducers/users-reducer';
import {withRouter} from 'react-router-dom';

import StrapPagination from '../../../common/strap/StrapPagination/StrapPagination';
import ExtYMaps from '../../../extensions/ExtYMaps/ExtYMaps';

class Tab2 extends React.Component {
    // Компонент смонтирован
    componentDidMount() {
        // Получаем пользователей
        this.props.getUsers();
    }
    // Изменена текущая страница пагинации
    currentPageChange = (pageNumber) => {        
        // Получаем пользователей
        this.props.getUsers(pageNumber);
    }    
    // Клик по метке на карте
    onPlacemarkClick = (id) => {
        return () => this.props.history.push('/users/'+id);
    }
    // Получить координаты всех меток на карте
    getPlacemarks = () => {
        let self = this;
        let placemarks = [];        
        if(this.props.users) {
            this.props.users.forEach(function(user, i, arr) {                
                placemarks.push(
                    {geometry: [user.latitude, user.longitude], 
                     hintContent: `Пользователь ${user.id} (${user.login})`, 
                     balloonContent: `Контент ${user.id}`, 
                     onClick: self.onPlacemarkClick(user.id) }
                );
            });
        }
        return placemarks;
    }
    
    render() {        
        return (
            <div>
                <StrapPagination currentPage={this.props.currentPage} 
                     showPagesCount={7} 
                     itemsPerPage={this.props.itemsPerPage}
                     itemsCount={this.props.itemsCount}
                     currentPageChange={this.currentPageChange} />                
                <ExtYMaps center={[56.008, 92.858]} 
                          zoom={2} height={400} width={'100%'}
                          placemarks={this.getPlacemarks()} />            
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        users:          state.usersStore.users,
        currentPage:    state.usersStore.current_page,
        itemsPerPage:   state.usersStore.per_page,
        itemsCount:     state.usersStore.total,
    }
}

export default compose(
    connect(mapStateToProps, {getUsers}),
    withRouter
)(Tab2);