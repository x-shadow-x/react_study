import axios from 'axios';
import { getRedirectPath } from '../util.js';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG'

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