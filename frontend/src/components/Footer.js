import React from "react";
import {
	MDBFooter,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
	return (
		<MDBFooter
			className="text-center text-lg-start text-light pt-5"
			style={{ backgroundColor: "	rgb(80,80,80)" }}
		>
			<section className=" ">
				<MDBContainer className="text-center text-md-start mt-5">
					<MDBRow className="mt-3">
						<MDBCol md="3" lg="5" xl="3" className="mx-auto mb-4">
							<h6 className="text-uppercase fw-bold mb-4">
								<MDBIcon
									color="secondary"
									icon="gem iconHover"
									className="me-3"
								/>
								<span style={{ color: "white" }}>Neo</span>
								<span style={{ color: "#DAA520" }}>TRADE</span>
							</h6>
							{/* <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit.
              </p> */}
						</MDBCol>

						<MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
							<h6 className="text-uppercase fw-bold mb-4">
								Products
							</h6>
							<p>
								<a href="#!" className="text-reset">
									Gold
								</a>
							</p>
							<p>
								<a href="#!" className="text-reset">
									Silver
								</a>
							</p>
						</MDBCol>

						<MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
							<h6 className="text-uppercase fw-bold mb-4">
								Useful links
							</h6>
							<p>
								<a href="#!" className="text-reset">
									Pricing
								</a>
							</p>
							<p>
								<a href="#!" className="text-reset">
									Settings
								</a>
							</p>
							<p>
								<a href="#!" className="text-reset">
									Orders
								</a>
							</p>
							<p>
								<a href="#!" className="text-reset">
									Help
								</a>
							</p>
						</MDBCol>

						<MDBCol
							md="1"
							lg="3"
							xl="3"
							className="mx-auto mb-md-0 mb-4"
						>
							<h6 className="text-uppercase fw-bold mb-4">
								Contact
							</h6>
							<p>
								<MDBIcon
									color="secondary"
									icon="home iconHover"
									className="me-2"
								/>
								Pune, Hinjewadi, India
							</p>
							<p>
								<MDBIcon
									color="secondary"
									icon="envelope iconHover"
									className="me-3"
								/>
								<a
									href="mailto:Neotrade@gmail.com"
									style={{
										color: "white",
										textDecoration: "None",
									}}
								>
									Neotrade@gmail.com
								</a>
							</p>
							<p>
								<MDBIcon
									color="secondary"
									icon="phone iconHover"
									className="me-3"
								/>{" "}
								+ 021 98654364
							</p>
							<p>
								<MDBIcon
									color="secondary"
									icon="print iconHover"
									className="me-3"
								/>{" "}
								+ 021 67843467
							</p>
						</MDBCol>

						<MDBCol md="2" lg="1" xl="1" className="mx-auto mb-4">
							<div style={{ display: "inline-block" }}>
								<div>
									<a
										href="https://facebook.com"
										target="_blank"
										className="me-4 text-reset "
										rel="noreferrer"
									>
										<MDBIcon
											color="secondary"
											fab
											icon="facebook-f"
											className="iconHover"
											size="lg"
										/>
									</a>
								</div>
								<div>
									<a
										href="https://twitter.com"
										target="_blank"
										className="me-4 text-reset"
										rel="noreferrer"
									>
										<MDBIcon
											color="secondary"
											fab
											icon="twitter"
											className="iconHover"
											size="lg"
										/>
									</a>
								</div>
								<div>
									<a
										href="https://google.com"
										target="_blank"
										className="me-4 text-reset"
										rel="noreferrer"
									>
										<MDBIcon
											color="secondary"
											fab
											icon="google"
											className="iconHover"
											size="lg"
										/>
									</a>
								</div>
								<div>
									<a
										href="https://instagram.com"
										target="_blank"
										className="me-4 text-reset"
										rel="noreferrer"
									>
										<MDBIcon
											color="secondary"
											fab
											icon="instagram"
											className="iconHover"
											size="lg"
										/>
									</a>
								</div>
								<div>
									<a
										href="https://in.linkedin.com"
										target="_blank"
										className="me-4 text-reset"
										rel="noreferrer"
									>
										<MDBIcon
											color="secondary"
											fab
											icon="linkedin"
											className="iconHover"
											size="lg"
										/>
									</a>
								</div>
							</div>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</section>

			<div
				className="text-center p-4"
				style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
			>
				© 2021 Copyright :
				<a className="text-reset fw-bold" href="https://facebook.com/">
					NeoTrade.com
				</a>
			</div>
		</MDBFooter>
	);
}
