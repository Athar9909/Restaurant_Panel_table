import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import {
  AddNewQR,
  AllBranches,
  AllManTables,
} from "../adminLogin/httpServicesAdmin/adminApis";
import Profile from "../Dashboard/Profile";
import Swal from "sweetalert2";

const ManualTable = () => {
  const [slide, setSlide] = useState("TableM");
  const [sideBar, setSideBar] = useState();
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState([]);
  const [branch, setBranch] = useState([]);
  const [selectBranch, setSelectBranch] = useState([]);

  useEffect(() => {
    getAllTables();
    getAllBranches();
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
  const getAllBranches = async () => {
    const { data } = await AllBranches();
    if (!data?.error) {
      setBranch(data?.results?.restaurants);
    }
  };

  const GenerateQR = async () => {
    const { data } = await AddNewQR({
      name: tableName,
      branchId: selectBranch,
    });
    if (!data?.error) {
      Swal.fire({
        title: data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
        timer: "2000",
      });
      getAllTables();
      setTableName("");
      document.getElementById("modalClose").click();
      document.getElementById("reset1").click();
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
                    <div className="">
                      <a
                        className="comman_btn"
                        data-bs-toggle="modal"
                        data-bs-target="#promocode">
                        <strong>+Add Category</strong>
                      </a>
                    </div>
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
                            {/* <th>Restaurant Address</th> */}
                            <th>Table Name</th>
                            {/* <th>Email Id</th>
                            <th>Mobile Number</th> */}
                            <th>QR code</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(tables || [])?.map((itm, idx) => (
                            <tr>
                              <td>{idx + 1}</td>
                              {/* <td>
                                {itm?.restaurantId.restaurant_address?.slice(
                                  0,
                                  15
                                )}
                              </td> */}
                              <td>{itm?.name}</td>
                              {/* <td>{itm?.restaurantId.email}</td>
                              <td>{itm?.restaurantId.phone_number}</td> */}
                              <td>
                                <a
                                  style={{
                                    cursor: "zoom-in",
                                  }}
                                  href={itm?.QRCode}
                                  target="_blank"
                                  >
                                  <img width={50} src={itm?.QRCode}></img>
                                </a>
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

      <div
        className="modal fade comman_modal add_item"
        id="promocode"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add New Table
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="modalClose"
              />
            </div>
            <div className="modal-body">
              <div className="add_item_form">
                <form className="row comman_dashboard_form" action="#">
                  <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Table Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Table Name"
                      onChange={(e) => {
                        setTableName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Select Branch
                    </label>

                    <select
                      className=" form-select form-control"
                      name="categoryId"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setSelectBranch(e.target.value);
                      }}>
                      <option selected="">Select Branch</option>
                      {branch?.map((itm, id) => (
                        <option value={itm?._id}>
                          {itm?.restaurantId?.restaurant_name +
                            "-" +
                            itm?.username}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-4 form-group mb-0 position-relative">
                    <a
                      className="small_bts_bg text-center"
                      onClick={() => {
                        GenerateQR();
                      }}>
                      Generate QR
                    </a>
                    <button className="d-none" type="reset" id="reset1">
                      reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualTable;
