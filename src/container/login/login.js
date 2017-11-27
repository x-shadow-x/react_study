import React from 'react'
import Logo from '../../component/logo/logo.js'
import {
	List,
	InputItem,
	WingBlank,
	WhiteSpace,
	Button
} from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux.js'
import form from '../../component/form/form.js'

@connect(
	state => state.user,
	{ login }
)
@form
class Login extends React.Component {
	constructor(props) {
		super(props);

		this.jumpToRegister = this.jumpToRegister.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin() {
		this.props.login(this.props.state);
	}

	jumpToRegister() {
		this.props.history.push('/register');
	}

	render() {
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo></Logo>
				<WingBlank>
					<List>
						{this.props.msg ? <p>{this.props.msg}</p> : ''}
						<InputItem onChange={(v) => this.props.handleChange('user', v)}>用户</InputItem>
						<InputItem 
							type="password"
							onChange={(v) => this.props.handleChange('pwd', v)}
						>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleLogin}>登录</Button>
					<WhiteSpace />
					<Button type="primary" onClick={this.jumpToRegister}>注册</Button>
				</WingBlank>
			</div>
		);
	}
}

export default Login;