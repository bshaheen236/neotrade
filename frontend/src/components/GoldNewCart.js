import React, { useEffect, useState } from "react";
import { getGoldData } from "../services/newtrade";

export default function GoldNewCart() {
	const [gold18, setGold18] = useState();
	const [gold22, setGold22] = useState();
	const [gold24, setGold24] = useState();
	useEffect(() => {
		getGoldData().then((res) => {
			const month = new Date().getMonth();
			const data = res.data.data[month];
			parseFloat(setGold18(data.gold_18_carat));
			setGold22(data.gold_22_carat);
			setGold24(data.gold_24_carat);

			// console.log(typeof i);
		});
	});
	return (
		<>
			<h1>18 crt goldprice {gold18}</h1>
			<h1>22 crt goldprice {gold22}</h1>
			<h1>24 crt goldprice {gold24}</h1>
		</>
	);
}
