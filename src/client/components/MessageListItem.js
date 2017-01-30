import React from 'react';
import TimeAgo from 'react-timeago';
import ReactMarkdown from 'react-markdown';
import propTypes from '../propTypes';

const MessageListItem = ({message, showTimeAgo}) => <div>
	<strong style={{color: message.sender.color}}>{message.sender.id}</strong> <small>{showTimeAgo ? <TimeAgo minPeriod={60} date={message.timestamp}/> : new Date(message.timestamp).toISOString()}</small>
	<ReactMarkdown source={message.text}/>
</div>;

MessageListItem.propTypes = {
	message: propTypes.message,
	showTimeAgo: React.PropTypes.bool
};

export default MessageListItem;