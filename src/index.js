import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux' // 从右到左来组合多个函数~使多个 store 增强器依次执行
import thunk from 'redux-thunk' // redux异步action中间件
import { Provider } from 'react-redux'
import {BrowserRouter, Route, Redirsct, Switch} from 'react-router-dom'
import reducer from './reducer.js'
import './config.js'

import Login from './container/login/login.js'
import Register from './container/register/register.js'
import AuthRoute from './component/authroute/authrouter.js'
import BossInfo from './container/bossinfo/bossinfo.js'

const store = createStore(reducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

function Boss(props) {
	return <h1>Boss</h1>
}

ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute />
				<Route pdth="bossinfo" component={BossInfo}></Route>
				<Route path="/boss" component={Boss}></Route>
				<Route path="/login" component={Login}></Route>
				<Route path="/register" component={Register}></Route>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
);