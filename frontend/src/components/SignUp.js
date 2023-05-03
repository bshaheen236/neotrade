import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addUser } from "../services/user";
import "react-toastify/dist/ReactToastify.css";
import { Regisbymail, varifyOtp } from "../services/loginUser";
import Navbar from "./Navbar";
import { REGIS_NAME_RGX } from "../Constant/Regex";
import "../SignUp.css";

function Signup() {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState("");
	// const [message, setMessage] = useState("");
	const [isOn, setIsOn] = useState(true);
	const [isOn2, setIsOn2] = useState(true);
	const [inpOTP, setInpOTP] = useState("");
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const successAlert = () => {
		Swal.fire({
			title: "User Registered successfully",
			icon: "success",
		});
	};

	const successAlert2 = () => {
		Swal.fire({
			title: "User varification done successfully",
			icon: "success",
		});
	};

	const setVal = (e) => {
		setEmail(e.target.value);
	};

	const handleOnChange = (e) => {
		setInpOTP(e.target.value);
	};

	const cancelAlert = () => {
		Swal.fire({
			title: "Wrong OTP",
			icon: "error",
		});
	};
	const cancelAlert2 = () => {
		Swal.fire({
			title: "User Already Register",
			icon: "error",
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		varifyOtp({ inpOTP })
			.then((result) => {
				if (inpOTP === "") {
					toast.error("email is required!", {
						position: "top-center",
					});
				} else if (result.status === 201) {
					successAlert2();
					handleClose(true);
				} else {
					cancelAlert();
				}
			})
			.catch((err) => err);
		cancelAlert();
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
			Regisbymail({ email })
				.then((result) => {
					if (result.data.statusCode === 200) {
						setIsOn2(false);
						setIsOn(false);
						setEmail("");

						localStorage.setItem("otp", result.data.otp);
					} else {
						toast.error("Invalid User", {
							position: "top-center",
						});
					}
				})
				.catch((err) => err);
		}
	};

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
			addUser(data).then((res) => {
				if (res.data.statusCode === 201) {
					successAlert();

					navigate("/login");
				}
			});
			cancelAlert2();
		},
	});

	return (
		<>
			<Navbar />
			<div className="signup_container font">
				<div className=" signup_form_container row mt-0">
					<div className="left col-sm-3">
						<h1>Welcome Back</h1>
						<Link to="/login">
							<button type="button" className="white_btn">
								Sign In
							</button>
						</Link>
					</div>
					<div className="right col">
						<div className="right col">
							<form
								className="form_container"
								onSubmit={formik.handleSubmit}
							>
								<h2 className="regis pt-2">REGISTER</h2>
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

								<div className="up">
									<Button
										className="otp-btn "
										style={{ borderRadius: "10px" }}
										onClick={handleShow}
										disabled={!formik.values.email}
									>
										Get OTP
									</Button>
								</div>
								<Modal show={show} onHide={handleClose}>
									<Modal.Header closeButton>
										<Modal.Title className="up">
											Confirm your email to register
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
														type="email"
														style={{
															border: "none",
															outline: "none",
														}}
														placeholder="Enter email"
														onChange={setVal}
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
														// disabled={disableOtp}
														value={inpOTP}
														onChange={
															handleOnChange
														}
													/>
												</Form.Group>
											)}

											<ToastContainer />
											{isOn ? (
												<Button
													className="green_btn"
													color="info"
													onClick={sendLink}
												>
													Submit
												</Button>
											) : (
												<Button
													color="info"
													onClick={handleSubmit}
												>
													Verfify
												</Button>
											)}
										</Form>
									</Modal.Body>
								</Modal>
								<div>
									<div>
										<input
											type="password"
											placeholder="Password"
											name="password"
											onChange={formik.handleChange}
											value={formik.values.password}
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
											onChange={formik.handleChange}
											value={
												formik.values.confirmPassword
											}
										/>
										{formik.errors.confirmPassword &&
										formik.touched.confirmPassword ? (
											<p className="mssg">
												{formik.errors.confirmPassword}
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

								<div className="row accept">
									<div className="mt-2 ">
										<input
											type="checkbox"
											name="acceptTerms"
											onChange={formik.handleChange}
										/>
										<label
											htmlFor="checkbox-2"
											className="checkbox__label"
										>
											I accept terms and conditions
										</label>
										{formik.errors.acceptTerms &&
										formik.touched.acceptTerms ? (
											<div className="mssg">
												{formik.errors.acceptTerms}
											</div>
										) : (
											""
										)}
									</div>

									<div className="up">
										<button
											type="submit"
											className="green_btn "
										>
											Sign Up
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Signup;
