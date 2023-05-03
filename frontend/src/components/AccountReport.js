import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import { floor } from "lodash";
import { CSVLink } from "react-csv";
import Sidenav from "./Sidenav";
import { exportSellData, exportBuyData } from "../services/SellBuy";
import "../Pagination.css";

export default function AccountReport() {
    // sell oders
    const [sellOrders, setsellOrders] = useState([]);
    const [pagesell, setPagesell] = useState(1);
    const [limitsell, setLimitsell] = useState(10);
    const [selltotalCount, setsellTotalCount] = useState(0);
    const [nextsell, setsellNext] = useState(null);
    const [previoussell, setsellPrevious] = useState(null);
    const [currentPagesell, setcurrentPagesell] = useState(1);
    const [ValuesSell, setValuesSell] = useState("");

    // buy orders
    const [buyOrders, setbuyOrders] = useState([]);
    const [pagebuy, setPagebuy] = useState(1);
    const [limitbuy, setLimitbuy] = useState(10);
    const [buytotalCount, setbuyTotalCount] = useState(0);
    const [nextbuy, setbuyNext] = useState(null);
    const [previousbuy, setbuyPrevious] = useState(null);
    const [currentPagebuy, setcurrentPagebuy] = useState(1);
    const [ValuesBuy, setValuesBuy] = useState("");
    const [ProfitLoss, setProfitLoss] = useState([]);


    // sell actions
    useEffect(() => {
        const genrateData = async () => {
            const data = await exportSellData(pagesell, limitsell);
            const data2 = await data.data.withountPagination
            setProfitLoss(data2);
            const data3 = data2.map((item =>
                [item.Order_id, item.category, item.unit, item.price, item.quantity, item.trade_amount, item.profit_loss]))
            data3.unshift(["Order_id,", "category", "unit", "price", "quantity", "trade_amount", "profit_loss"])
            setValuesSell(data3);

            const res = await data.data.withPagination
            setsellOrders(res.data);
            setsellTotalCount(res.totalCount);
            setsellNext(res.nextsell);
            setsellPrevious(res.previoussell);
            setcurrentPagesell(res.current.pagesell);

        }
        genrateData();
    }, [pagesell, limitsell]);

    const profit = [];
    ProfitLoss.map(item => {

        if (item.profit_loss > 0) {
            profit.push([item.Order_id, item.category, item.unit, item.price, item.quantity, item.trade_amount, item.profit_loss])
        }
        return profit;
    })

    profit.unshift(["Order_id,", "category", "unit", "price", "quantity", "trade_amount", "profit"])

    const loss = [];
    ProfitLoss.map(item => {

        if (item.profit_loss < 0) {
            loss.push([item.Order_id, item.category, item.unit, item.price, item.quantity, item.trade_amount, item.profit_loss])
        }
        return loss;
    })

    loss.unshift(["Order_id,", "category", "unit", "price", "quantity", "trade_amount", "loss"])

    const handleNextsell = () => {
        setPagesell(nextsell.pagesell);
        setLimitsell(nextsell.limitsell);
    };

    const handlePrevioussell = () => {
        setPagesell(previoussell.pagesell);
        setLimitsell(previoussell.limitsell);
    };

    const npagesell = Math.ceil(selltotalCount / limitsell);
    const numberssell = [...Array(npagesell + 1).keys()].slice(1)

    function changePagesell(id) {
        setcurrentPagesell(id)
        setPagesell(id);
    }

    // buy actions
    useEffect(() => {
        const fetchData = async () => {
            const data = await exportBuyData(pagebuy, limitbuy)
            const data2 = await data.data.withountPagination
            const data3 = data2.map((item =>
                [item.Order_id, item.category, item.unit, item.price, item.quantity, item.trade_amount]))
            data3.unshift(["Order_id,", "category", "unit", "price", "quantity", "trade_amount"])
            setValuesBuy(data3);
            const res = await await data.data.withPagination
            setbuyOrders(res.data);
            setbuyTotalCount(res.totalCount);
            setbuyNext(res.nextbuy);
            setbuyPrevious(res.previousbuy);
            setcurrentPagebuy(res.current.pagebuy);
        };
        fetchData();
    }, [pagebuy, limitbuy]);



    const handleNextbuy = () => {
        setPagebuy(nextbuy.pagebuy);
        setLimitbuy(nextbuy.limitbuy);
    };

    const handlePreviousbuy = () => {
        setPagebuy(previousbuy.pagebuy);
        setLimitbuy(previousbuy.limitbuy);
    };

    const npage = Math.ceil(buytotalCount / limitbuy);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function changePage(id) {
        setcurrentPagebuy(id)
        setPagebuy(id);
    }


    return (
        <>
            <Sidenav />
            <div className="text-center" style={{ marginTop: "90px" }}>

                <h1>Accounting Reports</h1>
                <div className="d-flex" style={{ marginLeft: "450px" }}>
                    <CSVLink data={profit}
                        className="btn btn-primary mx-1">
                        Export profitable user data
                    </CSVLink>
                    <CSVLink data={loss}
                        className="btn btn-primary mx-1">
                        Export loss making user data
                    </CSVLink>
                </div>
                <div className="text-center" style={{ marginTop: "20px" }}>
                    <Tabs
                        defaultActiveKey="gold"
                        id="uncontrolled-tab-example"
                        className=" mb-2"
                        style={{ marginLeft: "70px" }}
                    >
                        <Tab eventKey="gold" title="Sell">
                            <div>
                                <CSVLink data={ValuesSell}
                                    className="btn btn-primary">
                                    Export users Sell Data
                                </CSVLink>
                            </div>
                            <Card>
                                <Card.Header className="bg-secondary  mx-1">
                                    {" "}
                                    History Of Your Order
                                </Card.Header>
                                <Card.Body className="text-center">
                                    <div className="container mt-1">
                                        <div className="row">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        <th>Order Id</th>
                                                        <th>Category</th>
                                                        <th>Unit</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                        <th>Amount</th>
                                                        <th>Date</th>
                                                        <th>Profit_loss</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sellOrders.map(
                                                        (element, id) => {
                                                            return (
                                                                <tr>
                                                                    <th scope="row">
                                                                        {id + 1}
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            element.Order_id
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            element.category
                                                                        }
                                                                        |
                                                                        {
                                                                            element.type
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            element.unit
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            element.quantity
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            element.price
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            element.trade_amount
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {element.createdAt.split("T")[0]}


                                                                    </td>
                                                                    <td>
                                                                        {element.profit_loss <
                                                                            0 ? (
                                                                            <span className="text-danger">
                                                                                $
                                                                                {floor(
                                                                                    element.profit_loss
                                                                                )}{" "}
                                                                                <i className="fa-solid fa-circle-arrow-down" />
                                                                            </span>
                                                                        ) : (
                                                                            <span className="text-success">
                                                                                $
                                                                                {floor(
                                                                                    element.profit_loss
                                                                                )}{" "}
                                                                                <i className="fa-solid fa-circle-arrow-up" />
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <div className="pagination">
                                {previoussell && (
                                    <li className="page-item">
                                        <button
                                            onClick={handlePrevioussell}
                                            type="button"
                                        >
                                            <i className="fa-solid fa-angles-left mt-2" />...
                                        </button>
                                    </li>
                                )}

                                {numberssell.map((n) => (
                                    <li className={`page-item ${currentPagesell === n ? "active" : ""}`} key={n + 1}>
                                        <a href="#" className="page-link"
                                            onClick={() => changePagesell(n)}> {n}
                                        </a>

                                    </li>
                                ))
                                }

                                {nextsell && (
                                    <li className="page-item">
                                        <button onClick={handleNextsell} type="button">
                                            ...<i className="fa-solid fa-angles-right mt-2" />
                                        </button>
                                    </li>
                                )}
                            </div>
                            <hr />
                        </Tab>

                        <Tab eventKey="silver" title="Buy">
                            <div className="text-center ml-4" />
                            <div>
                                <CSVLink data={ValuesBuy} className="btn btn-primary">Export users Buy Data</CSVLink>
                            </div>

                            <Card>
                                <Card.Header
                                    className="bg-secondary text-bold"
                                    style={{ fontSize: "20px" }}
                                >
                                    {" "}
                                    History Of Your Order
                                </Card.Header>
                                <Card.Body className="text-center">
                                    <div className="container mt-1">
                                        <div className="row">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        <th>Order Id</th>
                                                        <th>Category</th>
                                                        <th>Unit</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                        <th>Date</th>
                                                        <th>Amount(ExcludingTax )</th>
                                                        {/* <th>Date</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {buyOrders.map(
                                                        (element, id) => {
                                                            return (
                                                                <tr>
                                                                    <th scope="row">
                                                                        {id + 1}
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            element.Order_id
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            element.category
                                                                        }
                                                                        |
                                                                        {
                                                                            element.type
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            element.unit
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            element.quantity
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            element.price
                                                                        }
                                                                    </td>
                                                                    <td>

                                                                        {element.createdAt.split("T")[0]}

                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            element.trade_amount
                                                                        }
                                                                    </td>

                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <div className="pagination">
                                {/* Render pagination controls */}
                                {previousbuy && (
                                    <li className="page-item">
                                        <button
                                            onClick={handlePreviousbuy}
                                            type="button"
                                        >
                                            <i className="fa-solid fa-angles-left mt-2" />...
                                        </button>
                                    </li>
                                )}
                                {numbers.map((n) => (
                                    <li className={`page-item ${currentPagebuy === n ? "active" : ""}`} key={n + 1}>
                                        <a href="#" className="page-link"
                                            onClick={() => changePage(n)}> {n}
                                        </a>

                                    </li>
                                ))
                                }
                                {nextbuy && (
                                    <li className="page-item">
                                        <button onClick={handleNextbuy} type="button">
                                            ...<i className="fa-solid fa-angles-right mt-2" />
                                        </button>
                                    </li>
                                )}
                            </div>
                            <hr />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
