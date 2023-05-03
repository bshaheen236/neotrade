// import React, { useState } from "react"
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { plusAction, minusAction } from "../redux/action/counterAction";

export default function Counter() {
	const count = useSelector((state) => state.counterReducer);
	const dispatch = useDispatch();
	return (
		<div className="container text-center mt-5">
			<Button
				className="btn btn-primary"
				onClick={() => dispatch(plusAction())}
			>
				Plus
			</Button>
			{count}
			<Button
				className="btn btn-danger"
				onClick={() => dispatch(minusAction())}
			>
				Minus
			</Button>
		</div>
	);
}
