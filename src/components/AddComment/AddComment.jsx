/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./AddComment.css";
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

export const AddComment = ({ postId }) => {
	const [text, setText] = useState("");
	const { token } = useAuth();

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleComment = (e) => {
		e.preventDefault();
		fetch(
			`https://troubled-sheath-dress-bass.cyclic.app/posts/${postId}/comment`,
			{
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ text }),
			}
		)
			.then((res) => {
				if (res.status === 200) return res.json();
			})
			.then((data) => {
				console.log(data);
				// updatePostLikes(postId, data.likes, data.likesCount);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="add-comment-container">
			<input
				type="text"
				className="add-comment-input"
				placeholder="Adicionar comentário"
				value={text}
				onChange={handleChange}
			/>
			<AiOutlineSend size={30} onClick={handleComment} />
		</div>
	);
};
