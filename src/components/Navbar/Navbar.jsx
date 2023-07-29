import React, { useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { DarkModeBtn } from "../DarkModeBtn/DarkModeBtn";
import { GiSpiderWeb } from "react-icons/gi";

// eslint-disable-next-line react/prop-types
export const Navbar = ({ linkRoute, btnText }) => {
	const { logout } = useContext(AuthContext);
	const { token, usersId, admin } = useAuth();

	const navigate = useNavigate();

	const handleLogout = () => {
		logout;
		navigate("/");
		document.location.reload();
	};

	return (
		<>
			{token ? (
				<nav className="navbar-container">
					<a href="/posts/">
						<h1>
							<GiSpiderWeb /> Blog
						</h1>
					</a>
					<ul className="navbar-content">
						<li>
							<Link to={"/posts/"}>
								<button className="btn btn-navbar">
									Início
								</button>
							</Link>
						</li>
						<li>
							<Link to={`/user/${usersId}`}>
								<button className="btn btn-navbar">
									Perfil
								</button>
							</Link>
						</li>
						{admin ? (
							<li>
								<Link to={"/post/create"}>
									<button className="btn btn-navbar">
										Criar Post
									</button>
								</Link>
							</li>
						) : (
							""
						)}
						<li>
							<Link>
								<button
									className="btn btn-navbar"
									onClick={handleLogout}
								>
									Sair
								</button>
							</Link>
						</li>
						<li>
							<DarkModeBtn />
						</li>
					</ul>
				</nav>
			) : (
				<nav className="navbar-container">
					<a href="/">
						<h1>
							<GiSpiderWeb /> Blog
						</h1>
					</a>
					<ul className="navbar-content">
						<li>
							<Link to={linkRoute}>
								<button className="btn btn-navbar">
									{btnText}
								</button>
							</Link>
						</li>
						<li>
							<DarkModeBtn />
						</li>
					</ul>
				</nav>
			)}
		</>
	);
};
