import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./AboutGns.css";

export default function Aboutgns() {
	return (
		<div>
			<Navbar />
			<div style={{ marginTop: "5px" }}>
				<section
					className="py-4 border-bottom text-center pb-4"
					style={{ background: "#b8565f" }}
				>
					<div className="container">
						<div className="row">
							<div className="col-md-12 myp-auto ">
								<h2 className="text-white p-5">
									{" "}
									About Gold and Silver Trading{" "}
								</h2>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div style={{ marginTop: "80px" }}>
				<div className="row">
					<div className="col-sm-4 d-flex justify-content-center">
						<div className="flip-card ">
							<div className="flip-card-inner">
								<div className="flip-card-front">
									{/* <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;"> */}
									<img
										src="images/22.jpg"
										alt="BigCo Inc. logo"
										className="img-fluid"
									/>
									<h4 className="mt-4">How it works?</h4>
								</div>
								<div className=" p-5 flip-card-back">
									NeoTrade allows you to tailor your investing
									experience to fit your individual needs.
									NeoTrade customers have the unique option of
									buying immediately, pre-funding, and the
									ability to transact 24/7.
								</div>
							</div>
						</div>
					</div>

					<div className="col-sm-4 d-flex justify-content-center">
						<div className="flip-card">
							<div className="flip-card-inner">
								<div className="flip-card-front">
									<img
										src="images/16.jpg"
										alt="BigCo Inc. logo"
										className="img-fluid"
									/>
									<h4 className="mt-4">
										Gold and Silver Simplified
									</h4>
								</div>
								<div className=" p-5 flip-card-back">
									NeoTrade gives you direct ownership of
									vaulted gold and silver at an ultra-low
									cost. A free account will provide you with
									24/7 access, a best-in-class user
									experience, and the peace of mind that comes
									through dealing with industry.
								</div>
							</div>
						</div>
					</div>

					<div className="col-sm-4 d-flex justify-content-center ">
						<div className="flip-card bg-light">
							<div className="flip-card-inner">
								<div className="flip-card-front">
									<img
										src="images/17.jpg"
										alt="BigCo Inc. logo"
										className="img-fluid"
									/>
									<h4 className="mt-4">
										The Choice Is Clear
									</h4>
								</div>
								<div className="flip-card-back p-5">
									When compared to more traditional forms of
									investing, NeoTrade provides a superior
									experience in terms of cost, convenience,
									and security. See for yourself.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className="section bg-c-light border-bottom py-4">
				<div className="container">
					<h3 className="main-heading"> Gold-Silver Ratio Trade. </h3>
					<div className="underline" />
					<p>
						The Gold-Silver Ratio, or GSR, indicates the price of
						gold relative to silver and is calculated as the price
						of gold divided by the price of silver on a
						per-troy-ounce basis. It reflects how many ounces of
						silver a single ounce of gold is worth. Effectively, the
						gold-silver ratio represents the number of ounces of
						silver it takes to buy a single ounce of gold. For the
						hard-asset enthusiast, the gold-silver ratio is common
						parlance. For the average investor, it represents an
						arcane metric that is anything but well known. The fact
						is that a substantial profit potential exists in some
						established strategies that rely on this ratio. Here"s
						how investors and traders can benefit from observed
						changes in the gold-silver ratio.
					</p>
					<p>
						Effectively, the gold-silver ratio represents the number
						of ounces of silver it takes to buy a single ounce of
						gold. For the hard-asset enthusiast, the gold-silver
						ratio is common parlance. For the average investor, it
						represents an arcane metric that is anything but well
						known. The fact is that a substantial profit potential
						exists in some established strategies that rely on this
						ratio. Here"s how investors and traders can benefit from
						observed changes in the gold-silver ratio.
					</p>
					<h3 className="main-heading">
						{" "}
						Gold-Silver Ratio History.{" "}
					</h3>
					<p>
						The gold-silver ratio has fluctuated in modern times and
						never remains the same. That"s mainly due to the fact
						that the prices of these precious metals experience wild
						swings on a regular, daily basis. But before the 20th
						century, governments set the ratio as part of their
						monetary stability policies.
					</p>
					<p>
						Here"s a quick overview of the history of this ratio:
						<ul>
							<li>
								2022: In 2021-2022, the ratio has fluctuated
								greatly, ranging between around 65 and 95.
							</li>
							<li>
								2020: For the year, the gold-silver ratio peaked
								at 114.77, the highest it"s ever been since
								1915.
							</li>
							<li>
								1991: When silver hit record lows, the ratio
								peaked at nearly 100.
							</li>
							<li>
								1980: At the time of the last great surge in
								gold and silver, the ratio stood at about 15.
							</li>
							<li>
								1834-1862: Congress moved to change the ratio to
								16 from 15.
							</li>
							<li>
								1792-1834: The U.S. operated a bimetallic
								standard, with a fixed ratio of 15
							</li>
						</ul>
					</p>
					<h3 className="main-heading">
						Why Does the Gold-Silver Ratio Matter to Investors?
					</h3>
					<p>
						Despite not having a fixed ratio, the gold-silver ratio
						is still a popular tool for precious metals traders.
						They can, and still do, use it to hedge their bets in
						both metals—taking a long position in one while keeping
						a short position in the other metal. So when the ratio
						is higher and investors believe it will drop along with
						the price of gold compared to silver, they may decide to
						buy silver and take a short position in the same amount
						of gold.
					</p>
					<p>
						So why is this ratio so important for investors and
						traders? If they can anticipate where the ratio is going
						to move, investors can make a profit even if the price
						of the two metals falls or rises.
					</p>
				</div>
			</section>
			<br />

			<Footer />
		</div>
	);
}
