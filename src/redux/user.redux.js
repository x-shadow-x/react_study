import axios from 'axios';
import { getRedirectPath } from '../util.js';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

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
		case REGISTER_SUCCESS:
			return {
				...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload
			}
		case LOGIN_SUCCESS:
			return {
				...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload
			}
		case LOAD_DATA:
			return {
				...state, ...action.payload
			}
		case ERROR_MSG:
			return {
				...state, msg: action.msg, isAuth: false
			}
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

function registerSuccess(data) {
	return {
		type: REGISTER_SUCCESS,
		payload: data
	}
}

function loginSuccess(data) {
	return {
		type: LOGIN_SUCCESS,
		payload: data
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
			if(res.status == 200 && res.data.code == 0) {
				dispatch(registerSuccess({ user, pwd, type }));
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
			if(res.status == 200 && res.data.code == 0) {
				dispatch(loginSuccess(res.data.data));
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		});
	}
}