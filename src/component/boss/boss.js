import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux.js'
import UserInfo from '../user_info/user_info.js'


@connect(
	state => state.chatuser,
	{ getUserList }
)
class Boss extends React.Component {

	componentDidMount() {
		this.props.getUserList('guy');
	}

	render() {
		return <UserInfo userList={this.props.userList}></UserInfo>;
	}
}

export default Boss