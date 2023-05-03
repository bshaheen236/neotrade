import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Table from "react-bootstrap/Table";
import { getGoldPrice } from "../services/newtrade";

export default function ChartOfGold() {
	const [options, setOptions] = useState({
		chart: {
			inverted: false,
		},
		title: {
			text: "Gold",
		},
		credits: {
			enabled: false,
		},
		xAxis: {
			categories: [
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
		},
		yAxis: {
			title: {
				text: "Price",
			},
		},
		series: [
			{
				type: "line",
				data: [],
				name: "High",
			},
			{
				type: "line",
				data: [],
				name: "Low",
			},
		],
	});

	useEffect(() => {
		getGoldPrice().then((result) => {
			setOptions({
				...options,
				series: [
					{
						type: "line",
						data: result.data.data.high,
						name: "High",
					},
					{
						type: "line",
						data: result.data.data.low,
						name: "Low",
					},
				],
			});
		});
	}, []);

	return (
		<div className="row">
			<div className="col-md-7">
				<HighchartsReact highcharts={Highcharts} options={options} />
			</div>
			<div className="col-md-5 pt-5">
				<Table striped bordered hover variant="light" className="mt-5">
					<thead>
						<tr>
							<th> Gold Price</th>
							<th>Gold Price Today</th>
							<th>Gold Chnage</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td> GoldPrice per Ounce </td>
							<td> 23.575</td>
							<td> +23.36% </td>
						</tr>
						<tr>
							<td> GoldPrice per Gram </td>
							<td>5200</td>
							<td>+4.34%</td>
						</tr>
						<tr>
							<td> Live Gold Price per Kilo </td>
							<td>520000</td>

							<td>+3.4%</td>
						</tr>
					</tbody>
				</Table>
			</div>
			<div />
		</div>
	);
}
