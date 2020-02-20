import React from 'react';
import { connect } from 'react-redux';
/*import { fetchUser } from "../actions";*/

class UserHeader extends React.Component {
    // Behövs inte med fetchPostsAndUsers-koden i actions
    /*componentDidMount() {
        this.props.fetchUser(this.props.userId);
    }*/

    render() {
        const { user } = this.props;
        //const user = this.props.users.find((user) => user.id === this.props.userId);

        if(!user) {
            return null;
        }

        return <div className="header">{user.name}</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return { user: state.users.find(user => user.id === ownProps.userId) };
}

//, { fetchUser } behövs inte med fetchPostsAndUsers action creatorn
export default connect(mapStateToProps)(UserHeader);