import React from 'react';
import AutoScroll from 'react-auto-scroll';
import TimeAgo from 'react-timeago';
import ReactMarkdown from 'react-markdown';

class MessageList extends React.Component {
	state = {
		mounted: false
	};
	static propTypes = {
		messages: React.PropTypes.arrayOf(React.PropTypes.shape({
			id: React.PropTypes.string,
			text: React.PropTypes.string,
			sender: React.PropTypes.object,
			timestamp: React.PropTypes.instanceOf(Date)
		}))
	};
	componentDidMount() {
		this.setState({mounted: true});
	}
	render() {
		return <div style={{overflowY: 'scroll', height: '100%'}}><ul>
			{this.props.messages.map(message =>
				<li key={message.id} style={{marginBottom: '1em'}}>
					<strong style={{color: message.sender.color}}>{message.sender.id}</strong>
					<small>{this.state.mounted ? <TimeAgo date={message.timestamp}/> : message.timestamp.toISOString()}</small>
					<ReactMarkdown source={message.text}/>
				</li>
			)}
		</ul></div>;
	}
}

export default AutoScroll({
	property: 'messages'
})(MessageList);