import React, { useCallback, useEffect, useState } from "react";
import {
	MDBCard,
	MDBCardBody,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBRow,
	MDBTypography,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { viewAmount, buyAmount } from "../services/wallet";
import Sidenav from "./Sidenav";
import {
	findUserTrade,
	deleteCart,
	updateCart,
	buyTradeItems,
} from "../services/SellBuy";
import { getUserById } from "../services/user";
import { sendBuyInvoice } from "../services/Invoice";

export default function Cart() {
	const navigate = useNavigate();
	const [tradeData, settradedata] = useState([]);
	const [currentAmount, setCurrentAmount] = useState(0);
	const [updateAmount, setUpdateAmount] = useState(false);
	const [count, setCount] = useState(0);

	// set user data
	const [UserFname, setUserFname] = useState(" ");
	const [UserLname, setUserLname] = useState("");
	const [UserEmail, setUserEmail] = useState("");
	const fullName = [UserFname, UserLname].join(" ");

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const navigatePage = () => navigate("/wallet");

	const [cartItemCount, setCartItemCount] = useState(0);

	const successAlert = () => {
		Swal.fire({
			title: "Buy item successfully",
			icon: "success",
		});
	};

	// to add selected buy data
	useEffect(() => {
		(async () => {
			await findUserTrade(localStorage.getItem("id")).then((res) => {
				if (res.data.statusCode === 200) {
					const Data = res.data.data;
					settradedata(Data);
				}
			});
		})();
	}, []);

	// to show currect wallete balance
	const storeId = localStorage.getItem("id");

	useEffect(() => {
		viewAmount(storeId).then((res) => {
			setCurrentAmount(res.data.data.walletinfo.amount);
			setUpdateAmount(false);
		});
	}, [currentAmount, updateAmount]);

	// to sum total amount
	const totalPrice = tradeData.reduce(
		(accumulator, item) => accumulator + item.trade_amount,
		0
	);
	const tax = (totalPrice * 2) / 100;

	const handleDelete = (id) => {
		deleteCart(id);
		settradedata(tradeData.filter((p) => p._id !== id));
	};

	const handleUpdateCart = useCallback(
		async (id, quantity, price) => {
			if (!(quantity <= 0)) {
				await updateCart(id, { quantity, price });
				setCount(count + 1);
				await findUserTrade(localStorage.getItem("id")).then((res) => {
					if (res.data.statusCode === 200) {
						const Data = res.data.data;
						settradedata(Data);
					}
				});
			}
		},
		[count]
	);

	// add user data
	useEffect(() => {
		(async () => {
			await getUserById(storeId).then((res) => {
				if (res.data.statusCode === 200) {
					setUserFname(res.data.data.fname);
					setUserLname(res.data.data.lname);
					setUserEmail(res.data.data.email);
				}
			});
		})();
	}, []);

	// buy items
	const buyItems = () => {
		(async () => {
			const data = tradeData.map((item) => item);
			await buyTradeItems(storeId, data).then(() => {
				successAlert();
				navigate("/dashboard");
				buyAmount(storeId, { totalPrice });
				sendBuyInvoice({ fullName, UserEmail, data });
			});
		})();
	};

	useEffect(() => {
		setCartItemCount(tradeData.length);
	}, [tradeData]);
	localStorage.setItem("count", cartItemCount);

	return (
		<>
			<Sidenav cartCount={cartItemCount} />
			{cartItemCount === 0 ? (
				<h1>Cart is empty Please add item</h1>
			) : (
				<section
					className="h-100"
					style={{ backgroundColor: "#eee", marginTop: "70px" }}
				>
					<MDBContainer className="py-5 h-100">
						<MDBRow className="justify-content-center align-items-center h-100">
							<MDBCol md="10">
								<div className="d-flex justify-content-between align-items-center mb-4">
									<MDBTypography
										tag="h3"
										className="fw-normal mb-0 text-black"
									>
										Trading Cart
									</MDBTypography>
								</div>
								{tradeData?.map((item) => (
									<div key={item._id}>
										<MDBCard className="rounded-3 mb-4">
											<MDBCardBody className="p-4">
												<MDBRow className="justify-content-between align-items-center">
													<MDBCol md="2" lg="2" xl="1">
														<p className="lead fw-normal mb-1">
															{" "}
															Item
														</p>
														<p className="text-muted">
															{" "}
															{item.category}
														</p>
													</MDBCol>
													<MDBCol
														md="3"
														lg="2"
														xl="2"
														className="px-1"
													>
														<p className="lead fw-normal mb-2 px-3">
															Quantity
														</p>
														<div className="d-flex align-items-center justify-content-around">
															<button
																color="link"
																className="px-1"
																type="button"
																onClick={() =>
																	handleUpdateCart(
																		item._id,
																		item.quantity -
																		1,
																		item.price
																	)
																}
																style={{
																	border: "none",
																	backgroundColor:
																		"white",
																}}
															>
																<MDBIcon
																	fas
																	icon="minus"
																/>
															</button>
															<p className="text-muted">
																{" "}
																{item.quantity}
															</p>
															<button
																color="link"
																className="px-1 pb-1"
																type="button"
																onClick={() =>
																	handleUpdateCart(
																		item._id,
																		item.quantity +
																		1,
																		item.price
																	)
																}
																style={{
																	border: "none",
																	backgroundColor:
																		"white",
																}}
															>
																<MDBIcon
																	fas
																	icon="plus"
																/>
															</button>
														</div>
													</MDBCol>
													<MDBCol md="2" lg="2" xl="2">
														<p className="lead fw-normal mb-2">
															Price
														</p>
														<p className="text-muted">
															{" "}
															{item.price}$
														</p>
													</MDBCol>
													<MDBCol md="3" lg="2" xl="2">
														<p className="lead fw-normal mb-2">
															Amount
														</p>
														<p className="text-muted ">
															{item.trade_amount}{" "}
														</p>
													</MDBCol>
													<MDBCol
														md="1"
														lg="1"
														className="text-end "
													>
														<button
															type="button"
															onClick={() =>
																handleDelete(
																	item._id
																)
															}
															style={{
																border: "none",
																backgroundColor:
																	"white",
															}}
														>
															<MDBIcon
																fas
																icon="trash text-danger"
																size="lg"
															/>
														</button>
													</MDBCol>
												</MDBRow>
											</MDBCardBody>
										</MDBCard>
									</div>
								))}
								<button
									type="submit"
									className="btn buynow-btn btn btn-warning"
									data-toggle="modal"
									data-target="#popup-login-form-popup"
									onClick={handleShow}
								>
									{" "}
									CheckOut &nbsp;
									<img
										src="https://www.digigold.com/media/original/public/content/lbSV71aXZqKMTLSJLuJd3tGgkP51RmACFKj6mCFg.png"
										alt=""
									/>
								</button>
								&nbsp; &nbsp; &nbsp;Total Amount: {totalPrice}$
							</MDBCol>
						</MDBRow>
						<div className="modal fade" role="dialog">
							{currentAmount < totalPrice + tax ? (
								<div className="modal-dialog">
									<Modal show={show} onHide={handleClose}>
										<Modal.Header closeButton>
											<Modal.Title
												className="up"
												style={{ textAlign: "center" }}
											>
												Opps.. 😰
											</Modal.Title>
										</Modal.Header>
										<Modal.Body className="up">
											<Form>
												<Form.Group
													className="mb-3 inp"
													controlId="exampleForm.ControlInput1"
												>
													<p>
														You Dont have sufficient
														balance to purchase selected
														item{" "}
													</p>
													<p>
														Please click on{" "}
														<b>"Add Money"</b> button to
														add balance in your wallet
													</p>
												</Form.Group>

												<ToastContainer />
											</Form>
										</Modal.Body>
										<Modal.Footer>
											<Button
												className="bg-warning text-dark text-center"
												style={{
													width: "430px",
													border: "none",
												}}
												onClick={navigatePage}
											>
												Add Money
											</Button>
										</Modal.Footer>
									</Modal>
								</div>
							) : (
								<div className="modal-dialog">
									<Modal show={show} onHide={handleClose}>
										<Modal.Header closeButton>
											<Modal.Title
												className="up"
												style={{ textAlign: "center" }}
											>
												Ready to purchase 😉 <br />
											</Modal.Title>
										</Modal.Header>
										<Modal.Body className="up">
											<Form>
												<Form.Group
													className="mb-3"
													controlId="exampleForm.ControlInput1"
												>
													{tradeData?.map((item) => (
														<div key={item._id}>
															<p>
																* {item.category}
																&nbsp; &nbsp;{" "}
																{item.quantity}
																&nbsp;{
																	item.unit
																}{" "}
																<span
																	style={{
																		marginLeft:
																			"260px",
																	}}
																>
																	+
																	{
																		item.trade_amount
																	}
																	$
																</span>
															</p>
														</div>
													))}

													<p className="">
														Tex:{" "}
														<span
															style={{
																marginLeft: "352px",
															}}
														>
															+{tax}$
														</span>
													</p>
													<p className="text-danger">
														Wallet balance:{" "}
														<span
															style={{
																marginLeft: "272px",
															}}
														>
															-{currentAmount}$
														</span>
													</p>

													<hr />
													<p>
														Total amount:{" "}
														<samp
															style={{
																marginLeft: "275px",
															}}
														>
															{totalPrice + tax}$
														</samp>
													</p>
												</Form.Group>
												<ToastContainer />
											</Form>
										</Modal.Body>
										<Modal.Footer>
											<Button
												className="bg-warning text-dark text-center"
												style={{
													width: "430px",
													border: "none",
												}}
												onClick={buyItems}
											>
												Buy Now
											</Button>
										</Modal.Footer>
									</Modal>
								</div>
							)}
						</div>
					</MDBContainer>
				</section>
			)}
		</>
	);
}
