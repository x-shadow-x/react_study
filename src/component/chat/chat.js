import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux.js'
import io from 'socket.io-client'
import { getChatId } from '../../util.js';
const socket = io('ws://localhost:9093');


@connect(
	state => state,
	{ getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			msg: []
		}
	}

	componentDidMount() {
		if(this.props.chat.chatMsg.length <= 0) {
			this.props.getMsgList();
			this.props.recvMsg();
		}
	}
	
	handleSubmit() {
		const orignal = this.props.user._id;
		const to = this.props.match.params.user;
		const text = this.state.text;
		this.props.sendMsg({ orignal, to, text });
		this.setState({ text: '' });
	}

	render() {
		const userId = this.props.match.params.user;
		const usersInfo = this.props.chat.usersInfo;
		const chatMsg = this.props.chat.chatMsg.filter(v => {
			return v.chat_id === getChatId(userId, this.props.user._id);
		});
		const emoji = '';
		if(!usersInfo[userId]) {
			return null;
		}
		return (
			<div id="chatPage">

				<NavBar mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => {
						this.props.history.goBack()
					}}
				>
					{usersInfo[userId].name}
				</NavBar>

				{chatMsg.map(v => {
					const avatar = require(`../avatar_selector/imgs/${usersInfo[v.from].avatar}.png`);
					return v.from === userId ? (
						<List key={v._id}>
							<List.Item
								thumb={avatar}
							>{v.content}</List.Item>
						</List>
					) : (
						<List key={v._id}>
							<List.Item 
								className="chat_me"
								extra={<img src={avatar} alt=""/>}
							>{v.content}</List.Item>
						</List>
					);
				})}
				<div className="stick_footer">
					<List>
						<InputItem
							placeholder="请输入"
							value={this.state.text}
							onChange={v => {
								this.setState({
									text: v
								});
							}}
							extra={
								<span onClick={() => {
									this.handleSubmit();
								}}>发送</span>
							}
						></InputItem>
					</List>
				</div>
			</div>
		);
	}
}

export default Chat;