import React from "react";
import Card from "react-bootstrap/Card";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AboutUs() {
	return (
		<div className="bg-light">
			<Navbar />

			<section
				className="py-4 border-bottom text-center pb-4"
				style={{ background: "#b8565f" }}
			>
				<div className="container">
					<div className="row">
						<div className="col-md-12 myp-auto ">
							<h2 className="text-white p-5"> About Us </h2>
						</div>
					</div>
				</div>
			</section>

			<div className="row mt-5">
				<div className="col-md-6">
					<div className="about.img ">
						<img
							alt="img"
							src="https://www.digigold.com/media/original/public/content/8NPLkYC72M5kcx0m1fixjz4VyU0LeCHpHucjjH0L.png"
						/>
					</div>
				</div>
				<div className="col-md-6">
					<h1 className="mt-5 text-danger">
						{" "}
						Get access to the most trusted digital platform.{" "}
					</h1>
					<span style={{ color: "Black" }}>Neo</span>
					<span style={{ color: "#DAA520" }}>TRADE</span>{" "}
					<h5>
						is India’s most trusted digital platform for Gold and
						Silver where you can buy, sell and store online at live
						market rates. The minimum amount of purchase starts from
						just Rs 1. We also offer no lock-in period SIP in Gold
						with just starting Rs. 500 through periodic
						installments, which means that this systematic
						investment in the precious metal can give you the best
						return outputs!
					</h5>
				</div>
			</div>

			<section className="about-digigold">
				<div className="container mt-3">
					<h6
						style={{
							fontFamily: "Verdana, Arial, Helvetica, sans-serif",
						}}
					>
						We assure you of the quality by serving 24 Karat Pure
						Gold of 99.9% purity with certifications, the caliber
						you can never doubt. Secured payments, documents, and
						storage of valuables are fully guaranteed by{" "}
						<span style={{ color: "Black" }}>Neo</span>
						<span style={{ color: "#DAA520" }}>TRADE</span> because
						we believe in building bonds with trust. We have the
						vision to make Gold and Silver available to all with
						this digital platform along with minimizing the hurdles
						of physical purchase and selling.
					</h6>
				</div>
			</section>

			<section className="our vision section">
				<div className="container">
					<h2 className="mt-5 text-danger"> Our Vision </h2>

					<p
						style={{
							fontFamily: "Verdana, Arial, Helvetica, sans-serif",
						}}
					>
						<strong> Inovation by Tecnology and Insights: </strong>"
						We are the pioneers and changers of gaming, always at
						the forefront of cutting-edge innovation and bringing
						positive technology-based disruption to the markets we
						join. In leveraging insights for price discovery, we"re
						ahead of the curve"
					</p>

					<p
						style={{
							fontFamily: "Verdana, Arial, Helvetica, sans-serif",
						}}
					>
						<strong> Cooperative Leadership : </strong>" For the
						overall improvement of our partners in the gold
						ecosystem, we question stereotypes, function with
						conﬁdence, and take bold decisions that often change the
						status quo. We believe in a growth model based upon a
						win-win relationship."
					</p>

					<p
						style={{
							fontFamily: "Verdana, Arial, Helvetica, sans-serif",
						}}
					>
						<strong> Integrity: </strong>" To all our stakeholders,
						we are ethical, transparent, and equitable. Providing
						the fair real value gold to all our consumerse"
					</p>
				</div>
			</section>

			<div
				className="value-wealth pt-5 mt-5"
				style={{ background: "#b8565f" }}
			>
				<h2 style={{ color: "white", textAlign: "center" }}>
					{" "}
					Why Choose Us?{" "}
				</h2>

				<div className="row mt-5 ms-5">
					<div className="col-lg-4 col-xs-12 ">
						<div
							className="value-wealth-block"
							style={{ hight: "253" }}
						>
							<div className="icon">
								<img
									alt="img11"
									src="https://digigold.com/media/original/public/content/WqvQKsjSe1HhTZ6bwHOak2pGfUH4vgx2uOgt9gR8.png"
								/>
							</div>

							<h3 className="mt-2" style={{ color: "white" }}>
								{" "}
								Quality Products
							</h3>

							<p style={{ color: "white" }}>
								DIGIGOLD has built a market identity solely
								based on its strong reputation for having the
								finest purity, packaging, and logistics
								representation.
							</p>
						</div>
					</div>

					<div className="col-sm-4 col-xs-12">
						<div
							className="value-wealth-block"
							style={{ hight: 253 }}
						>
							<div className="icon">
								<img
									alt="img10"
									src="https://digigold.com/media/original/public/content/8NsfF9WKENLmPeRaacrpOFEk419HrWrf25VCrnY8.png"
								/>
							</div>

							<h3 className="mt-2" style={{ color: "white" }}>
								{" "}
								Pure & Right Price{" "}
							</h3>

							<p style={{ color: "white" }}>
								DIGIGOLD"s pricing is the benchmark in the
								country, demonstrating the company"s commitment
								to being the most competitive and efficient.
							</p>
						</div>
					</div>

					<div className="col-sm-4 col-xs-12">
						<div
							className="value-wealth-block"
							style={{ hight: 253 }}
						>
							<div className="icon">
								<img
									alt="img9"
									src="https://digigold.com/media/original/public/content/G46dyfNcyFFLw3MyZkjGO5qtmQrq5IIFPFJH4uIn.png"
								/>
							</div>

							<h3 className="mt-2" style={{ color: "white" }}>
								{" "}
								The large Scale Of Operation{" "}
							</h3>

							<p style={{ color: "white" }}>
								Its scale of operation allows it to reduce
								overall expenses, which are then passed on to
								consumers.
							</p>
						</div>
					</div>

					<div className="col-sm-4 col-xs-12">
						<div
							className="value-wealth-block"
							style={{ hight: 253 }}
						>
							<div className="icon">
								<img
									alt="img8"
									src="https://digigold.com/media/original/public/content/fMZbQ7qx5Nl83KCbLNoJm2vtXeFZzUhszLX6xrDE.png"
								/>{" "}
							</div>

							<h3 className="mt-2" style={{ color: "white" }}>
								{" "}
								Cost-Effectiveness
							</h3>

							<p style={{ color: "white" }}>
								It is the most cost-effective due to the smart
								use of technologies and production efficiency..
							</p>
						</div>
					</div>

					<div className="col-sm-4 col-xs-12">
						<div
							className="value-wealth-block"
							style={{ hight: 253 }}
						>
							<div className="icon">
								<img
									alt="img7"
									src="https://digigold.com/media/original/public/content/f3kQdRjolh6REq3slB8nMN0UUAUzctPkzB2crntM.png"
								/>
							</div>

							<h3 className="mt-2" style={{ color: "white" }}>
								{" "}
								Easy And Fast Online Process
							</h3>

							<p style={{ color: "white" }}>
								We make sure that the method of purchasing,
								selling, and redeeming products is as simple as
								possible. We are ever ready to help our
								consumers anywhere and at any time.
							</p>
						</div>
					</div>

					<div className="col-sm-4 col-xs-12">
						<div
							className="value-wealth-block"
							style={{ hight: 253 }}
						>
							<div className="icon">
								<img
									alt="img"
									src="https://digigold.com/media/original/public/content/jmLgfFulPWnizWRaxiIQWNqVecaGH56iCEAhJxw1.png"
								/>
							</div>

							<h3 className="mt-2" style={{ color: "white" }}>
								{" "}
								100% Transparency
							</h3>

							<p style={{ color: "white" }}>
								With us, it"s all about transparency. There are
								no hidden charges to worry about. Also, rest
								assured that you will be provided with all
								information upfront.
							</p>
						</div>
					</div>
				</div>
			</div>

			<section className=" parter-support mt-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-2 col-md-3">
							<h4
								className="section-title"
								style={{ color: "red" }}
							>
								Trust And Support of
							</h4>
						</div>

						<div className="col-lg-10 col-mg-9 ">
							<div className="partner-support-slider slick-initialized slick-slider">
								<div className="slick-list draggable">
									<div className="slick-track stepCard">
										{/* <div classname="img-item slick-slide slick-cloned" > */}
										<img
											src="https://digigold.com/media/original/public/content/O1nqiy3Y8nO0uAjBUeHOtBnZk8wR2cG4tmBBXdA3.png"
											alt="company-brand-img"
										/>

										{/* </div> */}

										{/* <div classname="img-item slick-slide slick-cloned"> */}
										<img
											src="https://digigold.com/media/original/public/content/3eHBnFtcxXNWxLL9CU2gbCn64UKUvjoU1SmVuL8c.png"
											alt="company-brand-img"
										/>
										{/* </div> */}

										{/* <div className="img-item slick-slide slick-cloned"> */}
										<img
											src="https://digigold.com/media/original/public/content/uBA1xcu4CoDw0jcn2RnaTzU2Sw1hWXChZCKiL3zp.png"
											alt="company-brand-img"
										/>
										{/* </div> */}

										{/* <div classname="img-item slick-slide slick-cloned"> */}
										<img
											src="https://digigold.com/media/original/public/content/QLYKPg6XrxxxceTNqu96ODWsP74ofjWUAZHezNCr.png"
											alt="company-brand-img"
										/>
										{/* </div> */}

										{/* <div classname="img-item slick-slide slick-cloned"> */}
										<img
											src="https://www.digigold.com/media/original/public/content/I2AzIJXenrwE0jpiaX8mD469J8mIBwrVZgsg7Hbp.png"
											width="150"
											height="150"
											alt=""
										/>
										{/* </div> */}

										{/* <div classname="img-item slick-slide"> */}
										<img
											src="https://digigold.com/media/original/public/content/XOP6gz4QExwsq8gN9ys8iPujDzLcIdo1hATscm0v.png"
											alt="company-brand-img"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="container mt-5" style={{ textAlign: "center" }}>
				<h2 className="main-heading mb-5">
					{" "}
					<span style={{ color: "Black" }}>Neo</span>
					<span style={{ color: "#DAA520" }}>TRADE</span> In The News{" "}
				</h2>
				<div className="underline" />
			</div>

			<div className="row mb-5">
				<div className="col-md-4 d-flex justify-content-center hover">
					<Card
						style={{ width: "18rem", textAlign: "center" }}
						className="stepCard"
					>
						<Card.Img
							variant="top"
							src="https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=600"
						/>
						<Card.Body>
							<Card.Title>
								{" "}
								Gold Glitters Amid Positive Employment News{" "}
							</Card.Title>
							<Card.Text>
								This is a wider card with supporting text below
								as a natural lead-in to additional content. This
								content is a little bit longer.
							</Card.Text>
						</Card.Body>
					</Card>
				</div>

				<div className="col-md-4 d-flex justify-content-center hover">
					<Card
						style={{ width: "18rem", textAlign: "center" }}
						className="stepCard"
					>
						<Card.Img
							variant="top"
							src="https://images.pexels.com/photos/8369687/pexels-photo-8369687.jpeg?auto=compress&cs=tinysrgb&w=600"
						/>
						<Card.Body>
							<Card.Title>
								{" "}
								Gold and Silver See Little Weekly Change, Yearly
								Gains{" "}
							</Card.Title>
							<Card.Text>
								This is a wider card with supporting text below
								as a natural lead-in to additional content. This
								content is a little bit longer.
							</Card.Text>
						</Card.Body>
					</Card>
				</div>

				<div className="col-md-4 d-flex justify-content-center hover">
					<Card
						style={{ width: "18rem", textAlign: "center" }}
						className="stepCard"
					>
						<Card.Img
							variant="top"
							src="https://images.pexels.com/photos/8369695/pexels-photo-8369695.jpeg?auto=compress&cs=tinysrgb&w=600"
						/>
						<Card.Body>
							<Card.Title>
								{" "}
								Gold and Silver Oscillate Between Gains and
								Losses on Mixed Economic News{" "}
							</Card.Title>
							<Card.Text>
								This is a wider card with supporting text below
								as a natural lead-in to additional content. This
								content is a little bit longer.
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			</div>

			<section className="py-4 border-bottom">
				<div className="container review text-center">
					{/* <div className="row"> */}
					{/* <div className="col-md-8 myp-auto"> */}
					<h2>
						{" "}
						<span style={{ color: "Black" }}>Neo</span>
						<span style={{ color: "#DAA520" }}>TRADE</span> Customer
						Reviews{" "}
					</h2>
					<p>
						Over 5,000 five star ratings on Shopper Approved.
						Excellent customer experience sets{" "}
						<span style={{ color: "Black" }}>Neo</span>
						<span style={{ color: "#DAA520" }}>TRADE</span> apart
						from the competition.
					</p>
					{/* </div> */}
					<div className="col-md-8 my-auto">
						{/* <h6 className="float-end"/> */}
					</div>
					{/* </div> */}
				</div>
			</section>

			<div className="row mb-5">
				<div className="col-md-3 d-flex justify-content-center hover">
					<Card
						style={{ width: "18rem", textAlign: "center" }}
						className="stepCard"
					>
						<Card.Body>
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star-half-alt fa-lg text-warning " />
							<br />
							<div>
								<h5 className="mt-3">Mary Harrison</h5>
							</div>
							<h5>MD,United State</h5>
							<Card.Text className="mt-5">
								{" "}
								I always have had a great experience with
								GS.com. Now that there"s so much more of a
								demand for silver it may take a little more time
								for orders, but even that being the case the
								customer service and quality of the silver
								rounds purchased are 100% immaculate.{" "}
							</Card.Text>
						</Card.Body>

						<Card.Footer>
							<small className="text-muted"> Aug 12,2022</small>
						</Card.Footer>
					</Card>
				</div>

				<div className="col-md-3 d-flex justify-content-center hover">
					<Card
						style={{ width: "18rem", textAlign: "center" }}
						className="stepCard"
					>
						<Card.Body>
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<br />
							<div>
								<h5 className="mt-3">Gary Nelson</h5>
							</div>
							<h5>AZ,United Kingdom</h5>
							<Card.Text className="mt-5">
								{" "}
								GoldSilver is my number resource for precious
								metals. With my many orders, I find their
								products to be high quality and their service
								exceeds my expectations with their friendliness
								and speediness.{" "}
							</Card.Text>
						</Card.Body>

						<Card.Footer>
							<small className="text-muted">30 Dec,2022</small>
						</Card.Footer>
					</Card>
				</div>

				<div className="col-md-3 d-flex justify-content-center hover">
					<Card
						style={{ width: "18rem", textAlign: "center" }}
						className="stepCard"
					>
						<Card.Body>
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className=" " />
							<br />
							<div>
								<h5 className="mt-3">Ronaldo Wilkinson</h5>
							</div>
							<h5>Florida,Unites State</h5>
							<Card.Text className="mt-5">
								{" "}
								This is our second time buying silver from
								GoldSilver. This time we opted to get pure .999
								silver that was the companies choice and a
								little less than minted coins. We were very
								pleased we got all brand new coins that were
								really cool looking. We will be buying from them
								again!{" "}
							</Card.Text>
						</Card.Body>

						<Card.Footer>
							<small className="text-muted">1 Jan,2023</small>
						</Card.Footer>
					</Card>
				</div>

				<div className="col-md-3 d-flex justify-content-center hover">
					<Card
						style={{ width: "18rem", textAlign: "center" }}
						className="stepCard"
					>
						<Card.Body>
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star fa-lg text-warning " />
							<div className="fas fa-star-half-alt fa-lg text-warning " />
							<br />
							<div>
								<h5 className="mt-3">Deanna Simpson</h5>
							</div>
							<h5>Arkansa,United Kindom</h5>
							<Card.Text className="mt-5">
								{" "}
								I am very happy with the follow-through efforts
								at GoldSilver. They sent me email responses
								whenever I asked a question, a confirmation
								email when I placed an order, another email when
								I sent in my photo ID, status reports letting me
								know{" "}
							</Card.Text>
						</Card.Body>

						<Card.Footer>
							<small className="text-muted">10 Jan 2023</small>
						</Card.Footer>
					</Card>
				</div>
			</div>
			<Footer />
		</div>
	);
}
