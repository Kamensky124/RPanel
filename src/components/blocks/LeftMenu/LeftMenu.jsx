import React from 'react';

import StrapNav from '../../common/strap/StrapNav/StrapNav';

const LeftMenu = (props) => {
    let navItems = [
        {title: 'Главная',      link: '/'},
        {title: 'Пользователи', link: '/users'},
        {title: 'Личный кабинет', link: '/cabinet'},
        {title: 'Регистрация',  link: '/registrate'},
    ];
    
    return (                
        <StrapNav navItems={navItems} />
    );
}

export default LeftMenu;