import React from 'react';
import {connect} from 'react-redux';
import {addMessageThunk} from '../../actions';

class Form extends React.Component {
	static propTypes = {
		isFetching: React.PropTypes.bool,
		dispatch: React.PropTypes.func
	};

	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.dispatch(addMessageThunk(this.state.value));
		this.setState({value: ''});
	}

	render() {
		return <form onSubmit={this.handleSubmit} action="/api/messages" method="POST">
			<p className="control has-addons">
				<input name="text"
				       autoComplete="off"
				       className="input is-large is-expanded"
				       required={true}
				       disabled={this.props.isFetching}
				       type="text"
				       value={this.state.value}
				       onChange={this.handleChange}
				       ref={input => input && input.focus()}/>
				<button aria-label="send" disabled={this.props.isFetching} type="submit" className={`button is-large is-info${this.props.isFetching ? ' is-loading' : ''}`}>
					<span className="icon" aria-hidden="true">
						<i className="fa fa-paper-plane"/>
					</span>
				</button>
			</p>
		</form>;
	}
}

const mapStateToProps = ({isFetching}) => ({isFetching});

export default connect(mapStateToProps)(Form);