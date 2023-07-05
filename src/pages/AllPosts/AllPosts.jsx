/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import "./AllPosts.css";
import { SeeMore } from "../../components/SeeMore/SeeMore";
import { Like } from "../../components/Like/Like";
import { Comments } from "../../components/Comments/Comments";
import { AddComment } from "../../components/AddComment/AddComment";

export const AllPosts = () => {
	const { token } = useAuth();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("https://troubled-sheath-dress-bass.cyclic.app/posts/", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then(({ posts }) => {
				setPosts(posts);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const updatePostLikes = (postId, newLikes, newLikesCount) => {
		setPosts((prevPosts) => {
			return prevPosts.map((post) => {
				if (post._id === postId) {
					return {
						...post,
						likes: newLikes,
						likesCount: newLikesCount,
					};
				}
				return post;
			});
		});
	};

	return (
		<div>
			<Navbar btnText="Sair" />
			<div className="post-container">
				{posts ? (
					posts.map((post) => {
						return (
							<div key={post._id} className="post-content">
								<h1>{post.title}</h1>
								<p
									className={`post-text ${
										post.seeMore ? "expanded" : ""
									}`}
								>
									{post.content}
								</p>
								<SeeMore
									postId={post._id}
									posts={posts}
									setPosts={setPosts}
								/>
								<div className="like-comment-section">
									<div className="likes">
										<Like
											postId={post._id}
											postLikes={post.likes}
											updatePostLikes={updatePostLikes}
											post={post}
										/>
									</div>
									<div className="comment-section">
										<div className="add-comment">
											<AddComment postId={post._id} />
										</div>
										<div className="comments">
											<Comments posts={posts} />
										</div>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<p>Não temos posts</p>
				)}
			</div>
		</div>
	);
};
