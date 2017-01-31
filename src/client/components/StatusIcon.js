import React from 'react';

const StatusIcon = ({isOnline}) => <span className={`icon is-pulled-right ${isOnline ? 'success' : 'warning'}`}>
	<i style={{fontSize: '0.5em'}} className="fa fa-circle"/>
</span>;

StatusIcon.propTypes = {
	isOnline: React.PropTypes.bool
};

export default StatusIcon;