import React, { useContext } from "react";
import "./Navbar.css";
import Logo from "../../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// eslint-disable-next-line react/prop-types
export const Navbar = ({ linkRoute, btnText }) => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout;
		navigate("/");
	};

	return (
		<nav className="navbar-container">
			<a href="#">
				<img src={Logo} alt="" />
			</a>
			<ul className="navbar-content">
				<li>
					<Link to={linkRoute}>
						<button
							className="btn btn-navbar"
							onClick={handleLogout}
						>
							{btnText}
						</button>
					</Link>
				</li>
			</ul>
		</nav>
	);
};
