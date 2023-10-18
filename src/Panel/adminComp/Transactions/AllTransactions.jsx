import React, { useEffect, useState } from "react";
import Profile from "../Dashboard/Profile";
import Sidebar from "../Dashboard/Sidebar";
import {
  GetAllTransactions,
  GetOrders,
} from "../adminLogin/httpServicesAdmin/adminApis";
import { useNavigate } from "react-router-dom";

const AllTransactions = () => {
  const [slide, setSlide] = useState("TransM");
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async (key) => {
    const { data } = await GetAllTransactions({
      search: key ? key : "",
      branch: "",
    }); 
    if (!data?.error) {
      let values = data?.results?.transactions;
      setList(values);
    }
  };

  return (
    <div>
      <div className="admin_main">
        <Profile />
        <div className="admin_innermain d-flex">
          <Sidebar slide={slide} />
          <div className="admin_main_part">
            <div className="row">
              <div className="col-12 heading_main mb-4">
                <h2>All Transactions</h2>
              </div>

              <div className="col-12 mb-4">
                <form action="#" className="row search_part">
                  <div className="form-group col-12 position-relative">
                    <input
                      className="form-control"
                      type="text"
                      id=""
                      placeholder="Search by Transaction Id"
                      onChange={(e) => {
                        getTransactions(e.target.value);
                      }}
                    />
                    <a className="search_bt">
                      <img
                        src={require("../../assets/img/search.png")}
                        alt=""
                      />
                    </a>
                  </div>
                </form>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12 table_comman mt-3">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Order Date</th>
                            <th>Order Id</th>
                            <th>Table Id</th>
                            <th>Transaction Id</th>
                            <th>Order Type</th>
                            <th>Total</th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {list?.map((item, index) => (
                            <tr>
                              <td>{item?.createdAt?.slice(0, 10)}</td>
                              <td>{item?.orderId?.orderId}</td>
                              <td>{item?.orderId?.tableId?.name}</td>
                              <td>{item?.transactionId}</td>
                              <td>{item?.type}</td>
                              <td>{item?.orderId?.total}</td>
                              {/* <td>
                                <a
                                  className="table_btn"
                                  onClick={() => {
                                    navigate(
                                      `/restaurant/dashboard/booking/View/${item?._id}`
                                    );
                                  }}>
                                  View
                                </a>
                              </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="pagination_custom">
                      <a href="javascript:;">
                        <img src="assets/img/ar_left.png" alt="" />
                      </a>{" "}
                      <span>1 - 10 of 100</span>{" "}
                      <a href="javascript:;">
                        <img src="assets/img/ar_right.png" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTransactions;
