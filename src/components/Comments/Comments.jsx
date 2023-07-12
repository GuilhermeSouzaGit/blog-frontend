/* eslint-disable react/prop-types */
import React from "react";
import { BiUser } from "react-icons/bi";
import "./Comments.css";
import { Link } from "react-router-dom";

export const Comments = ({ comment }) => {
	console.log(comment.userId);
	return (
		<div className="comments-content">
			<Link to={`/user/${comment.userId}`}>
				<p className="comment-title">
					<BiUser />
					{comment.postedBy}
				</p>
			</Link>
			<p className="comment-text">{comment.text}</p>
		</div>
	);
};
