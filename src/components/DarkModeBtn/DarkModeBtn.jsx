import React, { useContext } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { ThemeContext } from "../../context/ThemeContext";

export const DarkModeBtn = () => {
	const { darkTheme, toggleTheme } = useContext(ThemeContext);

	return (
		<>
			{darkTheme ? (
				<button className="dark-mode-btn" onClick={toggleTheme}>
					<MdOutlineLightMode size={30} color="#fff" />
				</button>
			) : (
				<button className="dark-mode-btn" onClick={toggleTheme}>
					<MdOutlineDarkMode size={30} />
				</button>
			)}
		</>
	);
};
