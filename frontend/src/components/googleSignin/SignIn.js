import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
	Loginbymail,
	isLoggedIn,
	isAdmin,
	varifyOtp,
	genrateToken,
	SocialLoginData,
} from "../../services/loginUser";
// import getToken from "../../services/CreateToken"
import { auth, google, facebook } from "./config";
import "../../Signin.css";

function SignIn() {
	const { token } = useParams();
	const [isLogin, setIsLogin] = useState(false);
	const [user, setUser] = useState(null);
	const [show, setShow] = useState(false);
	// const [disableOtp, setDisable] = useState(true);
	// const [disableEmail, setDisableEmail] = useState(false);
	// const [acesstoken,setacesstoken] = useState("")
	const [isOn, setIsOn] = useState(true);
	const [isOn2, setIsOn2] = useState(true);

	const [inpOTP, setInpOTP] = useState("");
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	// const [message, setMessage] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const setVal = (e) => {
		setEmail(e.target.value);
	};

	const handleOnChange = (e) => {
		setInpOTP(e.target.value);
	};
	const successAlert = () => {
		Swal.fire({
			title: "Login successfully",
			icon: "success",
		});
	};

	const cancelAlert = () => {
		Swal.fire({
			title: "Wrong OTP",
			icon: "error",
		});
	};
	const cancelAlert2 = () => {
		Swal.fire({
			title: "Issue with network",
			icon: "error",
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		varifyOtp({ inpOTP })
			.then((result) => {
				// console.log("kya h ye", inpOTP);
				if (inpOTP === "") {
					toast.error("email is required!", {
						position: "top-center",
					});
				} else if (result.status === 201) {
					// console.log("correct otp")
					successAlert();
					isLoggedIn();
					isAdmin();
					navigate("/dashboard");
				} else {
					alert("wrong OTP");
					cancelAlert();
				}
			})
			.catch((err) => err);
		toast.error("Wrong otp", {
			position: "top-center",
		});
	};

	const sendLink = async (e) => {
		e.preventDefault();
		if (email === "") {
			toast.error("email is required!", {
				position: "top-center",
			});
		} else if (!email.includes("@")) {
			toast.warning("includes @ in your email!", {
				position: "top-center",
			});
		} else {
			Loginbymail({ email })
				.then((result) => {
					if (result.data.statusCode === 200) {
						// setDisable(false);
						// setDisableEmail(true);
						setIsOn2(false);
						setIsOn(false);
						setEmail("");
						// setMessage(true);
						// localStorage.setItem("otp", result.data.otp);
						localStorage.setItem("token", result.data.token);
						localStorage.setItem("id", result.data.id);
						// navigate("/emailotp")
					} else {
						toast.error("Invalid User", {
							position: "top-center",
						});
					}
				})
				.catch((err) => err);
		}
	};

	const LoginTrue = () => {
		const navigate = useNavigate();
		genrateToken(token)
			.then((res) => {
				localStorage.setItem("token", res.token);
				isLoggedIn();
				isAdmin();
				navigate("/dashboard");
			})
			.catch((err) => err);
	};

	const login = async (provider) => {
		const result = await signInWithPopup(auth, provider);
		setUser(result.user);
		const data = {
			fname: result.user.displayName.split(" ").slice(0, -1).join(" "),
			lname: result.user.displayName.split(" ").slice(-1).join(" "),
			email: result.user.email,
			password: result.user.uid,
			phone: "6265581213",
			token: result.user.accessToken,
		};
		SocialLoginData(data)
			.then((res) => {
				// localStorage.setItem("token", data.token);
				localStorage.setItem("id", res.data.id);
				setIsLogin(true);
			})
			.catch((res) => {
				res;
				cancelAlert2();
			});
	};

	return (
		<div className="App font">
			<header className="App-header">
				{isLogin && user ? (
					<LoginTrue />
				) : (
					<div>
						<h4>-OR-</h4>
						<div className="row" style={{ marginLeft: "35px" }}>
							<div className="col-md-3">
								<div className="">
									<button
										type="button"
										onClick={handleShow}
										className="signin_btn"
									>
										<div className="row">
											<img
												src="images/email.png"
												alt="img"
												width="45px"
												height="32px"
											/>
										</div>
									</button>

									{/* </div>
						<div className="up"> */}
									<div className="modal fade" role="dialog">
										<div className="modal-dialog">
											<Modal
												show={show}
												onHide={handleClose}
											>
												<Modal.Header closeButton>
													<Modal.Title className="up">
														Enter email and OTP to
														login
													</Modal.Title>
												</Modal.Header>
												<Modal.Body className="up">
													<Form>
														{isOn2 ? (
															<Form.Group
																className="mb-3 inp"
																controlId="exampleForm.ControlInput1"
															>
																<input
																	className="kuch"
																	style={{
																		border: "none",
																		outline:
																			"none",
																	}}
																	type="email"
																	placeholder="Enter email"
																	// disabled={disableEmail}
																	value={
																		email
																	}
																	onChange={
																		setVal
																	}
																/>
															</Form.Group>
														) : (
															<Form.Group
																className="mb-3"
																controlId="exampleForm.ControlInput1"
															>
																<input
																	type="text"
																	className="kuch"
																	placeholder="Enter otp"
																	autoComplete="off"
																	// disabled={disableOtp}
																	value={
																		inpOTP
																	}
																	onChange={
																		handleOnChange
																	}
																/>
															</Form.Group>
														)}
														<ToastContainer />
													</Form>
												</Modal.Body>
												<Modal.Footer>
													{isOn ? (
														<Button
															className="green_btn"
															style={{
																marginRight:
																	"250px",
															}}
															onClick={sendLink}
														>
															Submit
														</Button>
													) : (
														<Button
															className="btn btn-primary bttn"
															style={{
																textAlign:
																	"center",
																paddingTop:
																	"7px",
															}}
															// className="pop"
															onClick={
																handleSubmit
															}
														>
															Verfify
														</Button>
													)}
												</Modal.Footer>
											</Modal>
										</div>
									</div>
								</div>
							</div>

							<div className="col-md-3">
								<button
									className="signin_btn "
									type="button"
									onClick={() => login(facebook)}
								>
									<div>
										<img
											src="images/facebook (2).png"
											alt="img"
											width="37px"
											height="29px"
										/>
									</div>
								</button>
							</div>

							<div className="col-md-3" style={{}}>
								<button
									className="signin_btn"
									type="button"
									onClick={() => login(google)}
								>
									<div className="row ">
										<img
											className="google"
											src="images/google (1).png"
											alt="img"
											width="50px"
											height="29px"
										/>
									</div>
								</button>
							</div>
						</div>
					</div>
				)}
			</header>
		</div>
	);
}
export default SignIn;
