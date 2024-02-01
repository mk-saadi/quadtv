import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BookMarked, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "./CartProvider";

const Cart = () => {
	const [open, setOpen] = useState(false);

	const { cartItems, dispatch } = useCart();
	console.log("cartItems: ", cartItems);

	const handleRemove = (showName) => {
		console.log("showName: ", showName);
		dispatch({ type: "REMOVE_FROM_CART", payload: showName });
	};

	return (
		<>
			<div>
				<button
					type="button"
					className="relative flex items-center justify-start p-1 text-gray-700 bg-white rounded-full gap-x-px focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
					onClick={() => setOpen(true)}
				>
					<span className="absolute -inset-1.5" />
					<span className="sr-only">open cart</span>
					<BookMarked
						className="w-6 h-6"
						aria-hidden="true"
					/>

					<span className="ml-2 text-sm font-medium text-[#fab07a]">{cartItems.length}</span>
				</button>
			</div>

			<Transition.Root
				show={open}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="w-screen max-w-md pointer-events-auto">
										<div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
											<div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
												<div className="flex items-start justify-between">
													<Dialog.Title className="text-lg font-medium text-gray-900">
														Booking list
													</Dialog.Title>
													<div className="flex items-center ml-3 h-7">
														<button
															type="button"
															className="relative p-2 -m-2 text-gray-400 hover:text-gray-500"
															onClick={() => setOpen(false)}
														>
															<span className="absolute -inset-0.5" />
															<span className="sr-only">Close panel</span>
															<X
																className="w-6 h-6"
																aria-hidden="true"
															/>
														</button>
													</div>
												</div>

												<div className="mt-8">
													<div className="flow-root">
														<ul
															role="list"
															className="-my-6 divide-y divide-gray-200"
														>
															{cartItems.map((product) => (
																<li
																	key={product.id}
																	className="flex py-6"
																>
																	<div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
																		<img
																			src={product.showImage}
																			alt={product.showName}
																			className="object-cover object-center w-full h-full"
																		/>
																	</div>

																	<div className="flex flex-col flex-1 ml-4">
																		<div>
																			<div className="flex justify-between text-base font-medium text-gray-900">
																				<h3>
																					<Link
																						className="hover:underline"
																						to={`/${product.showName}`}
																					>
																						{product.showName}
																					</Link>
																				</h3>
																				<button
																					type="button"
																					className="font-medium text-amber-600 hover:text-amber-500 hover:underline"
																					onClick={() =>
																						handleRemove(
																							product.showName
																						)
																					}
																				>
																					Remove
																				</button>
																			</div>
																		</div>
																	</div>
																</li>
															))}
														</ul>
													</div>
												</div>
											</div>

											<div className="px-4 py-6 border-t border-gray-200 sm:px-6">
												{cartItems && (
													<>
														<div className="flex justify-between text-base font-medium text-gray-900">
															<p>Total booked show {cartItems.length}</p>
														</div>
													</>
												)}
												<div className="flex justify-center mt-6 text-sm text-center text-gray-500">
													<p>
														or
														<button
															type="button"
															className="ml-2 font-medium text-amber-600 hover:text-amber-500"
															onClick={() => setOpen(false)}
														>
															Continue browsing
															<span aria-hidden="true"> &rarr;</span>
														</button>
													</p>
												</div>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default Cart;
