import React from 'react';
import propTypes from '../propTypes';
import ClientsListItem from './ClientsListItem';

const ClientsList = ({clients, user}) =>
	<ul>
		{clients.map(client =>
			<li style={{margin: '1em'}} key={client.id}>
				<ClientsListItem client={client} isCurrentUser={client.id === user.id}/>
			</li>
		)}
	</ul>;

ClientsList.propTypes = {
	clients: React.PropTypes.arrayOf(propTypes.user),
	user: propTypes.user
};

export default ClientsList;