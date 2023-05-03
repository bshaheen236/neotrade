import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import {
// 	Chart as ChartJS,
// 	Title,
// 	Tooltip,
// 	LineElement,
// 	CategoryScale,
// 	LinearScale,
// 	PointElement,
// 	Legend,
// } from "chart.js";
// import Table from "react-bootstrap/Table";
import { getGoldData } from "../services/trade";

// ChartJS.register({
// 	Title,
// 	Tooltip,
// 	LineElement,
// 	CategoryScale,
// 	LinearScale,
// 	PointElement,
// 	Legend,
// });

export default function GoldChart() {
	const [jan, setJan] = useState([]);
	const [feb, setFeb] = useState([]);
	const [mar, setMar] = useState([]);
	const [apr, setApr] = useState([]);
	const [may, setMay] = useState([]);
	const [jun, setJun] = useState([]);
	const [jul, setJul] = useState([]);
	const [aug, setAug] = useState([]);
	const [sep, setSep] = useState([]);
	const [oct, setOct] = useState([]);
	const [nov, setNov] = useState([]);
	const [dec, setDec] = useState([]);

	const data = {
		labels: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		datasets: [
			{
				label: "Gold Price",
				// data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13],
				data: [
					jan,
					feb,
					mar,
					apr,
					may,
					jun,
					jul,
					aug,
					sep,
					oct,
					nov,
					dec,
				],
				backgroundColor: "red",
				borderColor: "gray",
				pointBorderColor: "gray",
				fill: true,
				tension: 0.1,
			},
		],
	};

	const options = {
		plugins: {
			legend: true,
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 0.1,
				},
			},
		},
	};

	useEffect(() => {
		getGoldData()
			.then((result) => {
				setJan(result.data.data[0].Jan[0].price);
				setFeb(result.data.data[0].Feb[0].price);
				setMar(result.data.data[0].Mar[0].price);
				setApr(result.data.data[0].Apr[0].price);
				setMay(result.data.data[0].May[0].price);
				setJun(result.data.data[0].Jun[0].price);
				setJul(result.data.data[0].Jul[0].price);
				setAug(result.data.data[0].Aug[0].price);
				setSep(result.data.data[0].Sep[0].price);
				setOct(result.data.data[0].Oct[0].price);
				setNov(result.data.data[0].Nov[0].price);
				setDec(result.data.data[0].Dec[0].price);
			})
			.catch((err) => err);
	}, []);

	return (
		<div className="container-fluid">
			<div className="row" style={{ marginLeft: "20px" }}>
				<div style={{ width: "700px", height: "400px" }}>
					<h1>
						{data} {options}data
					</h1>
				</div>
			</div>
		</div>
	);
}
