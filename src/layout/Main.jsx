import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Main = () => {
	return (
		<div>
			<div className="fixed-top-0 w-full">
				<Navbar />
			</div>
			<Outlet />
		</div>
	);
};

export default Main;
