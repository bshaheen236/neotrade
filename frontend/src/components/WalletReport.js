import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import Sidenav from "./Sidenav";
import { walletExport, viewAdminWallet } from "../services/wallet";
import "../Pagination.css";

export default function WalletReport() {
    const [transaction, setTransactions] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [adminWallet, setAdminWallet] = useState(0);
    const [exportData, setExportData] = useState([]);

    const limit = 10;

    useEffect(() => {
        viewAdminWallet().then(res => {
            setAdminWallet(res.data.data.amount);
            
        });
    }, []);
    useEffect(() => {
        walletExport(1, limit).then((res) => {
            setTransactions(res.data.Transactions.transactionData);
            const total = res.data.length;
            setPageCount(Math.ceil(total / limit));
            const data = res.data.withoutPagination
            setExportData(data)
        });
    }, []);

    const renderPages = async (currentPage) => {
        const data = await walletExport(currentPage, limit);
        return data.data.Transactions.transactionData;
    };

    const handlePageClick = async (e) => {
        const currentPage = e.selected + 1;
        const data = await renderPages(currentPage);
        setTransactions(data);
    };

    const withdrow = [];
    transaction.map((i) => {
        if (i.transaction.process === 0) {

            withdrow.push(i);
        }
        return withdrow;

    })
    const deposite = [];
    transaction.map((i) => {
        if (i.transaction.process === 1) {

            deposite.push(i);
        }
        return deposite;

    })

    const exportWithdrow = [];
    exportData.map((i) => {
        if (i.transaction.process === 0) {
            exportWithdrow.push(i.transaction);
        }
        return exportWithdrow;
    })
    const exportDeposite = [];
    exportData.map((i) => {
        if (i.transaction.process === 1) {
            exportDeposite.push(i.transaction);
        }
        return exportDeposite;
    })

    return (
        <>
            <Sidenav />
            <div className="text-center" style={{ marginTop: "90px" }}>

                <h1>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                    Wallet Reports <span style={{ fontSize: "16px" }}>
                        &nbsp; &nbsp;&nbsp; Your Wallet Balance: <span className="text-danger">{adminWallet}
                        </span></span>
                </h1>
                <div className="d-fex ">
                    <CSVLink data={exportDeposite}
                        className="btn btn-primary mx-1">
                        Export Deposite records
                    </CSVLink>
                    <CSVLink data={exportWithdrow}
                        className="btn btn-primary mx-1">
                        Eport Withdrow Records
                    </CSVLink>
                </div>
                <div className="text-center" style={{ marginTop: "20px" }}>
                    <Tabs
                        defaultActiveKey="gold"
                        id="uncontrolled-tab-example"
                        className=" mb-2"
                        style={{ marginLeft: "70px" }}
                    >

                        <Tab eventKey="gold" >

                            <Card>
                                <Card.Header className="bg-secondary">
                                    {" "}
                                    Deposite Records
                                </Card.Header>
                                <Card.Body className="text-center">
                                    <div className="container mt-1">
                                        <div className="row scrollmenu">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>

                                                        <th>User Name</th>
                                                        <th>Email</th>
                                                        <th>Date</th>
                                                        <th>Amount</th>
                                                        <th>Type</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {deposite?.map((item) => (
                                                        <tr className="text-center" key={item.transaction._id}>

                                                            <td>{item.transaction.name}</td>
                                                            <td>{item.transaction.email}</td>
                                                            <td>
                                                                {item.transaction.time.split("T")[0]}

                                                            </td>
                                                            <td>
                                                                {item.transaction.process === 1 && (

                                                                    <div>
                                                                        <span>{item.transaction.amount}</span>
                                                                        <sub className="text-success "> Cr</sub>
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item.transaction.process === 1 && (

                                                                    <div>
                                                                        <span>Wallet Credited</span>{" "}
                                                                        <BsArrowUpRight style={{ color: "green" }} />
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                        </Tab>

                        <Tab eventKey="gold">

                            <Card>
                                <Card.Header className="bg-secondary">
                                    {" "}
                                    Withdrow Records
                                </Card.Header>
                                <Card.Body className="text-center">
                                    <div className="container mt-1">
                                        <div className="row scrollmenu">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>User Name</th>
                                                        <th>Email</th>
                                                        <th>Date</th>
                                                        <th>Amount</th>
                                                        <th>Type</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {withdrow?.map((item) => (
                                                        <tr className="text-center" key={item.transaction._id}>
                                                            <td>{item.transaction.name}</td>
                                                            <td>{item.transaction.email}</td>
                                                            <td>
                                                                {item.transaction.time.split("T")[0]}
                                                            </td>
                                                            <td>
                                                                {item.transaction.process === 1 ? (

                                                                    <div>
                                                                        <span>{item.transaction.amount}</span>
                                                                        <sub className="text-success "> Cr</sub>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <span>{item.transaction.amount}</span>
                                                                        <sub className="text-danger "> Dr</sub>
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item.transaction.process === 1 ? (

                                                                    <div>
                                                                        <span>Wallet Credited</span>{" "}
                                                                        <BsArrowUpRight style={{ color: "green" }} />
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <span>Wallet Debited</span>{" "}
                                                                        <BsArrowDownLeft style={{ color: "red" }} />
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <div className="pagination">
                                <ReactPaginate
                                    previousLabel="Previous"
                                    nextLabel="Next"
                                    breakLabel="..."
                                    pageCount={pageCount}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={1}
                                    onPageChange={handlePageClick}
                                    containerClassName="pagination justify-content-center"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    activeClassName="active"
                                />
                            </div>
                            <hr />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
