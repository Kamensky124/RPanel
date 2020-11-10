import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {getUserCard, updateUserCard, createUserCard, 
        setUserCard, clearUserCard} from '../../../redux/reducers/user-card-reducer';
import {userCardFields} from '../../../orm/orm';
import {userCardSchema} from '../../../orm/schema';
import StrapCard from '../../common/strap/StrapCard/StrapCard';
import RegularRedirect from '../../common/regular/RegularRedirect/RegularRedirect';

class UserCard extends React.Component {
    componentDidMount() {        
        this.userId = this.props.match.params.userId;
        this.props.getUserCard(this.userId);
    }
    
    componentWillUnmount() {        
        this.props.clearUserCard();        
    }
    
    render() {                
        return (
            <div>
                <RegularRedirect redirectTo="/users/" />
                <StrapCard data={this.props.data}
                           fields={userCardFields}
                           signupSchema={userCardSchema}
                           callBack={
                                this.userId === 'new'
                                ? this.props.createUserCard
                                : this.props.updateUserCard                            
                           }
                           buttonText={
                                this.userId === 'new'
                                ? 'Создать'
                                : 'Обновить'
                           }
                           editMode={true} />
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        data: {
            id: state.userCardStore.id,
            login: state.userCardStore.login,
            password: state.userCardStore.password,
            email: state.userCardStore.email,
            latitude: state.userCardStore.latitude,
            longitude: state.userCardStore.longitude,
            created_at: state.userCardStore.created_at,
            updated_at: state.userCardStore.updated_at
        }
    }
}

export default compose(
    connect(mapStateToProps, 
        {getUserCard, updateUserCard, createUserCard, 
         setUserCard, clearUserCard}),
    withRouter
)(UserCard);