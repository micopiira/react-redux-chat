import * as React from 'react';
import {connect} from 'react-redux';
import Form from './Form';
import MessageList from './MessageList';
import ClientsList from '../ClientsList';
import propTypes from '../../propTypes';

class Chat extends React.Component {
	state = {
		showAlert: true
	};
	static propTypes = {
		isFetching: React.PropTypes.bool,
		clients: React.PropTypes.arrayOf(propTypes.user),
		user: propTypes.user,
		messages: React.PropTypes.arrayOf(propTypes.message)
	};
	componentDidMount() {
		this.setState({showAlert: false});
	}
	render() {
		return <div className="tile is-ancestor is-parent" style={{height: '100%', padding: 0, margin: 0}}>
			<div className="tile is-parent is-3" style={{margin: 0}}>
				<div className="tile is-child">
					<ClientsList clients={this.props.clients} user={this.props.user}/>
				</div>
			</div>
			<div className="tile is-vertical is-parent">
				{this.state.showAlert && <div className="tile is-child" style={{flexGrow: 0}}>
					<div className="notification is-warning">
					<p><strong>Warning!</strong> Your browser has JavaScript disabled or does not support JavaScript.</p>
					<p>Messages will not automatically refresh, you will need to manually refresh the page to see any new messages.</p>
					</div>
				</div>}
				<div className="tile is-child" style={{minHeight: 'initial', overflow: 'hidden'}}>
					<MessageList messages={this.props.messages} user={this.props.user} showTimeAgo={!this.state.showAlert}/>
				</div>
				<div className="tile is-child" style={{flexGrow: 0}}>
					<Form/>
				</div>
			</div>
		</div>;
	}
}

const mapStateToProps = ({messages, clients, isFetching, user}) => ({
	clients,
	messages,
	isFetching,
	user
});


export default connect(mapStateToProps)(Chat);