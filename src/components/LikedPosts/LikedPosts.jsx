import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const LikedPosts = () => {
	const { token } = useAuth();
	const [likedPosts, setLikedPosts] = useState([]);

	const params = useParams();

	useEffect(() => {
		fetch(
			`https://troubled-sheath-dress-bass.cyclic.app/users/liked/${params.id}`,
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
			<h1>Atividades</h1>
			{likedPosts.map((likedPost) => {
				return (
					<Link key={likedPost._id} to={`/post/${likedPost._id}`}>
						<h2>{likedPost.title}</h2>
					</Link>
				);
			})}
		</div>
	);
};
