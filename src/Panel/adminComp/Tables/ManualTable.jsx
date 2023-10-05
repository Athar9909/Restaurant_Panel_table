import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { AllManTables } from "../adminLogin/httpServicesAdmin/adminApis";
import Profile from "../Dashboard/Profile";

const ManualTable = () => {
  const [slide, setSlide] = useState("TableM");
  const [sideBar, setSideBar] = useState();
  const [tables, setTables] = useState([]);
  useEffect(() => {
    getAllTables();
  }, []);

  const getAllTables = async (key) => {
    const { data } = await AllManTables({
      search: key ? key : "",
    });
    if (!data?.error) {
      let values = data?.results?.tables;
      setTables(values);
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
                <h2>Manual Table Management</h2>
              </div>
              <div className="col-12 mb-4">
                <form action="#" className="row search_part">
                  <div className="form-group col-9 position-relative">
                    <input
                      className="form-control"
                      type="text"
                      id=""
                      placeholder="Search by Customer name"
                    />
                    <button className="search_bt">
                      <img
                        src={require("../../assets/img/search.png")}
                        alt=""
                      />
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
                            <th>S. No</th>
                            <th>Restaurant Address</th>
                            <th>Restaurant Name</th>
                            <th>Email Id</th>
                            <th>Mobile Number</th>
                            <th>QR code</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(tables || [])?.map((itm, idx) => (
                            <tr>
                              <td>{idx + 1}</td>
                              <td>
                                {itm?.restaurantId.restaurant_address?.slice(
                                  0,
                                  15
                                )}
                              </td>
                              <td>{itm?.name}</td>
                              <td>{itm?.restaurantId.email}</td>
                              <td>{itm?.restaurantId.phone_number}</td>
                              <td>
                                <img 
                                width={40}
                                src={itm?.QRCode}></img>
                              </td>
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

export default ManualTable;
