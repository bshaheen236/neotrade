import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useCallback } from "react";
import "../manager.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getUsers, deleteUser } from "../services/user";
import { authorizeUser, newUser, changePassword } from "../services/admin";
import { REGIS_NAME_RGX, USER_PASS_RGX } from "../Constant/Regex";
import { isAdmin } from "../services/loginUser";
import { viewAmount } from "../services/wallet";
import { TradeViews, buyView, sellView } from "../services/SellBuy";

import Sidenav from "./Sidenav";

function ManageUser() {
	const [show, setShow] = useState(false);
	const [acShow, setacShow] = useState(false);
	const [lgShow, setLgShow] = useState(false);

	// model 2
	const handlelgShow = () => setLgShow(true)
	const handlelgClose = () => setLgShow(false)

	// model 3
	const handleacShow = () => setacShow(true)
	const handleacClose = () => setacShow(false)

	// modal 1
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);


	const [data, setdata] = useState({
		password: "",
		cpassword: "",
	});
	const [passwordErr, setPasswordErr] = useState(false);
	const [cpasswordErr, setCpasswordErr] = useState(false);


	const [users, setUsers] = useState([]);
	const [transectionDetails, settransectionDetails] = useState([]);
	const [StockDetails, setStockDetails] = useState([]);
	const [SellData, setSellData] = useState([]);
	const [BuyData, setBuyData] = useState([]);

	const [userId, setUserId] = useState("");



	const successAlert = () => {
		Swal.fire({
			title: "Added a new user",
			icon: "success",
		});
	};

	const notify = () => toast.success("User is activated");
	const reset = () => toast.success("User password reset");
	const msg = () => toast.error("User is deactivated");

	useEffect(() => {
		(async () => {
			await getUsers().then((res) => {
				if (res.data.statusCode === 200) {
					setUsers(res.data.data);
				}
			});
		})();
	}, []);

	const deleteHandler = useCallback(
		async (id) => {
			await deleteUser(id).then((res) => {
				if (res.data.statusCode === 200) {
					getUsers().then((res) => {
						if (res.data.statusCode === 200) {
							setUsers(res.data.data);
						}
					});
				}
			});
		},
		[users]
	);

	const detailsHandler = useCallback(
		async (id) => {
			await viewAmount(id)
				.then((res) => {
					settransectionDetails(res.data.data.walletinfo.transaction);
				})
			await sellView(id)
				.then((res) => {
					setSellData(res.data.data);
				})
			await buyView(id)
				.then((res) => {
					setBuyData(res.data.data);
				})
			await TradeViews(id)
				.then((res) => {
					setStockDetails(res.data.data);
				})
		}, [transectionDetails, StockDetails]
	);

	const mode = useCallback(
		async (id, status) => {
			if (status === true) {
				status === 0;
			} else {
				status === 1;
			}

			await authorizeUser(id, status).then(() => {
				getUsers().then((res) => {
					if (res.data.statusCode === 200) {
						setUsers(res.data.data);
					}
				});
			});
		},
		[users]
	);

	const ValidationSchema = Yup.object().shape({
		fname: Yup.string()
			.required("First name is required")
			.matches(REGIS_NAME_RGX, "Only alphabate allow")

			.test(
				"is-full-name",
				"Please enter both fname and lname",
				(value = "") => value !== ""
			),

		lname: Yup.string()

			.required("Last name is required")
			.matches(REGIS_NAME_RGX, "Only alphabate allow")

			.test(
				"is-full-name",
				"Please enter both fname and lname",
				(value = "") => value !== ""
			),
		email: Yup.string()
			.required("Email is required")
			.email("Email is invalid"),
		password: Yup.string()
			.required("Password is required")
			.min(6, "Password must be atleast 6 characters")
			.max(40, "Password must not execeed 40 characters"),

		confirmPassword: Yup.string()
			.required("Confirm password is required")
			.oneOf(
				[Yup.ref("password"), null],
				"Confirm password doesnot match"
			),

		phone: Yup.string()
			.required("Phone number is required")
			.test(
				"phone-number",
				"Please enter your number",
				(value = "") => value.length === 10
			),
		acceptTerms: Yup.bool().oneOf([true], "Accept term is required"),
	});

	const formik = useFormik({
		initialValues: {
			fname: "",
			lname: "",
			email: "",
			password: "",
			confirmPassword: "",
			phone: "",
			acceptTerms: false,
		},

		validationSchema: ValidationSchema,
		onSubmit: (data) => {
			newUser(data).then((res) => {
				if (res.data.statusCode === 201) {
					successAlert();
					handleClose(true);
					getUsers().then((res) => {
						if (res.data.statusCode === 200) {
							setUsers(res.data.data);
						}
					});
				}
			});
		},
	});


	const handleChange = (e) => {
		const { name, value } = e.target;
		setdata({
			...data,
			[name]: value,
		});
		setPasswordErr(false);
		setCpasswordErr(false);
	};

	const handleSetId = (id) => {
		setUserId(id);
	}

	const Update = (e) => {
		e.preventDefault();
		const pwdRegex = USER_PASS_RGX;
		if (data.password === "" || !pwdRegex.test(data.password)) {
			setPasswordErr(true);
		}
		if (data.cpassword !== data.password) {
			setCpasswordErr(true);
		} else {
			changePassword(userId, data)
				.then((res) => {
					if (res.data.statusCode === 200) {
						handlelgClose(true);
						reset();

					}
				})
		}
	}

	return (
		<div className="mt-5">
			{isAdmin() && (
				<>
					<Sidenav />
					<ToastContainer />
					<div className="container mt-5">
						<div className="row mt-5 text-center">
							<div className="col-lg-6  text-left mt-3 mb-3">
								<h3>User Details</h3>
							</div>

							<div className="col-lg-6 mt-3 mb-3 text-right">
								<Button variant="primary" onClick={handleShow}>
									Add New User
								</Button>
							</div>
						</div>

						<div className="row ">
							<Table striped bordered hover>
								<thead className="text-center">
									<tr>
										<th>Sr.No.</th>

										<th>First Name</th>
										<th>Last Name</th>
										<th>Email</th>
										<th>Mobile</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{users.map((element, id) => {
										return (
											<tr>
												<th scope="row">{id + 1}</th>

												<td>{element.fname}</td>
												<td>{element.lname}</td>
												<td>{element.email}</td>
												<td>{element.phone}</td>
												<td>
													<div className="  text-center">
														{element.active ? (
															<Button
																type="button"
																className="btn text-white  w-100 "
																style={{
																	backgroundColor:
																		"green",
																}}
																onClick={() => {
																	mode(
																		element._id,
																		!element.active
																	);
																	msg();
																}}
															>
																Active
															</Button>
														) : (
															<Button
																type="button"
																className="btn  text-white w-100 "
																style={{
																	backgroundColor:
																		"red",
																}}
																onClick={() => {
																	mode(
																		element._id,
																		!element.active
																	);
																	notify();
																}}
															>
																Deactive
															</Button>
														)}
													</div>
												</td>

												<td className="d-flex">
													<div className="mx-1 text-center">
														<Button
															type="button"
															className=" btn btn-primary"

															onClick={() => { handlelgShow(); handleSetId(element._id) }
															}
														>
															<CreateIcon />
														</Button>
													</div>

													<div className="mx-1 text-center" >
														<Button
															type="button"
															className="btn btn-danger"

															onClick={() => {
																deleteHandler(
																	element._id
																);
															}}
														>
															<DeleteOutlineIcon />
														</Button>
													</div>

													<div className="mx-1 text-center" >
														<Button
															type="button"
															className="btn btn-primary"

															onClick={() => {
																handleacShow();
																detailsHandler(
																	element._id
																);
															}}
														>
															<VisibilityIcon />
														</Button>
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>

						{/* modal 2 */}
						<div className="h" style={{ width: "900px" }}>
							<Modal
								className="mood"
								show={lgShow}
								onHide={handlelgClose}
								backdrop="static"
								keyboard={false}
								aria-labelledby="example-modal-sizes-title-lg"
							>
								<Modal.Body>
									<Modal.Header closeButton>
										<Modal.Title id="example-modal-sizes-title-lg">
											Change User Password
										</Modal.Title>
									</Modal.Header>
									<div className="container mt-3">
										<form className="form_container">

											<input
												className=" input_1"
												type="password"
												name="password"
												placeholder="Enter new password "
												onChange={handleChange}
												value={data.password}
											/>
											{passwordErr ? (
												<div
													className="mssg "
													style={{ textAlign: "left" }}
												>
													<p
														className=""
														style={{ textAlign: "left" }}
													>
														{" "}
														Enter email
													</p>
												</div>
											) : (
												false
											)}
											<input
												className=" input_1"
												type="password"
												name="cpassword"
												placeholder="Confirm password "
												onChange={handleChange}
												value={data.cpassword}
											/>
											{cpasswordErr ? (
												<div
													className="mssg "
													style={{ textAlign: "left" }}
												>
													<p
														className=""
														style={{ textAlign: "left" }}
													>
														{" "}
														Enter email
													</p>
												</div>
											) : (
												false
											)}
										</form>
									</div>
								</Modal.Body>

								<Modal.Footer>
									<div
										className="text-center"
										style={{ marginRight: "120px" }}
									>
										<Button variant="primary" onClick={Update}>
											Update
										</Button>
									</div>
								</Modal.Footer>
							</Modal>
						</div>

						{/*  Model 1 */}
						<div className="model_box">
							<Modal
								show={show}
								onHide={handleClose}
								backdrop="static"
								keyboard={false}
								className="mt-5"
							>
								<Modal.Header closeButton >
									<Modal.Title >
										<span>
											&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
											&nbsp; &nbsp; Add New User
											&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
											&nbsp; &nbsp;{" "}
										</span>
									</Modal.Title>
								</Modal.Header>
								<Modal.Body className="boxxx">
									<form
										className="form_container"
										onSubmit={formik.handleSubmit}
									>
										<div>
											<input
												type="text"
												placeholder="First name"
												name="fname"
												onChange={formik.handleChange}
												value={formik.values.fname}
												className="input1"
											/>

											{formik.errors.fname &&
												formik.touched.fname ? (
												<p className="mssg">
													{formik.errors.fname}
												</p>
											) : (
												""
											)}
										</div>

										<div>
											<input
												type="text"
												placeholder="Last name"
												name="lname"
												onChange={formik.handleChange}
												value={formik.values.lname}
												className="input1"
											/>

											{formik.errors.lname &&
												formik.touched.lname ? (
												<p className="mssg">
													{formik.errors.lname}
												</p>
											) : (
												""
											)}
										</div>
										<div>
											<input
												type="email"
												placeholder="Email"
												name="email"
												onChange={formik.handleChange}
												value={formik.values.email}
												className="input1"
											/>
											{formik.errors.email &&
												formik.touched.email ? (
												<p className="mssg">
													{formik.errors.email}
												</p>
											) : (
												""
											)}
										</div>
										<div>
											<div>
												<input
													type="password"
													placeholder="Password"
													name="password"
													onChange={
														formik.handleChange
													}
													value={
														formik.values.password
													}
													className="input1"
												/>
												{formik.errors.password &&
													formik.touched.password ? (
													<p className="mssg">
														{formik.errors.password}
													</p>
												) : (
													""
												)}
											</div>
											<div>
												<input
													type="password"
													className="input1"
													name="confirmPassword"
													placeholder="Confirm  password"
													onChange={
														formik.handleChange
													}
													value={
														formik.values
															.confirmPassword
													}
												/>
												{formik.errors
													.confirmPassword &&
													formik.touched
														.confirmPassword ? (
													<p className="mssg">
														{
															formik.errors
																.confirmPassword
														}
													</p>
												) : (
													""
												)}
											</div>
										</div>
										<div>
											<input
												type="text"
												placeholder="Enter number"
												name="phone"
												onChange={formik.handleChange}
												value={formik.values.phone}
												className="input1"
											/>
											{formik.errors.phone &&
												formik.touched.phone ? (
												<p className="mssg">
													{formik.errors.phone}
												</p>
											) : (
												""
											)}
										</div>

										<div className="row accept text-center">
											<div className="mt-2 ">
												<input
													type="checkbox"
													name="acceptTerms"
													onChange={
														formik.handleChange
													}
												/>
												<label
													htmlFor="checkbox-2"
													className="checkbox__label"
												>
													&nbsp; I accept terms and
													conditions
												</label>
												{formik.errors.acceptTerms &&
													formik.touched.acceptTerms ? (
													<div className="mssg">
														{
															formik.errors
																.acceptTerms
														}
													</div>
												) : (
													""
												)}
											</div>

											<div className="userr text-center">
												<button
													type="submit"
													className="btn btn-primary"
												>
													Add New User
												</button>
											</div>
										</div>
									</form>
								</Modal.Body>
							</Modal>

							{/* Model Box Finsihs */}
						</div>

						{/*  Model 3 */}
						<div className="h" style={{ width: "120px" }}>
							<Modal
								className="mood mt-3"
								show={acShow}
								onHide={handleacClose}
								backdrop="static"
								keyboard={false}
								aria-labelledby="example-modal-sizes-title-lg"
							>
								<Modal.Body >
									<Modal.Header closeButton>
										<Modal.Title id="example-modal-sizes-title-lg" className="text-center">
											User stock and transection details
										</Modal.Title>
									</Modal.Header>
									<div className="container mt-3">
										<h4 className="text-center">User Transection Data</h4>
										<Table striped bordered hover>
											<thead className="text-center">
												<tr>
													<th>Sr.No.</th>
													<th>T.ID</th>
													<th>Method</th>
													<th>Amount</th>
												</tr>
											</thead>
											<tbody>
												{transectionDetails.map((element, id) => {
													return (
														<tr>
															<th scope="row">{id + 1}</th>
															<td>{element.transactionId}</td>
															<td>{element.paymentMethod}</td>
															<td>{element.process === 1 ? (<div className="text-success">{element.amount}</div>) : (<div className="text-danger">{element.amount}</div>)}</td>
														</tr>
													);
												})}
											</tbody>
										</Table>

										<h4 className="text-center">User Sell Data</h4>
										<Table striped bordered hover className="mt-2">
											<thead className="text-center">
												<tr>
													<th>Sr.No.</th>
													<th>Type</th>
													<th>Quantity</th>
													<th>Profit_loss</th>
													<th>Date</th>
												</tr>
											</thead>
											<tbody>
												{SellData.map((element, id) => {
													return (
														<tr>
															<th scope="row">{id + 1}</th>
															<td>{element.category}</td>
															<td>{element.quantity}</td>
															<td>{element.profit_loss}</td>
															<td>{element.createdAt.split("T")[0]}</td>
														</tr>
													);
												})}
											</tbody>
										</Table>
										<h4 className="text-center">Users Buy Data</h4>
										<Table striped bordered hover className="mt-2">
											<thead className="text-center">
												<tr>
													<th>Sr.No.</th>
													<th>Type</th>
													<th>Quantity</th>
													<th>Date</th>
												</tr>
											</thead>
											<tbody>
												{BuyData.map((element, id) => {
													return (
														<tr>
															<th scope="row">{id + 1}</th>
															<td>{element.category}</td>
															<td>{element.quantity}</td>
															<td>{element.createdAt.split("T")[0]}</td>
														</tr>
													);
												})}
											</tbody>
										</Table>
										<h4 className="text-center">User Holding Data</h4>
										<Table striped bordered hover className="mt-2">
											<thead className="text-center">
												<tr>
													<th>Sr.No.</th>
													<th>Stock Type</th>
													<th>Quantity</th>
													<th>T.Amount</th>
												</tr>
											</thead>
											<tbody>
												{StockDetails.map((element, id) => {
													return (
														<tr>
															<th scope="row">{id + 1}</th>
															<td>{element.category}|{element.type}:{element.unit}</td>
															<td>{element.quantity}</td>
															<td>{element.trade_amount}</td>
														</tr>
													);
												})}
											</tbody>
										</Table>
									</div>
								</Modal.Body>
							</Modal>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default ManageUser;
