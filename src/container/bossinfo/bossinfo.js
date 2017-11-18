import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { update } from '../../redux/user.redux.js'
import { connect } from 'react-redux'
import AvatarSelector from '../../component/avatar_selector/avatar_selector.js'


@connect(
	state => state.user,
	{ update }
)
class BossInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: ''
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
		return(
			<div>
				<NavBar mode="dark">BOSS完善信息页面</NavBar>
				<AvatarSelector selectorAvatar={this.selectorAvatar}></AvatarSelector>
				<InputItem onChange={(v) =>this.onChange('title', v)}>招聘职位</InputItem>
				<InputItem onChange={(v) =>this.onChange('company', v)}>公司名称</InputItem>
				<InputItem onChange={(v) =>this.onChange('money', v)}>薪资范围</InputItem>
				<TextareaItem 
					title="职位要求"
					autoHeight
					onChange={(v) =>this.onChange('desc', v)}
				>职位要求</TextareaItem>
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

export default BossInfo