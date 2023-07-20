/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { Like } from "../Like/Like";
import { AddComment } from "../AddComment/AddComment";
import { Comments } from "../Comments/Comments";
import { Navbar } from "../Navbar/Navbar";
import { AccessDenied } from "../AccessDenied/AccessDenied";
import "./UniquePost.css";

export const UniquePost = () => {
	const { token } = useAuth();
	const [uniquePost, setUniquePost] = useState([]);

	const params = useParams();

	useEffect(() => {
		fetch(
			`https://troubled-sheath-dress-bass.cyclic.app/posts/post/${params.id}`,
			{
				method: "GET",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setUniquePost(data);
			})
			.catch((e) => console.log(e));
	}, []);

	const updatePostLikes = (postId, newLikes, newLikesCount) => {
		setUniquePost((prevPost) => {
			if (prevPost._id === postId) {
				return {
					...prevPost,
					likes: newLikes,
					likesCount: newLikesCount,
				};
			}
			return prevPost;
		});
	};

	const updatePostComments = (postId, newComments) => {
		setUniquePost((prevPost) => {
			if (prevPost._id === postId) {
				return {
					...prevPost,
					comments: newComments,
				};
			}
			return prevPost;
		});
	};

	return (
		<>
			<Navbar btnText="Sair" />
			{uniquePost.message !== "Acesso Negado!" ? (
				uniquePost ? (
					<div className="post-container">
						<div className="post-content">
							<h1>{uniquePost.title}</h1>
							<p className={"post-text expanded"}>
								{uniquePost.content}
							</p>
							<div className="like-comment-section">
								<div className="likes">
									<Like
										postId={uniquePost._id}
										postLikes={uniquePost.likes}
										updatePostLikes={updatePostLikes}
										post={uniquePost}
									/>
								</div>
								<div className="comment-section">
									<div className="add-comment">
										<AddComment
											postId={uniquePost._id}
											updatePostComments={
												updatePostComments
											}
										/>
									</div>
									<div className="comments">
										{uniquePost.comments ? (
											uniquePost.comments.map(
												(comment) => {
													return (
														<Comments
															comment={comment}
															key={comment._id}
														/>
													);
												}
											)
										) : (
											<p className="comment-loading">
												Carregando
											</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<p className="comment-loading">Carregando</p>
				)
			) : (
				<AccessDenied />
			)}
		</>
	);
};
