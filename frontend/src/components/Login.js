import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { isLoggedIn, signin, isAdmin } from "../services/loginUser";
import SignIn from "./googleSignin/SignIn";
import Navbar from "./Navbar";
import { LOGIN_EMAIL_RGX, LOGIN_PASS_RGX } from "../Constant/Regex";
import "../Login.css";

function Login() {
	const navigate = useNavigate();
	const [data, setdata] = useState({
		email: "",
		password: "",
	});
	const [emailErr, setEmailErr] = useState(false);
	const [passwordErr, setPasswordErr] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setdata({
			...data,
			[name]: value,
		});
		setEmailErr(false);
		setPasswordErr(false);
	};
	const successAlert = () => {
		Swal.fire({
			title: "Login successfully",
			icon: "success",
		});
	};

	// const cancelAlert = () => {
	// 	Swal.fire({
	// 		title: "User doesn"t exist",
	// 		icon: "cancelled",
	// 	});
	// };
	// const cancelAlert2 = () => {
	// 	Swal.fire({
	// 		title: "User doesnt exist",
	// 		icon: "cancelled",
	// 	});
	// };
	const Login = (e) => {
		e.preventDefault();
		const eRegex = LOGIN_EMAIL_RGX;
		const pwdRegex = LOGIN_PASS_RGX;
		if (data.email === "" || !eRegex.test(data.email)) {
			setEmailErr(true);
		}
		if (data.password === "" || !pwdRegex.test(data.password)) {
			setPasswordErr(true);
		} else {
			signin(data).then((res) => {
				if (res.data.statusCode === 200) {
					successAlert();
					localStorage.setItem("wname", res.data.data.fname);
					localStorage.setItem("wemail", res.data.data.email);
					localStorage.setItem("wphone", res.data.data.phone);
					// eslint-disable-next-line no-underscore-dangle
					localStorage.setItem("token", res.data.token);
					localStorage.setItem("id", res.data.id);
					localStorage.setItem("role", res.data.data.role);
					localStorage.setItem("userInfo", JSON.stringify(res.data));
					isLoggedIn();
					isAdmin();
					

					navigate("/dashboard");
				}
			});
		}
	};

	return (
		<>
			<Navbar />
			<div className="signup_container font">
				<div className=" signup_form_container row">
					<div className="left col-sm-3">
						<h1>New User</h1>

						<Link to="/SignUp">
							<button
								type="button"
								style={{ border: "none", marginTop: "0px" }}
								className="white_btn"
							>
								Sign Up
							</button>
						</Link>
					</div>
					<div className="right col">
						<form className="form_container pt-2">
							<h3>LOGIN </h3>

							<input
								type="email"
								placeholder="Email"
								name="email"
								onChange={handleChange}
								value={data.email}
								required
								className="input"
							/>

							{emailErr ? (
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
								type="password"
								placeholder="Password"
								name="password"
								onChange={handleChange}
								value={data.password}
								required
								className="input"
							/>
							{passwordErr ? (
								<Form.Text className="mssg">
									<p
										className="mssg"
										style={{ textAlign: "left" }}
									>
										Enter password
									</p>
								</Form.Text>
							) : (
								false
							)}

							<div className="col">
								<span>
									<a
										href="/passreset"
										style={{
											fontSize: "12px",
											paddingLeft: "240px",
										}}
									>
										Forgot Password?
									</a>
								</span>
							</div>

							<button
								type="submit"
								className="green_btn bg-primary"
								href="/"
								onClick={Login}
							>
								Login
							</button>

							<div className="login throu">
								<SignIn />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
export default Login;
