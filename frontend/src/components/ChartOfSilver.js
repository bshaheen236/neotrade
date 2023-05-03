import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Table from "react-bootstrap/Table";
import { getSilverPrice } from "../services/newtrade";

export default function ChartOfSilver() {
	const [options, setOptions] = useState({
		chart: {
			inverted: false,
		},
		title: {
			text: "Silver",
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
				data: [4, 7, 3, 5],
				name: "High",
			},
			{
				type: "line",
				data: [4, 2, 8, 6],
				name: "Low",
			},
		],
	});

	// set Graph
	useEffect(() => {
		getSilverPrice().then((result) => {
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
							<th> Live Silver Price</th>
							<th>Silver Price Today</th>
							<th>Silver Chnage</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Live Silver Price per Ounce </td>
							<td> 23.575</td>
							<td> +23.36% </td>
						</tr>
						<tr>
							<td>Live Silver Price per Gram </td>
							<td>2,3575</td>
							<td>+4.34%</td>
						</tr>
						<tr>
							<td>Live Silver Price per Kilo </td>
							<td>200</td>

							<td>+3.4%</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);
}
