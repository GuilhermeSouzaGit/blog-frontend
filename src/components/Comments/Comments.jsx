/* eslint-disable react/prop-types */
import React from "react";
import { BiUser } from "react-icons/bi";
import "./Comments.css";

export const Comments = ({ comment }) => {
	return (
		<div className="comments-content">
			<p className="comment-title">
				<BiUser />
				{comment.postedBy}
			</p>
			<p className="comment-text">{comment.text}</p>
		</div>
	);
};
