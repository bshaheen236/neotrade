import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { forgotPassword, idToken } from "../services/loginUser";
import Navbar from "./Navbar";

function Forgotpass() {
	const navigate = useNavigate();
	const { id, token } = useParams();
	const history = useNavigate();
	// const [data2, setData] = useState(false);
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const successAlert = () => {
		Swal.fire({
			title: "Password reset successfully",
			icon: "success",
		});
	};

	const userValid = async () => {
		forgotPassword(id, token)
			.then((result) => {
				if (result.status === 201) {
					// console.log("user valid")
				} else {
					history("*");
				}
			})
			.catch((err) => err);
	};

	const setval = (e) => {
		setPassword(e.target.value);
	};

	const sendpassword = async (e) => {
		e.preventDefault();

		if (password === "") {
			toast.error("password is required!", {
				position: "top-center",
			});
		} else if (password.length < 6) {
			toast.error("password must be 6 char!", {
				position: "top-center",
			});
		} else {
			// api
			await idToken({ id: id, token: token, password: password })
				.then((result) => {
					if (result.status === 201) {
						setPassword("");
						setMessage(true);
						successAlert();
						navigate("/login");
					} else {
						toast.error("! Token Expired generate new LInk", {
							position: "top-center",
						});
					}
				})
				.catch((err) => err);
		}
	};
	useEffect(() => {
		userValid();
		setTimeout(() => {
			// setData(true)
		}, 3000);
	}, []);

	return (
		<>
			<Navbar />

			<div className="signup_container2 font">
				<div className=" row">
					<div className="right col">
						<div className=" clr " style={{ textAlign: "center" }}>
							<div
								className="login text-dark"
								style={{ backgroundColor: "white" }}
							>
								{message ? (
									<p
										style={{
											color: "green",
											fontWeight: "bold",
											marginLeft: "100px",
										}}
									>
										password successfully update
									</p>
								) : (
									""
								)}
								<Form
									autocomplete="off"
									className="form_container2"
								>
									<h3 className="mb-3 text-center">
										{" "}
										New Password
									</h3>
									<Form.Group className="mb-3">
										<input
											type="password"
											placeholder="Password"
											name="password"
											value={password}
											onChange={setval}
											style={{
												outline: "none",
												border: "none",
												padding: "15px",
												borderRadius: "10px",
												backgroundColor: "#edf5f3",
												margin: "5px 0",

												width: "100%",
											}}
										/>
									</Form.Group>
									<div className="col">
										<span>
											<a
												href="/login"
												style={{
													fontSize: "12px",
													paddingLeft: "340px",
												}}
											>
												Click here to login 👈
											</a>
										</span>
									</div>

									<Button
										className="bg-primary green_btn"
										style={{
											borderRadius: "10px",
											marginLeft: "190px",
											paddingTop: "8px",
										}}
										type="button"
										href="/"
										onClick={sendpassword}
									>
										Send
									</Button>
								</Form>
								<ToastContainer />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Forgotpass;
