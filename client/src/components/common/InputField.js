import PropTypes from 'prop-types';
import React from 'react';

const InputField = ({
	icon,
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
		<div className="input-field">
			{icon && <i className={`fas fa-${icon} prefix`} />}
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				id={inputId}
				value={value}
				onChange={onChange}
				readOnly={readOnly}
			/>
			<span className="helper-text black-text">{labelText}</span>
			{error && <small className="red-text">{error}</small>}
		</div>
	);
};

InputField.defaultProps = {
	type: 'text',
	readOnly: false
};

InputField.propTypes = {
	icon: PropTypes.string,
	inputId: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	error: PropTypes.string,
	readOnly: PropTypes.bool
};

export default InputField;
