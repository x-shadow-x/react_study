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
	emojiList: [],
	usersInfo: {},
	unRead: 0
}

export function chat(state=initState, action) {
	switch(action.type) {
		case MSG_LIST:
			return {
				...state,
				usersInfo: action.payload.usersInfo,
				chatMsg: action.payload.msgs,
				unRead: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userId ).length,
				emojiList: action.payload.emojiList
			}
				
		case MSG_RECV:
			return {
				...state,
				chatMsg: [...state.chatMsg, action.payload.msg],
				unRead: action.payload.msg.to === action.payload.userId ? state.unRead + 1 : state.unRead
			}
		case MSG_READ:
			const {from, num} = action.payload;
			
			return {
				...state,
				chatMsg: state.chatMsg.map(v => {
					console.log(from, v.from);
					return {...v, read: from === v.from ? true : v.read}
				}),
				unRead: state.unRead - num
			}
		default:
			return state;

	}
}

function msgList(msgs, usersInfo, userId, emojiList) {
	return {
		type: MSG_LIST,
		payload: {msgs, usersInfo, userId, emojiList}
	}
}

function msgRecv(msg, userId) {
	return {
		type: MSG_RECV,
		payload: {
			msg,
			userId
		}
	}
}

function msgRead({oriangl, to, num}) {
	return {
		type: MSG_READ,
		payload: {
			to,
			num,
			from: oriangl
		}
	}
}

export function getMsgList() {
	return (dispatch, getState) => {
		axios.get('/user/getMsgList').then(res => {
			if(res.status === 200 && res.data.code === 0) {
				const userId = getState().user._id;
				dispatch(msgList(res.data.msgs, res.data.usersInfo, userId, res.data.emojiList));
			}
		});
	}
}

export function sendMsg({orignal, to, text}) {
	return dispatch => {
		socket.emit('sendmsg', { orignal, to, text });
	}
}

export function recvMsg() {
	return (dispatch, getState) => {
		socket.on('recvmsg', function(data) {
			const userId = getState().user._id;
			dispatch(msgRecv(data, userId))
		})
	}
}

export function readMsg(oriangl) {
	return (dispatch, getState) => {
		axios.post('/user/readMsg', {oriangl}).then(res => {
			const userId = getState().user._id;
			if(res.status === 200 && res.data.code === 0) {
				dispatch(msgRead({oriangl, userId, num: res.data.num}))
			}
			
		})
	}
}