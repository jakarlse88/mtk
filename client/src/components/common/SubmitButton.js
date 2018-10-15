import React from 'react';

export default ({ isInvalid, onClick, buttonText }) => (
	<button
		disabled={isInvalid}
		className="btn blue waves-effect waves-blue"
		type="submit"
		onClick={onClick}>
		<i className="fas fa-paper-plane right" />
		{buttonText}
	</button>
);
