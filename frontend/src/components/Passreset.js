import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { sendPasswordLink } from "../services/loginUser";
import Navbar from "./Navbar";

function Passreset() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const setVal = (e) => {
		setEmail(e.target.value);
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
			sendPasswordLink({ email })
				.then((result) => {
					if (result.data.status === 201) {
						setEmail("");
						setMessage(true);
					} else {
						toast.error("Invalid User", {
							position: "top-center",
						});
					}
				})
				.catch((err) => err);
		}
	};

	return (
		<>
			<Navbar />
			<div className=" signup_container2 font ">
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
										}}
									>
										pasword reset link send Succsfully in
										Your Email
									</p>
								) : (
									""
								)}
								<Form
									autocomplete="off"
									className="form_container2"
								>
									<h3 className="mb-4 text-center">
										{" "}
										RESET{" "}
									</h3>
									<Form.Group className="mb-3">
										<input
											type="email"
											placeholder="Email"
											name="email"
											value={email}
											onChange={setVal}
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
										onClick={sendLink}
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
export default Passreset;
