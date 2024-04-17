import React, { useContext, useRef, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Input } from "../../components/Input/Input";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { WarningMessage } from "../../components/WarningMessage/WarningMessage";
import { AuthContext } from "../../context/AuthContext";

export const Register = () => {
	const { login } = useContext(AuthContext);
	const inputRef = useRef({});
	const [message, setMessage] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, confirmPassword } = inputRef.current;
		fetch("https://wild-blue-tuna-wrap.cyclic.app/users/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				name: name.value,
				email: email.value,
				password: password.value,
				confirmPassword: confirmPassword.value,
			}),
		})
			.then((res) => {
				const status = res.status;
				return res.json().then((data) => ({ status, data }));
			})
			.then(({ status, data }) => {
				const { token, userId, message } = data;
				if (status === 422) {
					setMessage(message);
				} else {
					login(token, userId);
					navigate("/posts/");
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Navbar linkRoute="/login" btnText="Entrar" />
			{message ? <WarningMessage message={message} /> : ""}
			<div className="register-container">
				<h1>Vamos criar sua conta!</h1>
				<form action="" onSubmit={handleSubmit}>
					<Input
						type="text"
						name="name"
						placeholder="Digite seu nome"
						labelName="Nome:"
						id="name"
						ref={(element) => (inputRef.current["name"] = element)}
					/>
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
					<Input
						type="password"
						name="confirmPassword"
						placeholder="Confirme a sua senha"
						labelName="Confirme sua senha:"
						id="confirmPassword"
						ref={(element) =>
							(inputRef.current["confirmPassword"] = element)
						}
					/>
					<button type="submit" className="btn btn-register">
						Criar
					</button>
					<span>*Por favor, insira um e-mail válido</span>
				</form>
			</div>
		</>
	);
};
