import React from 'react';
import {connect} from 'react-redux';
import {initSockets, fetchMessages} from '../../actions';

if (process.env.WEBPACK) {
	require('../../index.scss');
}

class App extends React.Component {
	static propTypes = {
		isFetching: React.PropTypes.bool,
		children: React.PropTypes.element,
		dispatch: React.PropTypes.func
	};

	componentDidMount() {
		this.props.dispatch(fetchMessages());
		this.props.dispatch(initSockets());
	}

	render() {
		return <div className="container" style={{height: '100%'}}>
			{this.props.children}
		</div>;
	}
}

const mapStateToProps = ({messages, clients, isFetching, user}) => ({
	clients,
	messages,
	isFetching,
	user
});


export default connect(mapStateToProps)(App);