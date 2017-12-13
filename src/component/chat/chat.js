import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux.js'
import { getChatId } from '../../util.js';
import './chat.css'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093');


@connect(
	state => state,
	{ getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			msg: [],
			showEmoji: false
		}
	}

	componentDidMount() {
		if(this.props.chat.chatMsg.length <= 0) {
			this.props.getMsgList();
			this.props.recvMsg();
		}
	}

	componentWillUnmount() {
		//离开当前路由组件就会unmount
		const to = this.props.match.params.user;
		this.props.readMsg(to);
	}

	fixCarousel() {
		setTimeout(() => {
			window.dispatchEvent(new Event('resize'))
		}, 0);
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
		const emoji = this.props.chat.emojiList.map((v) => {
			return {
				icon: require(`./imgs/emoji/${v}`)
			}
		});
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
								<div>
									<img
										src={require('./imgs/emoji/face-savouring-delicious-food_1f60b.png')}
										alt="emoji_btn" className="emoji_btn"
										onClick={() => {
											this.setState({
												showEmoji: !this.state.showEmoji
											});
											this.fixCarousel();
										}} />
									<span onClick={() => this.handleSubmit()} className="send_btn">发送</span>
								</div>
							}
						></InputItem>
					</List>
					{this.state.showEmoji ? 
						<Grid
							data={emoji}
							columnNum={7}
							carouselMaxRow={3}
							isCarousel={true}
							onClick={el => {
								this.setState({
									text: this.state.text + '<span>123</span>'
								});
							}}
						></Grid> : null}
				</div>
			</div>
		);
	}
}

export default Chat;