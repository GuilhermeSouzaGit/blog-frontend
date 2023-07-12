import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import reportWebVitals from "./reportWebVitals";
import { Home } from "./pages/Home/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { AllPosts } from "./pages/AllPosts/AllPosts";
import { AuthProvider } from "./context/AuthContext";
import { Profile } from "./pages/Profile/Profile";
import { Post } from "./pages/Post/Post";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/posts/",
		element: <AllPosts />,
	},
	{
		path: "/user/:id",
		element: <Profile />,
	},
	{
		path: "/post/:id",
		element: <Post />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
