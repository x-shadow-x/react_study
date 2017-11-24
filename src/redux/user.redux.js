import axios from 'axios';
import { getRedirectPath } from '../util.js';

const AUTH_SUCESS = 'AUTH_SUCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
	redirectTo: '',
	isAuth: false,
	msg: '', // 记录报错信息
	user: '',
	pwd: '',
	type: ''
}

// reducer
export function user(state=initState, action) {
	switch(action.type) {
		case AUTH_SUCESS:
			return {
				...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload
			}
		case LOAD_DATA:
			return {
				...state, ...action.payload
			}
		case ERROR_MSG:
			return {
				...state, msg: action.msg, isAuth: false
			}
		case LOGOUT:
			return {...initState, redirectTo: '/login'}
		default: 
			return state;
	}
}

// action creator functions
function errorMsg(msg) {
	return {
		msg, type: ERROR_MSG
	};
}

function authSuccess(data) {
	const {pwd, ...payload} = data;
	return {
		type: AUTH_SUCESS,
		payload: payload
	}
}

export function loadData(userInfo) {
	return {
		type: LOAD_DATA,
		payload: userInfo
	}
}

// 这里参数的写法采用对象解构的形式
export function register({ user, pwd, repeatpwd, type }) {
	if(!user || !pwd) {
		return errorMsg('用户名和密码不能为空');
	} else if(pwd !== repeatpwd) {
		return errorMsg('两次输入密码不同');
	}

	return dispatch => {
		console.log(user, pwd, type);
		axios.post('/user/register', { user, pwd, type }).then(res => {
			if(res.status === 200 && res.data.code === 0) {
				dispatch(authSuccess({ user, pwd, type }));
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		})
	}
}

export function login({ user, pwd }) {
	if(!user || !pwd) {
		return errorMsg('用户名和密码不能为空')
	}

	return dispatch => {
		console.log(user, pwd);
		axios.post('/user/login', { user, pwd }).then(res => {
			if(res.status === 200 && res.data.code === 0) {
				console.log(res.data.data);
				dispatch(authSuccess(res.data.data));
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		});
	}
}

export function update(data) {
	return dispatch => {
		console.log(data);
		axios.post('/user/update', data).then(res => {
			if(res.status === 200 && res.data.code === 0) {
				dispatch(authSuccess(res.data.data));
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		});
	}
}

export function logoutSubmit() {
	return {
		type: LOGOUT
	}
}