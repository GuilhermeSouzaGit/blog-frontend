/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(() => {
		const token = cookies.get("token");
		return token ? token : "";
	});
	const [usersId, setUsersId] = useState(() => {
		const usersId = cookies.get("userID");
		return usersId ? usersId : "";
	});

	const login = useMemo(
		() => (token, userId) => {
			cookies.set("token", token);
			setToken(token);
			cookies.set("userID", userId);
			setUsersId(userId);
		},
		[]
	);

	const logout = () => {
		cookies.remove("token");
	};

	const context = useMemo(
		() => ({
			token,
			login,
			logout,
			usersId,
		}),
		[token, login, logout, usersId]
	);

	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
