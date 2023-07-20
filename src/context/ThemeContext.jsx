/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [darkTheme, setDarkTheme] = useState(
		localStorage.getItem("darkTheme") === "true"
	);

	useEffect(() => {
		localStorage.setItem("darkTheme", darkTheme);
		if (darkTheme) {
			document.documentElement.setAttribute("data-theme", "dark");
		} else {
			document.documentElement.removeAttribute("data-theme");
		}
	}, [darkTheme]);

	const toggleTheme = () => {
		setDarkTheme((prevTheme) => !prevTheme);
	};

	return (
		<ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
