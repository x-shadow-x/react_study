import React from 'react'
import Logo from '../../component/logo/logo.js'
import {
	List,
	InputItem,
	WingBlank,
	WhiteSpace,
	Button
} from 'antd-mobile'
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.register = this.register.bind(this);
	}
	register() {
		this.props.history.push('/register');
	}
	render() {
		return (
			<div>
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem>用户</InputItem>
						<InputItem>密码</InputItem>
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

export default Login;