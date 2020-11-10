import React from 'react';
import StrapTabs from '../../common/strap/StrapTabs/StrapTabs';
import Tab1 from './tabs/Tab1';
import Tab2 from './tabs/Tab2';

const CabinetPage = (props) => {   
    
    let tabs = [
        {label: 'Отчет', content: <Tab1 />},
        {label: 'Карта Пользователей', content: <Tab2 />},
    ];
    
    return (                
        <StrapTabs tabs={tabs} />
    );
}

export default CabinetPage;