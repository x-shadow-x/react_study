import React from 'react'
import PropTypes from 'prop-types'
import { List, Grid, WingBlank } from 'antd-mobile'
import './avatar_selector.css'
class AvatarSelector extends React.Component {

	static propTypes = {
		selectorAvatar: PropTypes.func
	}
	
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		const avatarList = 'devil,dr,dracula,fella,frankenstein,ghost,hellboy,jason,pumpkin,radioactive,rorschach,skull'
							.split(',')
							.map((iconName) => {
								return {
									icon: require(`../imgs/${iconName}.png`),
									text: iconName
								}
							});


		const userIcon = this.state.icon ? <div><span className="user_icon_text">已选择头像</span><img className="user_icon" src={this.state.icon} alt="用户头像" /></div> : <span className="user_icon_text">请选择头像</span>;

		return(
			<div>
				<List renderHeader={() => userIcon}>
					<Grid 
						data={avatarList} 
						onClick={(el) => {
							this.setState(el);
							this.props.selectorAvatar(el.text);
						}}
					/>
				</List>
			</div>
		);
	}
}

export default AvatarSelector;