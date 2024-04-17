/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LikedPosts.css";

export const LikedPosts = ({ user }) => {
	const { token } = useAuth();
	const [likedPosts, setLikedPosts] = useState([]);

	const params = useParams();

	useEffect(() => {
		fetch(
			`https://wild-blue-tuna-wrap.cyclic.app/users/liked/${params.id}`,
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
				setLikedPosts(data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="liked-posts-container">
			<h2>Atividades</h2>
			<div className="liked-posts">
				{likedPosts.map((likedPost) => {
					return (
						<div key={likedPost._id} className="post-card">
							<Link to={`/post/${likedPost._id}`}>
								<span>{user} Curtiu isto</span>
								<h2>{likedPost.title}</h2>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};
