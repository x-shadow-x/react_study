import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { update } from '../../redux/user.redux.js'
import { connect } from 'react-redux'
import AvatarSelector from '../../component/avatar_selector/avatar_selector.js'

import { Redirect } from 'react-router-dom'


@connect(
	state => state.user,
	{ update }
)
class GuyInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			desc: ''
		};
		this.selectorAvatar = this.selectorAvatar.bind(this);
	}
	onChange(key, val) {
		this.setState({
			[key]: val
		});
	}
	selectorAvatar(imgName) {
		this.setState({
			avatar: imgName
		});
	}
	render() {
		const path = this.props.location.pathname;
		const redirectTo = this.props.redirectTo
		return(
			<div>
				{redirectTo && redirectTo !== path ? <Redirect to={redirectTo}></Redirect> : null}
				<NavBar mode="dark">求职完善信息页面</NavBar>
				<AvatarSelector selectorAvatar={this.selectorAvatar}></AvatarSelector>
				<InputItem onChange={(v) =>this.onChange('title', v)}>应聘职位</InputItem>
				<TextareaItem 
					title="个人简介"
					autoHeight
					onChange={(v) =>this.onChange('desc', v)}
				></TextareaItem>
				<Button 
					type="primary"
					onClick={() => {
						this.props.update(this.state)
					}}
				>保存</Button>
			</div>
		);
	}
}

export default GuyInfo