import React from 'react';

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
	client: React.PropTypes.object,
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
	clients: React.PropTypes.arrayOf(React.PropTypes.object),
	user: React.PropTypes.object
};

export default ClientsList;