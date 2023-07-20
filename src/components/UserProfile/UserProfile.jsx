import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LikedPosts } from "../LikedPosts/LikedPosts";
import "./UserProfile.css";
import { AccessDenied } from "../AccessDenied/AccessDenied";

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
				setUser(user.name);
			})
			.catch((e) => console.log(e));
	}, [params.id]);

	return (
		<>
			{token ? (
				<div className="profile">
					{user ? (
						<h1>Bem vindo ao perfil do usuário {user}</h1>
					) : (
						<p>Carregando</p>
					)}
					<LikedPosts user={user} />
				</div>
			) : (
				<AccessDenied />
			)}
		</>
	);
};
