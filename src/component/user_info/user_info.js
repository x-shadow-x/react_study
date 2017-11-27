/**
 * boss和guy页列表项组件
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserInfo extends React.Component {
	static propTypes = {
		userList: PropTypes.array.isRequired
	}

	handleClick(v) {
		console.log(this.props.history);
		this.props.history.push(`/chat/${v.user}`);
	}

	render() {
		return (
			<WingBlank>
				{this.props.userList.map(v => {
					return (
						v.avatar ? 
							<Card key={v._id} onClick={() => {
								this.handleClick(v)
							}}>
								<Card.Header
									title={v.user}
									thumb={require(`../avatar_selector/imgs/${v.avatar}.png`)}
									thumbStyle={{
										width: '24px',
										height: '24px'
									}}
									extra={<span>{v.title}</span>}

								></Card.Header>
								<Card.Body>
									{v.type === 'boss' ? <div>公司：{v.company}</div> : null}
									{v.desc.split('\n').map(descItem => {
										return <p key={descItem}>{descItem}</p>
									})}
									{v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
								</Card.Body>
							</Card> : null);
					
				})}
			</WingBlank>
		);
	}
}

export default UserInfo