import React from 'react';
import propTypes from '../propTypes';
import ClientsListItem from './ClientsListItem';

const ClientsList = ({clients, user}) =>
	<nav className="panel" style={{overflowY: 'auto', maxHeight: '100%'}}>
		<p className="panel-heading">Users</p>
		{clients.map(client =>
			<ClientsListItem key={client.id} client={client} isCurrentUser={client.id === user.id}/>
		)}
	</nav>;

ClientsList.propTypes = {
	clients: React.PropTypes.arrayOf(propTypes.user),
	user: propTypes.user
};

export default ClientsList;