import * as React from "react";
import {connect} from "react-redux";
import Form from './Form';
import MessageList from './MessageList';
import ClientsList from '../ClientsList';

class Chat extends React.Component {
	render() {
		const Loader = ({isFetching}) => isFetching ? <div>loading</div> : null;

		return <div className="tile is-ancestor is-parent" style={{height: '100%', padding: 0, margin: 0}}>
			<div className="tile is-parent is-3 notification" style={{margin: 0}}>
				<div className="tile is-child">
					<Loader isFetching={this.props.isFetching}/>
					<ClientsList clients={this.props.clients} user={this.props.user}/>
				</div>
			</div>
			<div className="tile is-vertical is-parent">
				<div className="tile is-child" style={{minHeight: 'initial', overflow: 'hidden'}}>
					<MessageList messages={this.props.messages}/>
				</div>
				<div className="tile is-child" style={{flexGrow: 0}}>
					<Form/>
				</div>
			</div>
		</div>
	}
}

const mapStateToProps = ({messages, clients, isFetching, user}) => ({
	clients,
	messages,
	isFetching,
	user
});


export default connect(mapStateToProps)(Chat);