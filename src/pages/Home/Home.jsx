import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	return (
		<div>
			<Navbar linkRoute="/login" btnText="Entrar" />
			<div className="call-to-action">
				<h1 className="cta-title">Ainda não tem uma conta?</h1>
				<h1>Crie uma agora mesmo!</h1>
				<Link to="/register">
					<button className="btn btn-cta">Registrar-se</button>
				</Link>
			</div>
		</div>
	);
};
