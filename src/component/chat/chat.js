import React from 'react'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux.js'
import io from 'socket.io-client'
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
		this.props.getMsgList();
		this.props.recvMsg();
	}
	handleSubmit() {
		const orignal = this.props.user._id;
		const to = this.props.match.params.user;
		const text = this.state.text;
		this.props.sendMsg({ orignal, to, text });
		this.setState({ text: '' });
	}
	render() {
		return (
			<div>
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