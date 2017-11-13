import React from 'react'
import Logo from '../../component/logo/logo.js'
import {
	List,
	InputItem,
	Radio,
	WingBlank,
	WhiteSpace,
	Button
} from 'antd-mobile'

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'boss'
		}
	}
	render() {
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem>用户名</InputItem>
						<InputItem>密码</InputItem>
						<InputItem>确认密码</InputItem>
						<WhiteSpace />
						<RadioItem checked={this.state.type=='boss'}>BOSS</RadioItem>
						<RadioItem checked={this.state.type=='guy'}>应聘者</RadioItem>
					</List>
					<WhiteSpace />
					<Button type="primary">登录</Button>
					<WhiteSpace />
					<Button type="primary" onClick={this.register}>注册</Button>
				</WingBlank>
			</div>

		);
	}
}

export default Register;