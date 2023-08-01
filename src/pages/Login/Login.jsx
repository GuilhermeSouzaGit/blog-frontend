/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from "react";
import { Input } from "../../components/Input/Input";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { WarningMessage } from "../../components/WarningMessage/WarningMessage";

export const Login = () => {
	const inputRef = useRef({});
	const { login } = useContext(AuthContext);
	const [message, setMessage] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = inputRef.current;
		fetch("https://troubled-sheath-dress-bass.cyclic.app/users/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				email: email.value,
				password: password.value,
			}),
		})
			.then((res) => {
				const status = res.status;
				return res.json().then((data) => ({ status, data }));
			})
			.then(({ status, data }) => {
				const { token, userId, admin, message } = data;
				if (status === 422) {
					setMessage(message);
				} else {
					login(token, userId, admin);
					navigate("/posts/");
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Navbar linkRoute="/register" btnText="Registrar-se" />
			{message ? <WarningMessage message={message} /> : ""}
			<div className="form-container">
				<form action="" onSubmit={handleSubmit}>
					<Input
						type="email"
						name="email"
						placeholder="Digite seu e-mail"
						labelName="E-mail:"
						id="email"
						ref={(element) => (inputRef.current["email"] = element)}
					/>
					<Input
						type="password"
						name="password"
						placeholder="Digite sua senha"
						labelName="Senha:"
						id="password"
						ref={(element) =>
							(inputRef.current["password"] = element)
						}
					/>
					<button type="submit" className="btn btn-login">
						Entrar
					</button>
				</form>
			</div>
		</>
	);
};
