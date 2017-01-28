import React from 'react';
import propTypes from '../propTypes';

const StatusIcon = ({isOnline}) => <span className={`icon is-pulled-right ${isOnline ? 'success' : 'warning'}`}>
	<i className="fa fa-circle"/>
</span>;

StatusIcon.propTypes = {
	isOnline: React.PropTypes.bool
};

const ClientsListItem = ({client, isCurrentUser}) => <span>
	<a href="#" style={{color: client.color}}>{client.id}</a>{isCurrentUser ? ' (sinä)' : null} <StatusIcon isOnline={true}/>
</span>;

ClientsListItem.propTypes = {
	client: propTypes.user,
	isCurrentUser: React.PropTypes.bool
};


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