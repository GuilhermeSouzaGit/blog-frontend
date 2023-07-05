/* eslint-disable react/prop-types */
import React from "react";
import { BiUser } from "react-icons/bi";
import "./Comments.css";

export const Comments = ({ posts }) => {
	return posts.map((post) => {
		{
			return post.comments.map((comment) => {
				console.log(comment.text);
				return (
					<div key={comment._id} className="comments-content">
						<p>
							<BiUser />
							{comment.postedBy}
						</p>
						<p className="comment-text">{comment.text}</p>
					</div>
				);
			});
		}
	});
};
