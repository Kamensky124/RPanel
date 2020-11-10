import React from 'react';
import {connect} from 'react-redux';
import {getUsers, searchUsers, deleteUser} from '../../../redux/reducers/users-reducer';
import {setCloseModal} from '../../../redux/reducers/modal-reducer';
import {usersFields} from '../../../orm/orm';

import {Container, Row, Col} from 'reactstrap';
import StrapTable from '../../common/strap/StrapTable/StrapTable';
import StrapPagination from '../../common/strap/StrapPagination/StrapPagination';
import StrapInput from '../../common/strap/StrapInput/StrapInput';
import StrapModal from '../../common/strap/StrapModal/StrapModal';
import StrapButton from '../../common/strap/StrapButton/StrapButton';

import style from './style.module.css';
import delIcon from "../../../assets/icons/x-square-fill.svg";
import editIcon from "../../../assets/icons/file-text-fill.svg";
import emptyIcon from "../../../assets/icons/lock-fill.svg";

class UsersList extends React.Component {
    // Компонент смонтирован
    componentDidMount() {        
        // Получаем пользователей
        (this.props.searchString.length)
        ? this.props.searchUsers(1, this.props.searchString)
        : this.props.getUsers();                             
    }
    // Изменена текущая страница пагинации
    currentPageChange = (pageNumber) => {        
        // Получаем пользователей
        (this.props.searchString.length)
        ? this.props.searchUsers(pageNumber, this.props.searchString)
        : this.props.getUsers(pageNumber);
    }
    // Изменена строка поиска
    searchStringChange = (pageNumber) => {              
        return (searchString) => {                
            // Получаем пользователей        
            this.props.searchUsers(pageNumber, searchString);
        }
    }
    
    // Получить айди первого элемента на странице
    getFirstItemId = () => {
        return (this.props.currentPage - 1) * this.props.itemsPerPage;
    }
    // Получить новый номер текущей страницы(пересчет с учетом параметров пагинации)
    getNewCurrentPage = () => {
        return (   
            this.props.currentPage !== 1 
            &&
            (this.props.itemsCount - 1) / this.props.itemsPerPage
            ===
            this.props.currentPage - 1
        )
        ? this.props.currentPage - 1
        : this.props.currentPage;
    }
            
    // Получить кнопки модального окна удаления элементов
    getModalButtons = () => 
        [
            {color:'danger',    text: 'Да',     onClick: this.props.yesAction},
            {color:'secondary', text: 'Нет',    onClick: this.props.setCloseModal}
        ];
    // Получить массив кастомных элементов таблицы
    getCustomItems = () => 
        [
            {position:  0, title:   'Ред.',
             content:   <img className={style.gIcon} src={editIcon} alt="" />,
             navLink:   {path: '/users/'}
            },
            {position:  5, title:   'Уд.',
             content:   <img className={style.gIcon} src={delIcon} alt="" />,
             callBack:  (userId) => {
                this.props.deleteUser(userId, this.getNewCurrentPage());                    
             }                                
            }
        ];
    // Получить разметку пустой страницы таблицы
    getEmptyPage = () => 
        <Container fluid={true} className={style.emptyPage}>
            <Row>                    
                <Col lg="2" >
                    <img className={`${style.gIcon} ${style.big}`} src={emptyIcon} alt="" />
                </Col>
                <Col lg="10"><h5>Ничего не найдено!</h5></Col>
            </Row>
        </Container>        
    
    render() {                       
        return (                
            <div className={style.usersList}>                                    
                <StrapModal modalHeader="Удаление"
                            modalContent="Действительно хотите удалить?"                            
                            showModal={this.props.showModal}                         
                            modalButtons={this.getModalButtons()} />
                <Container fluid={true}>
                    <Row>
                        <Col lg={{size: '1', offset: 0}} >
                            <StrapButton color="dark"
                                         text="+"
                                         link="/users/new/"/>
                        </Col>                                             
                        <Col lg={{size: '8', offset: 0}} >                            
                            <StrapPagination currentPage={this.props.currentPage} 
                                             showPagesCount={7} 
                                             itemsPerPage={this.props.itemsPerPage}
                                             itemsCount={this.props.itemsCount}
                                             currentPageChange={this.currentPageChange} />
                        </Col>
                        <Col lg={{size: '3', offset: 0}} >
                            <StrapInput 
                                onChange={this.searchStringChange(1)}
                                placeholder = "Поиск по логину"/>                            
                        </Col> 
                    </Row>
                </Container>
                <StrapTable dark={false}
                            hover={true}
                            responsive={true}
                            striped={true}
                            firstItemId={this.getFirstItemId()}
                            fields={usersFields}
                            items={this.props.users}
                            customItems={this.getCustomItems()}
                            emptyPage={this.getEmptyPage()} />                             
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
        searchString:   state.usersStore.search_string,
        showModal:      state.modalStore.showModal,
        yesAction:      state.modalStore.yesAction
    }
}

export default connect(mapStateToProps, 
    {getUsers, searchUsers, deleteUser, setCloseModal}
)(UsersList);