
/**
 * 工具函数文件
 */

// 判断跳转地址函数
export function getRedirectPath({type, avator}) {
	console.log(type);
	let url = (type === 'boss') ? '/boss' : 'guy';
	if(!avator) { // 如果没有头像则认为没有完善了用户信息~
		url = url + 'info'
	}

	return url;
}