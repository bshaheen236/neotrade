import React, { useEffect, useState } from "react";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { walletTransaction } from "../services/wallet";
import Sidenav from "./Sidenav";

export default function WalletTransaction({ propsId }) {
  const id = propsId || localStorage.getItem("id");

  const [transaction, setTransactions] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const limit = 10;
  const token = localStorage.getItem("token");

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    walletTransaction(id, 1, limit, headers).then((res) => {
      if (res.data.statusCode === 203) {
        setFlag(true);
      } else {
        setTransactions(res.data.transactionData);
        console.log(res.data.transactionData,"transaciton");
        const total = res.data.length;
        setPageCount(Math.ceil(total / limit));
      }
    });
  }, []);

  const renderPages = async (currentPage) => {
    const data = await walletTransaction(id, currentPage, limit, headers);
    return data.data.transactionData;
  };

  const handlePageClick = async (e) => {
    const currentPage = e.selected + 1;
    const data = await renderPages(currentPage);
    setTransactions(data);
  };

  return (
    <>
      <Sidenav />

      <div className="mx-5 w-550 align:center">
        {" "}
        <div
          className="mt-5 d-flex justify-content-center text-white py-4 border-bottom text-center pb-4"
          style={{ background: "#b8565f" }}
        >
          <h2 className="pt-5">Wallet Transactions</h2>
        </div>
        {flag ? (
          <h3
            className="text-center"
            style={{ color: "#a8a8a7", marginTop: "200px" }}
          >
            No any transaction yet
          </h3>
        ) : (
          <div>
            <div className="scrollmenu">
            <Table bordered hover>
              <thead>
                <tr className="text-center">
                  <th>Transaction Id</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {transaction?.map((item) => (
                  <tr className="text-center" key={item.transaction._id}>
                    <td>{item.transaction.transactionId}</td>
                    <td>
                      {item.transaction.time.split("T")[0]} {"  "}{" "}
                      {item.transaction.time
                        .split("T")[1]
                        .substring(
                          0,
                          item.transaction.time.split("T")[1].indexOf(".")
                        )}
                    </td>
                    <td>
                      {item.transaction.process === 0 ? (
                        <div>
                          <span>{item.transaction.amount}</span>
                          <sub className="text-danger "> Dr</sub>
                        </div>
                      ) : (
                        <div>
                          <span>{item.transaction.amount}</span>
                          <sub className="text-success "> Cr</sub>
                        </div>
                      )}
                    </td>
                    <td>
                      {item.transaction.process === 0 ? (
                        <div>
                          <span>Wallet Debited</span>{" "}
                          <BsArrowDownLeft style={{ color: "red" }} />
                        </div>
                      ) : (
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
        )}
      </div>
    </>
  );
}
