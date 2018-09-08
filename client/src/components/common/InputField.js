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
	error
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
			/>
			{error && <div className="text-danger">{error}</div>}
		</div>
	);
};

InputField.defaultProps = {
	type: 'text'
};

InputField.propTypes = {
	inputId: PropTypes.string.isRequired,
	labelText: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string
};

export default InputField;
