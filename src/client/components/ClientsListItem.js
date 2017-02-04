import React from 'react';
import propTypes from '../propTypes';
import StatusIcon from './StatusIcon';

const ClientsListItem = ({client, isCurrentUser}) => <a className="panel-block" style={{padding: '1em 1em'}}>
	<span className="panel-icon"><StatusIcon isOnline={true}/></span>
	<span style={{color: client.color}}>{client.id}</span> <span>{isCurrentUser && ' (sinä)'}</span>
</a>;

ClientsListItem.propTypes = {
	client: propTypes.user,
	isCurrentUser: React.PropTypes.bool
};

export default ClientsListItem;