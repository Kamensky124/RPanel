import React, { useState } from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import style from './style.module.css';

const StrapTabs = (props) => {
    const [activeTab, setActiveTab] = useState(0);

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }    
    
    return (        
        <div>
            <Nav tabs>
                {props.tabs.map(
                    (tab, i) =>                         
                    <NavItem>
                        <NavLink onClick={() => {toggle(i)}}
                                 className={style.navLink + (activeTab === i ? ' active ' : '')} >
                            {tab.label}
                        </NavLink>
                    </NavItem>                    
                )}            
            </Nav>
            <TabContent activeTab={activeTab} className={style.tabContent} >
                {props.tabs.map(
                    (tab, i) =>
                    <TabPane tabId={i}>
                        {tab.content}
                    </TabPane>                
                )}  
            </TabContent>
        </div>                             
    );
}

export default StrapTabs;