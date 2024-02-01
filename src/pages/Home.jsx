import axios from "axios";
import { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import tvError from "../assets/show-error.avif";
import { Star } from "lucide-react";

const Home = () => {
	const [show, setShow] = useState([]);
	console.log("show: ", show);
	const [err, setErr] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios(" https://api.tvmaze.com/search/shows?q=all");
				if (res.status === 200) {
					const data = res.data;
					const result = data.map((da) => da.show);
					setShow(result);
				}
			} catch (error) {
				console.log(error);
				setErr("Couldn't fetch data from backend. Please reload the page.");
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<div className="md:max-w-2xl mx-auto lg:max-w-3xl xl:max-w-5xl my-8">
				<Slide
					triggerOnce
					damping={1}
					direction="up"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-5 lg:gap-x-7 xl:gap-x-10 gap-y-12 md:gap-y-8">
						{show.map((da) => (
							<Link
								to={`/${da.name}`}
								key={da.id}
								className="group hover:shadow-xl shadow-lg duration-150 shadow-gray-900/35 hover:shadow-gray-900/35 hover:scale-[1.02]"
							>
								<div className="flex flex-col bg-cyan-300/70">
									<div className="overflow-hidden">
										{da?.image?.medium ? (
											<img
												src={da?.image?.medium}
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
									<div className="py-2 px-1 text-gray-800">
										<p className="font-semibold text-xl">{da.name}</p>
										<div className="flex justify-start items-center gap-x-2 text-lg font-semibold mt-2">
											<Star />
											{da?.rating?.average ? <p>{da.rating.average}</p> : <p>0</p>}
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</Slide>
			</div>
		</>
	);
};

export default Home;
