import React from "react";
import "./Input.css";

// eslint-disable-next-line react/prop-types
export const Input = ({ type, name, labelName, onChange, ...restProps }) => {
	return (
		<div className="form-fields">
			<label htmlFor={name}>{labelName}</label>
			<input type={type} name={name} {...restProps} onChange={onChange} />
		</div>
	);
};
