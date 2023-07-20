import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Input } from "../../components/Input/Input";
import "./Register.css";

export const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmpassword: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = () => {};

	return (
		<>
			<Navbar linkRoute="/login" btnText="Entrar" />
			<div className="register-container">
				<h1>Vamos criar sua conta!</h1>
				<form action="" onSubmit={handleSubmit}>
					<Input
						type="text"
						name="name"
						placeholder="Digite seu nome"
						labelName="Nome:"
						value={formData.name}
						onChange={handleChange}
					/>
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
					<Input
						type="password"
						name="password"
						placeholder="Confirme a sua senha"
						labelName="Confirme sua senha:"
						value={formData.confirmpassword}
						onChange={handleChange}
					/>
					<button type="submit" className="btn btn-register">
						Criar
					</button>
					<span>*insira um e-mail válido</span>
				</form>
			</div>
		</>
	);
};
