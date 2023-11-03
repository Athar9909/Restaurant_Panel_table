import React, { useEffect, useState } from "react";
import Profile from "../Dashboard/Profile";
import Sidebar from "../Dashboard/Sidebar";
import {
  DashboardData,
  GetOrders,
  exportMenu,
  exportOrderData,
  exportTransactionData,
} from "../adminLogin/httpServicesAdmin/adminApis";
import { useNavigate } from "react-router-dom";

const Dining = () => {
  const [slide, setSlide] = useState("BookM");
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [count, setCount] = useState();

  useEffect(() => {
    getAllDinings();
    getDashData();
  }, []);

  const getAllDinings = async (key) => {
    const { data } = await GetOrders({
      search: key ? key : "",
      type: "Dining",
    });
    if (!data?.error) {
      let values = data?.results?.orders;
      setList(values);
    }
  };
  const getDashData = async (key) => {
    const { data } = await DashboardData();
    if (!data?.error) {
      let values = data?.results;
      setCount(values);
    }
  };

  const ExportRevenue = async () => {
    const { data } = await exportTransactionData();
    if (!data?.error) {
      window.open(data?.results?.file);
    }
  };
  const ExportOrder = async () => {
    const { data } = await exportOrderData();
    if (!data?.error) {
      window.open(data?.results?.file);
    }
  };
  const ExportMenu = async () => {
    const { data } = await exportMenu();
    if (!data.error) {
      window?.open(data?.results?.file);
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
                <h2>Dinings</h2>
              </div>
              <div className="col-12 mb-4">
                <div className="row statics_part">
                  <div className="col-md-4">
                    <div className="statics_box">
                      <div className="statics_left">
                        <strong>{count?.totalTables}</strong>
                        <span>Total QR</span>
                        <div className="">
                          <span>
                            <img
                              width={25}
                              onClick={() => {
                                ExportMenu();
                              }}
                              className="expIcon"
                              src={require("../../assets/img/exp.png")}
                              alt=""
                            />
                          </span>
                        </div>
                      </div>
                      <div className="statics_icon">
                        <span>
                          <img
                            src={require("../../assets/img/menus.png")}
                            alt=""
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="statics_box">
                      <div className="statics_left">
                        <strong>{count?.totalRevenue}</strong>
                        <span>Grand Total</span>
                        <div className="">
                          <span>
                            <img
                              width={25}
                              onClick={() => {
                                ExportRevenue();
                              }}
                              className="expIcon"
                              src={require("../../assets/img/exp.png")}
                              alt=""
                            />
                          </span>
                        </div>
                      </div>
                      <div className="statics_icon">
                        <span>
                          <img
                            src={require("../../assets/img/dollar.png")}
                            alt=""
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="statics_box">
                      <div className="statics_left">
                        <strong>{count?.totalOrders}</strong>
                        <span>Total orders</span>
                        <div className="">
                          <span>
                            <img
                              width={25}
                              onClick={() => {
                                ExportOrder();
                              }}
                              className="expIcon"
                              src={require("../../assets/img/exp.png")}
                              alt=""
                            />
                          </span>
                        </div>
                      </div>
                      <div className="statics_icon">
                        <span>
                          <img
                            src={require("../../assets/img/orders.png")}
                            alt=""
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-4">
                <form action="#" className="row search_part">
                  <div className="form-group col-12 position-relative">
                    <input
                      className="form-control"
                      type="text"
                      id=""
                      placeholder="Search Order Id"
                      onChange={(e) => {
                        getAllDinings(e.target.value);
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
                            <th>Order Id</th>
                            <th>Table ID</th>
                            <th>Order ID</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list?.map((item, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item?.tableId?.name}</td>
                              <td>{item?.orderId}</td>
                              <td>{item?.status}</td>
                              <td>
                                <a
                                  onClick={() => {
                                    navigate(
                                      `/restaurant/dashboard/booking/View/${item?._id}`
                                    );
                                  }}
                                  className="table_btn">
                                  View
                                </a>
                              </td>
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

export default Dining;
