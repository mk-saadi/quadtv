import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "./CartProvider";
import useToast from "../hook/useToast";
import Toast from "../hook/Toast";
import { Dialog, Transition } from "@headlessui/react";
import { BookMarked, MoveLeft } from "lucide-react";
import tvError from "../assets/show-error.avif";

const ShowDetail = () => {
	const { name } = useParams();
	const [show, setShow] = useState([]);
	const { addToCart } = useCart();
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	console.log("show: ", show);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${name}`);
				if (res.status === 200) {
					const data = res.data;
					setShow(data);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, [name]);

	const handleCart = () => {
		const showName = name;
		const showId = show.id;
		const showImage = show.image.medium;

		const cartItem = {
			showName,
			showId,
			showImage,
		};
		addToCart(cartItem);

		if (addToCart) {
			showToast("success", "Show booked!");
		}
	};

	let [isOpen, setIsOpen] = useState(false);
	function closeModal() {
		setIsOpen(false);
	}
	function openModal() {
		setIsOpen(true);
	}

	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}

			<div>
				<div>
					{show?.image ? (
						<img
							src={show?.image?.original}
							alt=""
							className="w-full h-96 object-cover group-hover:scale-110 duration-500 group-hover:opacity-90"
						/>
					) : (
						<img
							src={tvError}
							alt="Default Image"
							className="w-full h-96 object-cover group-hover:scale-110 duration-500 group-hover:opacity-90"
						/>
					)}
				</div>
				<p>{show.name}</p>

				<div>
					<button
						onClick={openModal}
						className="flex px-3 py-2 mt-6 text-gray-800 rounded-md shadow-md  bg-cyan-300/70 drop-shadow-md active:scale-95 gap-x-1.5"
					>
						<span className="sr-only">Book show</span>
						<BookMarked />
						Book show
					</button>
				</div>
			</div>

			{/* modal */}
			<Transition
				appear
				show={isOpen}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={closeModal}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden overflow-y-auto text-left align-middle transition-all transform bg-white rounded-none shadow-xl">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Book this show?
									</Dialog.Title>

									{/* modal body below */}
									<div className="mt-2">
										<div>
											<div>
												<p>{show.name}</p>
											</div>
											<div className="flex justify-between w-full mt-4 col-span-full gap-x-12">
												<div className="w-full">
													<button
														type="button"
														className="flex justify-center goBack"
														onClick={closeModal}
													>
														<MoveLeft />
													</button>
												</div>

												<button
													onClick={handleCart}
													className="submitButton"
												>
													Book now
												</button>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default ShowDetail;
