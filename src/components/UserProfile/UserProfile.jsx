import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LikedPosts } from "../LikedPosts/LikedPosts";

export const UserProfile = () => {
	const [user, setUser] = useState();
	const { token } = useAuth();
	const params = useParams();

	useEffect(() => {
		fetch(
			`https://troubled-sheath-dress-bass.cyclic.app/users/profile/${params.id}`,
			{
				method: "GET",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((res) => res.json())
			.then(({ user }) => {
				setUser(user);
			})
			.catch((e) => console.log(e));
	}, [params.id]);

	return (
		<>
			<div className="profile">
				{user ? (
					<h1>Bem vindo ao perfil do usuário {user.name}</h1>
				) : (
					<p>Carregando</p>
				)}
			</div>
			<LikedPosts />
		</>
	);
};
