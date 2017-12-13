import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
	state => state
)

class Msg extends React.Component {
	getLast(arr) {
		return arr[arr.length - 1];
	}

	render() {
		const msgGroup = {};
		const userId = this.props.user._id;
		const usersInfo = this.props.chat.usersInfo;

		this.props.chat.chatMsg.forEach(v => {
			msgGroup[v.chat_id] = msgGroup[v.chat_id] || [];
			msgGroup[v.chat_id].push(v);
		});

		const chatList = Object.values(msgGroup).sort((v1, v2) => {
			const lastV1 = this.getLast(v1);
			const lastV2 = this.getLast(v2);

			return lastV2.create_time - lastV1.create_time;
		});

		return (
			<div>
				
					{chatList.map(v => {
						const lastItem = this.getLast(v);
						const targetId = lastItem.from === userId ? lastItem.to : lastItem.from;
						const unreadNum = v.filter(v => {
							return !v.read && v.to === userId
						}).length;

						return (
							<List key={lastItem._id}>
								<List.Item
									extra={<Badge text={unreadNum}></Badge>}
									thumb={usersInfo[targetId] && require(`../avatar_selector/imgs/${usersInfo[targetId].avatar}.png`)}
									arrow="horizontal"
									onClick={() => {
										this.props.history.push(`/chat/${targetId}`)
									}}
								>
									{lastItem.content}
									<List.Item.Brief>{usersInfo[targetId] && usersInfo[targetId].name || ''}</List.Item.Brief>
								</List.Item>
							</List>
						);
					})}
					
				
			</div>
		);
	}
}

export default Msg