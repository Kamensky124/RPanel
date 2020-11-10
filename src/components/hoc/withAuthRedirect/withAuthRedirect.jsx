import React from 'react';
import {withRouter} from 'react-router';
import {Redirect} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";

const withAuthRedirect = (exceptPaths) => {
    return (Component) => {    
        let mapStateToProps = (state) => {
            return {isAuth: state.authStore.isAuth}
        }

        class HOComponent extends React.Component {        
            render() {                
                if(this.props.isAuth === false &&
                   !exceptPaths.includes(this.props.location.pathname)) {
                    return (
                        <div>
                            <Redirect to="/login" />
                            <Component {...this.props} />
                        </div>
                    );
                }
                else {
                    return <Component {...this.props} />
                }
            }
        }

        return compose(
            connect(mapStateToProps),
            withRouter
        )(HOComponent);
    }
}

export default withAuthRedirect;
