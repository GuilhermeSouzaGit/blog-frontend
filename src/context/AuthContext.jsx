/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
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
	const [admin, setAdmin] = useState(() => {
		const admin = cookies.get("isAdmin");
		return admin ? true : false;
	});

	const login = useMemo(
		() => (token, userId, admin) => {
			cookies.set("token", token);
			setToken(token);
			cookies.set("userID", userId);
			setUsersId(userId);
			admin ? cookies.set("isAdmin", admin) : setAdmin(admin);
			setAdmin(admin);
		},
		[]
	);

	const logout = async () => {
		await cookies.remove("token");
		await cookies.remove("userID");
		await cookies.remove("isAdmin");
		setToken("");
		setUsersId("");
		setAdmin(false);
	};

	const context = useMemo(
		() => ({
			token,
			login,
			logout,
			usersId,
			admin,
		}),
		[token, login, logout, usersId]
	);

	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
