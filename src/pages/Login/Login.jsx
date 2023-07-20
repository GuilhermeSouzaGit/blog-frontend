import React, { useContext, useState } from "react";
import { Input } from "../../components/Input/Input";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const { login } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("https://troubled-sheath-dress-bass.cyclic.app/users/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => {
				if (res.status === 200) return res.json();
			})
			.then(({ token, userId }) => {
				login(token, userId);
				navigate("/posts/");
			})
			.catch((err) => console.log(err));
	};

	console.log(formData);

	return (
		<>
			<Navbar linkRoute="/register" btnText="Registrar-se" />
			<div className="form-container">
				<form action="" onSubmit={handleSubmit}>
					<Input
						type="email"
						name="email"
						placeholder="Digite seu e-mail"
						labelName="E-mail:"
						value={formData.email}
						onChange={handleChange}
					/>
					<Input
						type="password"
						name="password"
						placeholder="Digite sua senha"
						labelName="Senha:"
						value={formData.password}
						onChange={handleChange}
					/>

					<button type="submit" className="btn btn-login">
						Entrar
					</button>
				</form>
			</div>
		</>
	);
};
