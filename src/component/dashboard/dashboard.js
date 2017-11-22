import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'

function Boss() {
	return <h2>Boss首页</h2>
}

function Guy() {
	return <h2>求职首页</h2>
}

function Msg() {
	return <h2>消息首页</h2>
}

function User() {
	return <h2>个人中心</h2>
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
				icon: 'jpb',
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
		console.log(navList.find(v => {
						v.path === pathname
						console.log(v.path, '--------', pathname);
					}));
		return (
			<div>
				<NavBar mode='dard'>
					{navList.find(v => {
						return v.path == pathname;
					}).title}
				</NavBar>
				<h2>footer</h2>
			</div>
		);
	}
}

export default Dashboard