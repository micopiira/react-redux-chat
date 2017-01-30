import React from 'react';
import AutoScroll from 'react-auto-scroll';
import MessageListItem from '../MessageListItem';
import propTypes from '../../propTypes';

class MessageList extends React.Component {
	state = {
		mounted: false
	};
	static propTypes = {
		messages: React.PropTypes.arrayOf(propTypes.message)
	};
	componentDidMount() {
		this.setState({mounted: true});
	}
	render() {
		return <div style={{overflowY: 'scroll', height: '100%'}}>
			<ul>
				{this.props.messages.map(message =>
					<li key={message.id} style={{marginBottom: '1em'}}>
						<MessageListItem message={message} showTimeAgo={this.state.mounted}/>
					</li>
				)}
			</ul>
		</div>;
	}
}

export default AutoScroll({
	property: 'messages'
})(MessageList);