import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Navbar from "./Navbar";
import Footer from "./Footer";
// eslint-disable-next-line import/no-named-as-default
import ChartOfGold from "./ChartOfGold";
import ChartOfSilver from "./ChartOfSilver";

export default function Home() {
	return (
		<div>
			<Navbar />

			<div className="container-fluid">
				<Tabs
					defaultActiveKey="gold"
					style={{ fontSize: "20px" }}
					id="uncontrolled-tab-example"
					className="mb-3 nav nav-tabs fill "
				>
					<Tab
						className=" nav-tabs fill Gold"
						eventKey="gold"
						title="Gold"
					>
						<ChartOfGold />
					</Tab>
					<Tab className="Silver" eventKey="silver" title="Silver">
						<ChartOfSilver />
					</Tab>
				</Tabs>
				<br />
			</div>
			<div className="container row mx-5" style={{ color: "red" }}>
				{/* <div className="col-sm-1" /> */}

				<div className="col ">
					<img src="images/40.png" alt="img" />
				</div>
				<div className="col-md-7 col-md-7 px-4 py-3 text-danger ">
					<h1>
						Get access to the safest way of procuring
						<span style={{ color: "#DAA520	" }}>&nbsp;Gold </span>
						<span style={{ color: "#C0C0C0" }}>Silver</span>
					</h1>
					<h5 className="text-black">
						<p className="mb-5 mt-4">
							We at DigiGold want to make your gold journey
							simple, <b>Transparent and trustworthy</b> so that
							you can get the optimum output of your savings.
						</p>
					</h5>
					<div className="row">
						<div className="col-sm-3 col-md-3 d-flex justify-content-center">
							<Card
								style={{
									height: "100%",
									width: "20rem",
									textAlign: "center",
									"box-shadow":
										" 0 4px 8px 0 rgba(0,0,0,0.2)",
								}}
								className="stepCard"
							>
								<Card.Img
									variant="top"
									src="images/first.jpg"
									style={{ height: "100px" }}
								/>
								{/* <div className="col-sm-3 d-flex justify-content-center">
                            <Card style={{ height: "190px", width: "38rem", textAlign: "center", padding: "20px", "box-shadow": " 0 4px 8px 0 rgba(0,0,0,0.2)" }} className="stepCard">
                                <Card.Img variant="top" src="images/Kyc1.png" style={{ height: "100px" }} /> */}
								<Card.Body>
									<Card.Title>Register Yourself</Card.Title>
								</Card.Body>
							</Card>
						</div>
						<div className="col-sm-3 d-flex  justify-content-center">
							<Card
								style={{
									height: "100%",
									width: "20rem",
									textAlign: "center",
									"box-shadow":
										" 0 4px 8px 0 rgba(0,0,0,0.2)",
								}}
								className="stepCard "
							>
								<Card.Img
									variant="top"
									src="images/kyc.jpg"
									style={{ height: "100px" }}
								/>
								<Card.Body>
									<Card.Title> Complete KYC</Card.Title>
								</Card.Body>
							</Card>
						</div>

						<div className="col-sm-3 col-md-3 d-flex justify-content-center">
							<Card
								style={{
									height: "100%",
									textAlign: "center",
									width: "20rem",
									"box-shadow":
										" 0 4px 8px 0 rgba(0,0,0,0.2)",
								}}
								className="stepCard mb-2"
							>
								<Card.Img
									variant="top"
									src="images/add.jpg"
									style={{ height: "100px" }}
								/>
								{/* <div className="col-sm-3 d-flex justify-content-center" >
                            <Card style={{ height: "190px", textAlign: "center", width: "38rem", padding: "20px", "box-shadow": " 0 4px 8px 0 rgba(0,0,0,0.2)" }} className="stepCard mb-2">
                                <Card.Img variant="top" src="images/51.png" /> */}
								<Card.Body>
									<Card.Title>Add Money</Card.Title>
								</Card.Body>
							</Card>
						</div>

						<div className="col-sm-3 col-md-3 d-flex justify-content-center">
							<Card
								style={{
									height: "100%",
									width: "20rem",
									textAlign: "center",
									"box-shadow":
										" 0 4px 8px 0 rgba(0,0,0,0.2)",
								}}
								className="stepCard mb-2"
							>
								<Card.Img
									variant="top"
									src="images/trad.jpg"
									style={{ height: "100px" }}
								/>
								{/* 
                        <div className="col-sm-3 d-flex justify-content-center">
                            <Card style={{ height: "190px", width: "18rem", textAlign: "center", padding: "20px", "box-shadow": " 0 4px 8px 0 rgba(0,0,0,0.2)" }} className="stepCard mb-2">
                                <Card.Img variant="top" src="images/52.png" /> */}
								<Card.Body>
									<Card.Title>Happy Trading</Card.Title>
								</Card.Body>
							</Card>
						</div>
						<div className="joinn text-center">
							<div className="mt-5 text-center">
								<Button
									variant="outline-warning"
									className="square border border-dark "
								>
									<Nav.Link as={Link} to="/signup">
										Join Us !{" "}
									</Nav.Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="py-5 mt-4 "
				style={{ textAlign: "center", overflowX: "hidden" }}
			>
				<marque>
					<h1>Trust and Support of</h1>
				</marque>
				<p className="moving-text">
					<img src="images/53.png" alt="img" />
					<img src="images/54.png" alt="img" />
					<img src="images/55.png" alt="img" />
					<img src="images/56.png" alt="img" />
					<img src="images/58.png" alt="img" />
					<img src="images/57.png" alt="img" />{" "}
				</p>
			</div>

			<Footer />
		</div>
	);
}

