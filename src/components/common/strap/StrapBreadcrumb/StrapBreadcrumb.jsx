import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {withBreadcrumbs} from '../../../hoc/withBreadcrumbs/withBreadcrumbs';

const UserBreadcrumb = ({ match }) =>
  <span>Пользователь #{match.params.userId}</span>; // use match param userId to fetch/display user name

const routes = [
  { path: '/',              breadcrumb: 'Главная' },
  { path: '/cabinet',         breadcrumb: 'Личный кабинет' },
  { path: '/registrate',    breadcrumb: 'Регистрация' },
  { path: '/users',         breadcrumb: 'Пользователи' },
  { path: '/users/:userId', breadcrumb: UserBreadcrumb},  
];

const StrapBreadcrumb = ({ breadcrumbs }) => {    
    return (
        <Breadcrumb tag="nav" listTag="div">
            {breadcrumbs.map(({ breadcrumb, path, match }, i, arr) => {                
                let lastItem = (i === arr.length - 1);
                let breadContent = lastItem
                ? <>{breadcrumb}</>
                : <NavLink to={match.url}>
                    {breadcrumb}
                  </NavLink>;
                    
                return (
                    <BreadcrumbItem key={'breadcrumb_'+i} tag="span">                        
                        <span key={path}>
                            {breadContent}
                        </span>                        
                    </BreadcrumbItem>                
                )
            })}
        </Breadcrumb>
    );
};

export default withBreadcrumbs(routes)(StrapBreadcrumb);