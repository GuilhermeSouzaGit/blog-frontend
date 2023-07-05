import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";

export const Home = () => {
	return (
		<div>
			<Navbar linkRoute="/login" btnText="Entrar" />
		</div>
	);
};
