/**
 * 工具函数
 * @return {[type]} [description]
 */
export function getRedirectPath({type, avator}) {
	console.log(type);
	let url = (type === 'boss') ? '/boss' : 'guy';
	if(!avator) { // 如果没有头像则认为没有完善了用户信息~
		url = url + 'info'
	}

	return url;
}