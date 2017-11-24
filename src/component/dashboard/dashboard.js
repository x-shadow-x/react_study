import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../nav_link_bar/nav_link_bar.js'
import Boss from '../boss/boss.js'
import Guy from '../guy/guy.js'
import User from '../user/user.js'

import './dashboard.css'

function Msg() {
	return <h2>消息首页</h2>
}

@connect(
	state => state
)
class Dashboard extends React.Component {

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