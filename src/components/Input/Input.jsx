/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";
import "./Input.css";

export const Input = forwardRef(function Input(props, ref) {
	const { type, name, labelName, ...restProps } = props;
	return (
		<div className="form-fields">
			<label htmlFor={name}>{labelName}</label>
			<input type={type} name={name} {...restProps} ref={ref} />
		</div>
	);
});
