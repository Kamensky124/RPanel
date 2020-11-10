import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'; 
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';

const StrapNav = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
            <Navbar color="faded" light>
                <NavbarBrand className="mr-auto">Меню</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        {
                            props.navItems.map(
                                (item, i) => 
                                <NavItem key={'navitem_'+i}>
                                    <NavLink to={item.link} className="nav-link">{item.title}</NavLink>
                                </NavItem>
                            )
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default StrapNav;