import React from 'react';
import AutoScroll from 'react-auto-scroll';
import MessageListItem from '../MessageListItem';
import propTypes from '../../propTypes';

class MessageList extends React.Component {
	static propTypes = {
		messages: React.PropTypes.arrayOf(propTypes.message),
		user: propTypes.user,
		showTimeAgo: React.PropTypes.bool
	};
	render() {
		return <div style={{overflowY: 'scroll', height: '100%'}}>
			<ul>
				{this.props.messages.map(message =>
					<li key={message.id} style={{margin: '1em'}} className="is-clearfix">
						<div className={'notification' + (message.sender.id === this.props.user.id ? ' is-pulled-right is-info' : ' is-pulled-left')}>
							<MessageListItem message={message} showTimeAgo={this.props.showTimeAgo}/>
						</div>
					</li>
				)}
			</ul>
		</div>;
	}
}

export default AutoScroll({
	property: 'messages'
})(MessageList);