// import React, { useState, useEffect } from "react";
// import "../assests/Styles/RightSide.css";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import {
// 	Stat,
// 	StatLabel,
// 	StatNumber,
// 	StatHelpText,
// 	StatArrow,
// 	StatGroup,
// } from "@chakra-ui/react";
// import GoldChart from "./GoldChart";
// import SilverChart from "./SilverChart";
// import {
// 	getGoldDataByMonthID,
// 	getSilverDataByMonthID,
// } from "../services/trade.api";

// export default function RightSide() {
// 	const [goldPrice, setGoldPrice] = useState(0);
// 	const [silverPrice, setSilverPrice] = useState(0);

// 	useEffect(() => {
// 		getGoldDataByMonthID(new Date().getMonth())
// 			.then((result) => {
// 				setGoldPrice(result.data.data[new Date().getDate() + 1].price);
// 				// console.log(result.data.data[new Date().getDate() + 1]);
// 			})
// 			.catch((err) => err);

// 		getSilverDataByMonthID(new Date().getMonth())
// 			.then((result) => {
// 				setSilverPrice(
// 					result.data.data[new Date().getDate() + 1].price
// 				);

// 			})
// 			.catch((err) => err);
// 	}, []);

// 	return (
// 		<>
// 			<div className="container d-md-flex" style={{ marginTop: "105px" }}>
// 				<div style={{ marginLeft: "", marginTop: "2px" }}>
// 					<Tabs
// 						defaultActiveKey="gold"
// 						id="uncontrolled-tab-example"
// 						className="mb-3"
// 					>

// 						<Tab eventKey="gold" title="Gold">
// 							<h1> Gold Price Today-</h1>
// 							<h3
// 								style={{
// 									backgroundColor: "#fad776",
// 									width: "150px",
// 								}}
// 							>
// 								{" "}
// 								&#x20b9; {goldPrice}
// 							</h3>
// 							<br />
// 							<StatGroup className="col-sm-5">
// 								<Stat>
// 									<StatLabel>Sent</StatLabel>
// 									<StatNumber>345,670</StatNumber>
// 									<StatHelpText style={{ color: "green" }}>
// 										<StatArrow type="increase" />
// 										23.36%
// 									</StatHelpText>
// 								</Stat>

// 								<Stat>
// 									<StatLabel>Clicked</StatLabel>
// 									<StatNumber>45</StatNumber>
// 									<StatHelpText style={{ color: "red" }}>
// 										<StatArrow type="decrease" />
// 										9.05%
// 									</StatHelpText>
// 								</Stat>
// 							</StatGroup>

// 							<GoldChart />
// 						</Tab>

// 						<Tab eventKey="silver" title="Silver">
// 							<h1>Silver Price Today -</h1>{" "}
// 							<h3
// 								style={{
// 									backgroundColor: "#fad776",
// 									width: "150px",
// 								}}
// 							>
// 								{" "}
// 								&#x20b9;
// 								{silverPrice}
// 							</h3>
// 							<br />
// 							<StatGroup className="col-sm-5">
// 								<Stat>
// 									<StatLabel>Sent</StatLabel>
// 									<StatNumber>145,670</StatNumber>
// 									<StatHelpText style={{ color: "green" }}>
// 										<StatArrow type="increase" />
// 										2.36%
// 									</StatHelpText>
// 								</Stat>

// 								<Stat>
// 									<StatLabel>Clicked</StatLabel>
// 									<StatNumber>35</StatNumber>
// 									<StatHelpText style={{ color: "red" }}>
// 										<StatArrow type="decrease" />
// 										9.05%
// 									</StatHelpText>
// 								</Stat>
// 							</StatGroup>
// 							<SilverChart />

// 						</Tab>
// 					</Tabs>
// 				</div>
// 			</div>

// 		</>
// 	);
// }
