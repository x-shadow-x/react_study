import React from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class Boss extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	componentDidMount() {
		console.log(123);
		axios.get('/user/list?type=guy').then(res => {
			// console.log(res.data);
			if(res.data.code == 0) {
				this.setState({
					data: res.data.data
				})
			}
		});
	}

	render() {
		console.log(this.state.data);
		return (
			<WingBlank>
				{this.state.data.map(v => {
					console.log(v.avatar, '--------');
					return (
						v.avatar ? 
							<Card key={v._id}>
								<Card.Header
									title={v.user}
									thumb={require(`../avatar_selector/imgs/${v.avatar}.png`)}
									extra={<span>{v.title}</span>}
								></Card.Header>
							</Card> : null);
					
				})}
			</WingBlank>
		);
	}
}

export default Boss