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
		const content = this.props.messages.length ? <ul>
				{this.props.messages.map(message =>
					<li key={message.id} style={{margin: '1em'}} className="is-clearfix">
						<div className={'notification' + (message.sender.id === this.props.user.id ? ' is-pulled-right is-info' : ' is-pulled-left')}>
							<MessageListItem message={message} showTimeAgo={this.props.showTimeAgo}/>
						</div>
					</li>
				)}
			</ul> : <div className="is-overlay" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><h1 className="title">No messages yet</h1></div>;
		return <div style={{overflowY: 'scroll', height: '100%', position: 'relative'}}>
			{content}
		</div>;
	}
}
export default AutoScroll({
	property: 'messages'
})(MessageList);