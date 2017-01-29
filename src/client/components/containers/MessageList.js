import React from 'react';
import AutoScroll from 'react-auto-scroll';
import TimeAgo from 'react-timeago';
import ReactMarkdown from 'react-markdown';
import propTypes from '../../propTypes';

const MessageListItem = ({message, showTimeAgo}) => <div>
	<strong style={{color: message.sender.color}}>{message.sender.id}</strong>
	<small>{showTimeAgo ? <TimeAgo minPeriod={60} date={message.timestamp}/> : new Date(message.timestamp).toISOString()}</small>
	<ReactMarkdown source={message.text}/>
</div>;

MessageListItem.propTypes = {
	message: propTypes.message,
	showTimeAgo: React.PropTypes.bool
};

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