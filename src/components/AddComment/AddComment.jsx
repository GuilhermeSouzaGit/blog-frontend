/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import "./AddComment.css";
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

export const AddComment = ({ postId, updatePostComments }) => {
	const [text, setText] = useState("");
	const { token } = useAuth();
	const inputRef = useRef(null);

	const handleChange = () => {
		setText(inputRef.current.innerText);
	};

	const handleComment = (e) => {
		e.preventDefault();
		fetch(
			`https://wild-blue-tuna-wrap.cyclic.app/posts/${postId}/comment`,
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
			.then(({ comments }) => {
				updatePostComments(postId, comments);
				setText("");
				inputRef.current.innerText = "";
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="add-comment-container">
			<div
				ref={inputRef}
				className={`add-comment-input ${text ? "has-content" : ""}`}
				data-placeholder="Adicionar comentário"
				onInput={handleChange}
				contentEditable
			/>
			<AiOutlineSend
				size={30}
				onClick={handleComment}
				color="var(--icon-color)"
			/>
		</div>
	);
};
