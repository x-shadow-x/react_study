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
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux.js'
import { Redirect } from 'react-router-dom'

@connect(
	state => state.user, // 注意~redux已经采用combineReducers合并~此处是取和user.redux有关的所有的属性
	{ register }
)
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			pwd: '',
			repeatpwd: '',
			type: 'boss'
		}

		this.handleRegister = this.handleRegister.bind(this);
	}

	handleChange(key, val) {
		this.setState({
			[key]: val
		});
	}

	handleRegister() {
		this.props.register(this.state);
	}
	render() {
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo></Logo>
				<WingBlank>
					<List>
						{this.props.msg ? <p>{this.props.msg}</p> : ''}
						<InputItem onChange={(v) => this.handleChange('user', v)}>用户名</InputItem>
						<InputItem type="password" onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
						<InputItem type="password" onChange={(v) => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
						<WhiteSpace />
						<RadioItem 
							checked={this.state.type === 'boss'}
							onChange={() => this.handleChange('type', 'boss')}
						>BOSS</RadioItem>
						<RadioItem 
							checked={this.state.type === 'guy'}
							onChange={() => this.handleChange('type', 'guy')}
						>应聘者</RadioItem>
					</List>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleRegister}>注册</Button>
				</WingBlank>
			</div>

		);
	}
}

export default Register;