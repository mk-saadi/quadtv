import Cart from "../pages/Cart";

const Navbar = () => {
	return (
		<>
			<div className="bg-white flex justify-between px-8 py-1.5">
				<div>
					<h1>QuadTV</h1>
				</div>

				<div>
					<Cart />
				</div>
			</div>
		</>
	);
};

export default Navbar;
