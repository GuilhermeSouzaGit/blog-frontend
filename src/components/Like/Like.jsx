/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./Like.css";

// eslint-disable-next-line no-unused-vars
export const Like = ({ postId, postLikes, updatePostLikes, post }) => {
	const { usersId } = useContext(AuthContext);
	const { token } = useAuth();

	const handleLike = (e) => {
		e.preventDefault();
		fetch(
			`https://troubled-sheath-dress-bass.cyclic.app/posts/${postId}/like`,
			{
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((res) => {
				if (res.status === 200) return res.json();
			})
			.then((data) => {
				updatePostLikes(postId, data.likes, data.likesCount);
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div className="likes-content">
				<p>{post.likesCount}</p>
				<button onClick={handleLike} className="like-btn">
					{postLikes.includes(usersId) ? (
						<AiFillHeart size={20} />
					) : (
						<AiOutlineHeart size={20} />
					)}
				</button>
			</div>
			<div></div>
		</>
	);
};
