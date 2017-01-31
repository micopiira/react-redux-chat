import React from 'react';
import propTypes from '../propTypes';
import StatusIcon from './StatusIcon';

const ClientsListItem = ({client, isCurrentUser}) => <span>
	<a href="#" style={{color: client.color}}>{client.id}</a>{isCurrentUser ? ' (sinä)' : null} <StatusIcon isOnline={true}/>
</span>;

ClientsListItem.propTypes = {
	client: propTypes.user,
	isCurrentUser: React.PropTypes.bool
};

export default ClientsListItem;