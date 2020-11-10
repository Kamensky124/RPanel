import React from 'react';
import {NavLink} from "react-router-dom";

const withNavLink = (Component) => {
    
    class HOComponent extends React.Component {
        
        constructor(props) {
            super(props);
            
            this.componentContent = <Component {...this.props} />;
                        
            this.hoContent = this.props.link
            ? <NavLink to={this.props.link}>{this.componentContent}</NavLink>
            : this.componentContent;
        }
        
        render() {            
            return (<>{this.hoContent}</>)
        }
    }
    
    return HOComponent;
}

export default withNavLink;
