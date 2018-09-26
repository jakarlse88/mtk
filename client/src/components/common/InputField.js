import PropTypes from 'prop-types';
import React from 'react';

const InputField = ({
	inputId,
	labelText,
	type,
	name,
	placeholder,
	value,
	onChange,
	error,
	readOnly
}) => {
	return (
		<div className="form-group">
			<label htmlFor={inputId}>{labelText}:</label>
			<input
				className="form-control"
				type={type}
				name={name}
				placeholder={placeholder}
				id={inputId}
				value={value}
				onChange={onChange}
				readOnly={readOnly}
			/>
			{error && <div className="text-danger">{error}</div>}
		</div>
	);
};

InputField.defaultProps = {
	type: 'text',
	readOnly: false
};

InputField.propTypes = {
	inputId: PropTypes.string.isRequired,
	labelText: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	error: PropTypes.string,
	readOnly: PropTypes.bool
};

export default InputField;
