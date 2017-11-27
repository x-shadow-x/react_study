/**
 * 管理聊天数据的redux
 */

import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093');

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标示已读
const MSG_READ = 'MSG_READ';

const initState = {
	chatMsg: [],
	unRead: 0
}

export function chat(state=initState, action) {
	switch(action.type) {
		case MSG_LIST:
			return {...state, chatMsg: action.payload, unRead: action.payload.filter(v => !v.read ).length}
		// case: MSG_RECV:
		// case: MSG_READ:
		default:
			return state;

	}
}

function msgList(msgs) {
	return {
		type: MSG_LIST,
		payload: msgs
	}
}

export function getMsgList() {
	return dispatch => {
		axios.get('/user/getMsgList').then(res => {
			if(res.state === 200 && res.data.code === 0) {
				dispatch(msgList(res.data.msgs));
			}
		});
	}
}