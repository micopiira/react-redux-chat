import React from 'react';

const StatusIcon = ({isOnline}) =>
	<i className={`fa fa-circle ${isOnline ? 'success' : 'warning'}`}/>;

StatusIcon.propTypes = {
	isOnline: React.PropTypes.bool
};

export default StatusIcon;