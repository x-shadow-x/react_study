import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../nav_link_bar/nav_link_bar.js'
import Boss from '../boss/boss.js'
import Guy from '../guy/guy.js'
import User from '../user/user.js'
import { getMsgList, recvMsg } from '../../redux/chat.redux.js'
import Msg from '../msg/msg.js'

import './dashboard.css'

@connect(
	state => state,
	{ getMsgList, recvMsg }
)
class Dashboard extends React.Component {

	componentDidMount() {
		if(!this.props.chat.chatMsg.length) {
			// 这里做一个判断逻辑~如果不加判断~每次加载dashboard页面都通过一个异步的action去后台要数据~
			// 否则每次action都将被累积~直到按发送~后台返回数据的时候触发前端在异步action中监听的recvmsg~
			// 此时所有积累的action都会dispatch导致发送的信息被重复追加到消息列表末尾~具体看chat.redux.js中的recvMsg action函数
			this.props.getMsgList();
			this.props.recvMsg();
		}
	}

	render() {

		const { pathname } = this.props.location;
		const user = this.props.user;

		const navList = [{
				path: '/boss',
				text: 'guy',
				icon: 'boss',
				title: 'guy list',
				component: Boss,
				hide: user.type === 'guy'
			},{
				path: '/guy',
				text: 'boss',
				icon: 'job',
				title: 'boss list',
				component: Guy,
				hide: user.type === 'boss'
			},{
				path: '/msg',
				text: 'msg',
				icon: 'msg',
				title: 'msg list',
				component: Msg
			},{
				path: '/user',
				text: 'user',
				icon: 'user',
				title: 'user',
				component: User
			}
		];

		return (
			<div>
				<div className="fixd_top">
					<NavBar mode='dard'>
						{navList.find(v => {
							return v.path === pathname;
						}).title}
					</NavBar>
				</div>
				
				<div className="page_contain">
					<Switch>
						{navList.map(v =>  {
							return <Route key={v.path} path={v.path} component={v.component}></Route>
						})}
					</Switch>
				</div>
				<div className="nav_link_bar">
					<NavLinkBar data={navList}>footer</NavLinkBar>
				</div>
				
			</div>
		);
	}
}

export default Dashboard