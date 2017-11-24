import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux.js'
import { Redirect } from 'react-router-dom'
import './user.css'

@connect(
	state => state.user,
	{ logoutSubmit }
)
class User extends React.Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}
	logout() {
		const alert = Modal.alert;

		alert('注销', '确认退出么?', [
				{text: '取消', onPress: () => console.log('cancel')},
				{text: '确认', onPress: () => {
					browserCookie.erase('userid');
					this.props.logoutSubmit()
				}},
			]);
	}
	render() {
		const props = this.props;
		const Item = List.Item;
		const Brief = Item.Brief;

		// 页面加载一开始this.props是没有用户信息的~当然也没有头像信息~这会导致下面的img require的src报错
		return props.user ? (
			<div>
				<Result
					img={<img src={require(`../avatar_selector/imgs/${this.props.avatar}.png`)} className="user_img" alt="" />}
					title={this.props.user}
					message={props.type === 'boss' ? props.company : null}
				/>
				<List renderHeader={() => '简介'}>
					<Item
						multipleLine
					>
						{props.title}
						{props.desc.split('\n').map(v => {
							return <Brief key={v}>{v}</Brief>
						})}
						{props.money ? <Brief>薪资： {props.money}</Brief> : null}
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item onClick={this.logout}>退出登录</Item>
				</List>
			</div>
		) : (props.redirectTo ? <Redirect to={props.redirectTo}></Redirect> : null);
	}
}

export default User