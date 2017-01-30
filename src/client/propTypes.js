import React from 'react';

const user = React.PropTypes.shape({
	id: React.PropTypes.string,
	color: React.PropTypes.string
});

const message = React.PropTypes.shape({
	id: React.PropTypes.string,
	text: React.PropTypes.string,
	sender: user,
	timestamp: React.PropTypes.string
});


export default {
	user,
	message
};