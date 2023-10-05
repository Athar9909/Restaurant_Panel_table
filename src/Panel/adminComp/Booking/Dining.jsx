import React, { useEffect, useState } from "react";
import Profile from "../Dashboard/Profile";
import Sidebar from "../Dashboard/Sidebar";

const Dining = () => {
  const [slide, setSlide] = useState("BookM");
  const [list, setList] = useState([]);
  useEffect(() => {
    getAllTakeaways();
  }, []);

  const getAllTakeaways = async (key) => {
    const { data } = await {
      search: key ? key : "",
    };
    if (!data?.error) {
      let values = data?.results?.tables;
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
                <h2>Dinings</h2>
              </div>
              <div className="col-12 mb-4">
                <div className="row statics_part">
                  <div className="col-md-3">
                    <div className="statics_box">
                      <div className="statics_left">
                        <strong>459</strong>
                        <span>Total branch</span>
                      </div>
                      <div className="statics_icon">
                        <span>
                          <img src="assets/img/branch_icon.png" alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="statics_box">
                      <div className="statics_left">
                        <strong>87,500</strong>
                        <span>Incoming Order</span>
                      </div>
                      <div className="statics_icon">
                        <span>
                          <img src="assets/img/incommingorder.png" alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="statics_box">
                      <div className="statics_left">
                        <strong>780</strong>
                        <span>Complete Order</span>
                      </div>
                      <div className="statics_icon">
                        <span>
                          <img src="assets/img/complete_order.png" alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="statics_box">
                      <div className="statics_left">
                        <strong>1800</strong>
                        <span>Cancel Order</span>
                      </div>
                      <div className="statics_icon">
                        <span>
                          <img src="assets/img/cancel_order.png" alt="" />
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
                      placeholder="Search by restaurant name, order Id and mobile number"
                    />
                    <button className="search_bt">
                      <img src="assets/img/search.png" alt="" />
                    </button>
                  </div>
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
                          {/* <div className="form-group">
                            <label htmlFor="">Status</label>
                            <div className="row">
                              <div className="col-auto">
                                <div className="radio_bts">
                                  <input
                                    type="radio"
                                    id={01}
                                    name="radio"
                                    className="d-none"
                                  />
                                  <label htmlFor={01}>Active</label>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="radio_bts">
                                  <input
                                    type="radio"
                                    id={02}
                                    name="radio"
                                    className="d-none"
                                  />
                                  <label htmlFor={02}>Complete</label>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="radio_bts">
                                  <input
                                    type="radio"
                                    id={03}
                                    name="radio"
                                    className="d-none"
                                  />
                                  <label htmlFor={03}>All</label>
                                </div>
                              </div>
                            </div>
                          </div> */}
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
                            <th>Restaurant Address</th>
                            <th>Customer Name</th>
                            <th>Mobile Number</th>
                            <th>Order Details</th>
                            <th>Pickup Time</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>01</td>
                            <td>Alexandria, Egypt</td>
                            <td>Sonam Malik</td>
                            <td>+20 989 8888888</td>
                            <td>French,Italian,Mexi...</td>
                            <td>13:30</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  className="status_img"
                                  src="assets/img/accpted.png"
                                  alt=""
                                />{" "}
                                Complete
                              </div>
                            </td>
                            <td>
                              <a
                                className="table_btn"
                                href="takeaway-view.html">
                                View
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>02</td>
                            <td>Alexandria, Egypt</td>
                            <td>Sonam Malik</td>
                            <td>+20 989 8888888</td>
                            <td>French,Italian,Mexi...</td>
                            <td>13:30</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  className="status_img"
                                  src="assets/img/pending.png"
                                  alt=""
                                />{" "}
                                Pending
                              </div>
                            </td>
                            <td>
                              <a
                                className="table_btn"
                                href="takeaway-view.html">
                                View
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>03</td>
                            <td>Alexandria, Egypt</td>
                            <td>Sonam Malik</td>
                            <td>+20 989 8888888</td>
                            <td>French,Italian,Mexi...</td>
                            <td>13:30</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  className="status_img"
                                  src="assets/img/pending.png"
                                  alt=""
                                />{" "}
                                Pending
                              </div>
                            </td>
                            <td>
                              <a
                                className="table_btn"
                                href="takeaway-view.html">
                                View
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>04</td>
                            <td>Alexandria, Egypt</td>
                            <td>Sonam Malik</td>
                            <td>+20 989 8888888</td>
                            <td>French,Italian,Mexi...</td>
                            <td>13:30</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  className="status_img"
                                  src="assets/img/accpted.png"
                                  alt=""
                                />{" "}
                                Complete
                              </div>
                            </td>
                            <td>
                              <a
                                className="table_btn"
                                href="takeaway-view.html">
                                View
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>05</td>
                            <td>Alexandria, Egypt</td>
                            <td>Sonam Malik</td>
                            <td>+20 989 8888888</td>
                            <td>French,Italian,Mexi...</td>
                            <td>13:30</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  className="status_img"
                                  src="assets/img/pending.png"
                                  alt=""
                                />{" "}
                                Pending
                              </div>
                            </td>
                            <td>
                              <a
                                className="table_btn"
                                href="takeaway-view.html">
                                View
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>06</td>
                            <td>Alexandria, Egypt</td>
                            <td>Sonam Malik</td>
                            <td>+20 989 8888888</td>
                            <td>French,Italian,Mexi...</td>
                            <td>13:30</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  className="status_img"
                                  src="assets/img/pending.png"
                                  alt=""
                                />{" "}
                                Pending
                              </div>
                            </td>
                            <td>
                              <a
                                className="table_btn"
                                href="takeaway-view.html">
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
    </div>
  );
};

export default Dining;
