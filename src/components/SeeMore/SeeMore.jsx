/* eslint-disable react/prop-types */
import React from "react";
import "./SeeMore.css";

export const SeeMore = ({ postId, posts, setPosts }) => {
	const toggleSeeMore = () => {
		const updatedPosts = posts.map((post) => {
			if (post._id === postId) {
				return { ...post, seeMore: !post.seeMore };
			}
			return post;
		});
		setPosts(updatedPosts);
	};

	const post = posts.find((post) => post._id === postId);

	return (
		<button onClick={toggleSeeMore} className="see-more-btn">
			{post.seeMore ? "Ver Menos" : "Ver Mais"}
		</button>
	);
};
