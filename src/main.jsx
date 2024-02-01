import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./layout/Main";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import { CartProvider } from "./pages/CartProvider";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/:name",
				element: <ShowDetail />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CartProvider>
			<div className="flex flex-col min-h-screen bg-white">
				<RouterProvider router={router} />
			</div>
		</CartProvider>
	</React.StrictMode>
);
