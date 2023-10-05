import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
// import "../../assets/css/style.css";
// import {
//   RecentOrders,
//   totalBuyers,
//   totalEarning,
//   totalOrders,
//   totalVendors,
// } from "../httpServices/dashHttpService";
// import AnimatedNumber from "react-animated-number/build/AnimatedNumber";
import { Link } from "react-router-dom";
import Profile from "./Profile";
// import { MDBDataTable } from "mdbreact";
// import moment from "moment";

const Dashboard = () => {
  const [slide, setSlide] = useState("Dash");
  const [sideBar, setSideBar] = useState();
  const initialValue = 0.0;

  // useEffect(() => {
  //   getTotalData();
  //   getRecentOrders();
  // }, []);
  // const [allBook, setAllBook] = useState({
  //   columns: [
  //     {
  //       label: "S.NO.",
  //       field: "sn",
  //       sort: "asc",
  //       width: 50,
  //     },
  //     {
  //       label: "BOOKING ID",
  //       field: "booking_id",
  //       sort: "asc",
  //       width: 100,
  //     },

  //     {
  //       label: "BUYER NAME",
  //       field: "name_buyer",
  //       sort: "asc",
  //       width: 100,
  //     },
  //     {
  //       label: "VENDOR NAME",
  //       field: "name_vendor",
  //       sort: "asc",
  //       width: 100,
  //     },
  //     {
  //       label: "AMOUNT",
  //       field: "number",
  //       sort: "asc",
  //       width: 100,
  //     },
  //     {
  //       label: "SCHEDULED FOR",
  //       field: "date",
  //       sort: "asc",
  //       width: 100,
  //     },
  //     {
  //       label: "ACTION",
  //       field: "action",
  //       sort: "asc",
  //       width: 100,
  //     },
  //   ],
  //   rows: [],
  // });

  // const getRecentOrders = async () => {
  //   const { data } = await RecentOrders();
  //   const newRows = [];
  //   if (!data.error) {
  //     let values = data?.results?.bookings;
  //     console.log(values);
  //     values?.map((list, index) => {
  //       const returnData = {};
  //       returnData.sn = index + 1 + ".";
  //       returnData.booking_id = list?.bookingID;
  //       returnData.name_buyer = list?.buyer?.full_name;
  //       returnData.name_vendor = list?.vendor?.full_name;
  //       returnData.number = list?.total;
  //       returnData.date = moment(list?.event_date).format("L");
  //       returnData.action = (
  //         <>
  //           <Link
  //             className="comman_btn2 table_viewbtn"
  //             to={`/Admin/Dashboard/Booking-Management/Booking-Details/${list?._id}`}
  //             // state={{ id: list?._id }}
  //           >
  //             View
  //           </Link>
  //         </>
  //       );
  //       newRows.push(returnData);
  //     });

  //     setAllBook({ ...allBook, rows: newRows });
  //   }
  // };

  // const getTotalData = async () => {
  //   const dataBuyer = await totalBuyers();
  //   const dataEarning = await totalEarning();
  //   const dataVendor = await totalVendors();
  //   const dataOrder = await totalOrders();
  //   localStorage.setItem("buyers", dataBuyer?.data?.results.buyers);
  //   localStorage.setItem(
  //     "earning",
  //     dataEarning?.data?.results.earning[0]?.total
  //   );
  //   localStorage.setItem("vendor", dataVendor?.data?.results.vendors);
  //   localStorage.setItem("orders", dataOrder?.data?.results.orders);
  // };

  // let buyers = localStorage.getItem("buyers");
  // let earning = localStorage.getItem("earning");
  // let vendors = localStorage.getItem("vendor");
  // let orders = localStorage.getItem("orders");

  const getBarClick = (val) => {
    console.log(val);
    setSideBar(val);
  };

  return (
    <div
      className="admin_main"
      // className={sideBar === "click" ? "expanded_main" : "admin_main"}
    >
      <Profile />
      <div className="admin_innermain d-flex">
        <Sidebar slide={slide} getBarClick={getBarClick} />

        <div className="admin_main_part">
          <div className="row">
            <div className="col-12 heading_main mb-4">
              <h2>Restaurants</h2>
            </div>
            <div className="col-12 mb-4">
              <div className="row statics_part">
                <div className="col-md-3">
                  <div className="statics_box">
                    <div className="statics_left">
                      <strong>459</strong>
                      <span>Total Menu</span>
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
                <div className="col-md-3">
                  <div className="statics_box">
                    <div className="statics_left">
                      <strong>87,500</strong>
                      <span>Total revenue</span>
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
                <div className="col-md-3">
                  <div className="statics_box">
                    <div className="statics_left">
                      <strong>780</strong>
                      <span>Total orders</span>
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
                <div className="col-md-3">
                  <div className="statics_box">
                    <div className="statics_left">
                      <strong>1800</strong>
                      <span>Total Visitor</span>
                    </div>
                    <div className="statics_icon">
                      <span>
                        <img
                          src={require("../../assets/img/visitors.png")}
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
                <div className="form-group col-9 position-relative">
                  <input
                    className="form-control"
                    type="text"
                    id=""
                    placeholder="Search by restaurant name"
                  />
                  <button className="search_bt">
                    <img src={require("../../assets/img/search.png")} alt="" />
                  </button>
                </div>
                <div className="col-3">
                  <a className="comman_btns w-100">Add New Restaurant</a>
                </div>
              </form>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-9"></div>
                <div className="col-3">
                  <div className="dropdown fliter_dropdown">
                    <a
                      className="btn btn-secondary dropdown-toggle"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      Filter: <strong>Not Applied</strong>
                    </a>
                    <div
                      className="dropdown-menu p-0"
                      aria-labelledby="dropdownMenuLink">
                      <div className="filter_data_top">
                        <form action="#">
                          <div className="form-group mb-5">
                            <label htmlFor="">Restaurant Address</label>
                            <select
                              className="form-select form-control"
                              aria-label="Default select example">
                              <option selected="">Alexandria, Egypt</option>
                              <option value={1}>One</option>
                              <option value={2}>Two</option>
                              <option value={3}>Three</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Status</label>
                            <div className="row">
                              <div className="col-auto">
                                <div className="radio_bts">
                                  <input
                                    type="radio"
                                    id="01"
                                    name="radio"
                                    className="d-none"
                                  />
                                  <label htmlFor="01">Active</label>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="radio_bts">
                                  <input
                                    type="radio"
                                    id="02"
                                    name="radio"
                                    className="d-none"
                                  />
                                  <label htmlFor="02">In Active</label>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="radio_bts">
                                  <input
                                    type="radio"
                                    id="03"
                                    name="radio"
                                    className="d-none"
                                  />
                                  <label htmlFor="03">All</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="filter_data_bottom">
                        <a className="small_bts_bg" href="javascript:;">
                          Apply Filter
                        </a>
                        <a
                          className="small_bts_border ms-3"
                          href="javascript:;">
                          Reset
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 table_comman mt-3">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>S. No</th>
                          <th>Restaurant Address</th>
                          <th>Branch Manager</th>
                          <th>Email ID</th>
                          <th>Mobile Number</th>
                          <th>Cuisine</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>Alexandria, Egypt</td>
                          <td>Sonam Malik</td>
                          <td>ex@gmail.com</td>
                          <td>+20 989 8888888</td>
                          <td>French,Italian,Mexi...</td>
                          <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  type="checkbox"
                                  defaultChecked=""
                                  name="check1"
                                  id="check1"
                                  className="d-none"
                                />
                                <label htmlFor="check1" />
                              </div>
                            </form>
                          </td>
                          <td>
                            <a className="table_btn" href="javascript:;">
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>02</td>
                          <td>Alexandria, Egypt</td>
                          <td>Sonam Malik</td>
                          <td>ex@gmail.com</td>
                          <td>+20 989 8888888</td>
                          <td>French,Italian,Mexi...</td>
                          <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  type="checkbox"
                                  defaultChecked=""
                                  name="check2"
                                  id="check2"
                                  className="d-none"
                                />
                                <label htmlFor="check2" />
                              </div>
                            </form>
                          </td>
                          <td>
                            <a className="table_btn" href="javascript:;">
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>03</td>
                          <td>Alexandria, Egypt</td>
                          <td>Sonam Malik</td>
                          <td>ex@gmail.com</td>
                          <td>+20 989 8888888</td>
                          <td>French,Italian,Mexi...</td>
                          <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  type="checkbox"
                                  name="check7"
                                  id="check7"
                                  className="d-none"
                                />
                                <label htmlFor="check7" />
                              </div>
                            </form>
                          </td>
                          <td>
                            <a className="table_btn" href="javascript:;">
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>04</td>
                          <td>Alexandria, Egypt</td>
                          <td>Sonam Malik</td>
                          <td>ex@gmail.com</td>
                          <td>+20 989 8888888</td>
                          <td>French,Italian,Mexi...</td>
                          <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  type="checkbox"
                                  defaultChecked=""
                                  name="check3"
                                  id="check3"
                                  className="d-none"
                                />
                                <label htmlFor="check3" />
                              </div>
                            </form>
                          </td>
                          <td>
                            <a className="table_btn" href="javascript:;">
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>05</td>
                          <td>Alexandria, Egypt</td>
                          <td>Sonam Malik</td>
                          <td>ex@gmail.com</td>
                          <td>+20 989 8888888</td>
                          <td>French,Italian,Mexi...</td>
                          <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  type="checkbox"
                                  defaultChecked=""
                                  name="check4"
                                  id="check4"
                                  className="d-none"
                                />
                                <label htmlFor="check4" />
                              </div>
                            </form>
                          </td>
                          <td>
                            <a className="table_btn" href="javascript:;">
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>06</td>
                          <td>Alexandria, Egypt</td>
                          <td>Sonam Malik</td>
                          <td>ex@gmail.com</td>
                          <td>+20 989 8888888</td>
                          <td>French,Italian,Mexi...</td>
                          <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  type="checkbox"
                                  defaultChecked=""
                                  name="check5"
                                  id="check5"
                                  className="d-none"
                                />
                                <label htmlFor="check5" />
                              </div>
                            </form>
                          </td>
                          <td>
                            <a className="table_btn" href="javascript:;">
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>07</td>
                          <td>Alexandria, Egypt</td>
                          <td>Sonam Malik</td>
                          <td>ex@gmail.com</td>
                          <td>+20 989 8888888</td>
                          <td>French,Italian,Mexi...</td>
                          <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  type="checkbox"
                                  defaultChecked=""
                                  name="check6"
                                  id="check6"
                                  className="d-none"
                                />
                                <label htmlFor="check6" />
                              </div>
                            </form>
                          </td>
                          <td>
                            <a className="table_btn" href="javascript:;">
                              View
                            </a>
                          </td>
                        </tr>
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
  );
};

export default Dashboard;
