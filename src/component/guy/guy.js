import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux.js'
import UserInfo from '../user_info/user_info.js'


@connect(
	state => state.chatuser,
	{ getUserList }
)
class Guy extends React.Component {

	componentDidMount() {
		this.props.getUserList('boss');
	}

	render() {
		return <UserInfo userList={this.props.userList}></UserInfo>;
	}
}

export default Guy