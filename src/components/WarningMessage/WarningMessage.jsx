/* eslint-disable react/prop-types */
import React from "react";
import "./WarningMessage.css";

export const WarningMessage = ({ message }) => {
	return (
		<div className="warning-message">
			<h1>{message}</h1>
		</div>
	);
};
