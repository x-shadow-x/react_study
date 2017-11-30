import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { connect } from 'react-redux'


@withRouter
@connect(
	state => state.chat
)
class NavLinkBar extends React.Component {
	static propTypes = {
		data: PropTypes.array.isRequired
	}
	render() {
		// 去除不显示的组件
		const navList = this.props.data.filter(v => !v.hide);
		const { pathname } = this.props.location
		return (
			<TabBar barTintColor="white">
				{navList.map(v => {
					return (
						<TabBar.Item
							className="tab_bar_item_contain"
							key={v.path}
							title={v.text}
							icon={{
								uri: require(`./imgs/${v.icon}.png`)
							}}
							selectedIcon={{
								uri: require(`./imgs/${v.icon}_active.png`)
							}}
							selected={pathname === v.path}
							onPress={() => {
								this.props.history.push(v.path)
							}}
							badge={v.path === '/msg' ? this.props.unRead : ''}
						>
							
						</TabBar.Item>
					);
				})}
			</TabBar>
		);
	}
}

export default NavLinkBar;