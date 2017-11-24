import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux.js'
import { connect } from 'react-redux'

@withRouter
@connect(
	null,
	{ loadData }
)
class AuthRoute extends React.Component {
	componentDidMount() {
		const publicPathList = ['/login', '/register']; // 不用登录就允许访问的页面路径
		const pathName = this.props.location.pathname; // 获取当前页面的路径
		
		if(publicPathList.indexOf(pathName) > -1) { // 当前访问的就是无需登录就允许访问的页面
			return null;
		}

		axios.get('/user/info').then(res => {
			if(res.status === 200) {
				if(res.data.code === 0) {
					// todo======有登录信息
					// 调用user.redux中的loadData action create函数~将后端返回的用户信息整合进user.redux中的state中
					// 然后和user.redux connect的login组件通过拿到user.redux的state~就相当于间接拿到了后端返回的数据
					this.props.loadData(res.data.data);
				} else {
					this.props.history.push('/login');
				}
			}
		});
	}

	render() {
		return null;
	}
}

export default AuthRoute;