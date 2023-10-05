import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Profile from "../Dashboard/Profile";
import { AllBranches } from "../adminLogin/httpServicesAdmin/adminApis";
import { MDBDataTable } from "mdbreact";

const BranchManage = () => {
  const [slide, setSlide] = useState("BranchM");
  const [sideBar, setSideBar] = useState();
  const initialValue = 0.0;
  const [branch, setBranch] = useState({
    columns: [
      {
        label: "S.NO.",
        field: "sn",
        sort: "asc",
        width: 150,
      },

      {
        label: "Manager Name",
        field: "name",
        sort: "asc",
        width: 150,
      },

      {
        label: "Restaurant Address",
        field: "address",
        sort: "asc",
        width: 100,
      },
      {
        label: "Email Id",
        field: "email",
        sort: "asc",
        width: 100,
      },
      {
        label: "Mobile Number",
        field: "number",
        sort: "asc",
        width: 100,
      },
      {
        label: "Date Of Joining",
        field: "date",
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "ACTION",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [],
  });
  useEffect(() => {
    getAllBranches();
  }, []);

  const getAllBranches = async () => {
    const { data } = await AllBranches();
    const newRows = [];
    if (!data?.error) {
      let values = data?.results?.restaurants;
      values?.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1 + ".";
        returnData.name = list?.username;
        returnData.address = list?.address?.slice(0, 30);
        returnData.email = list?.restaurantId?.email;
        returnData.number = list?.phone_number;
        returnData.date = list?.createdAt?.slice(0, 10);
        returnData.status = (
          <>
            <form class="table_btns d-flex align-items-center">
              <div class="check_toggle">
                <input
                  type="checkbox"
                  checked=""
                  name="check5"
                  id="check5"
                  class="d-none"
                />
                <label for="check5"></label>
              </div>
            </form>
          </>
        );
        returnData.action = (
          <>
            <a
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="table_btn"
              // style={{ color: "#fff", background: "#4f73af" }}
              //   onClick={() => editCategory(list._id)}
            >
              Edit
            </a>
          </>
        );
        newRows.push(returnData);
      });

      setBranch({ ...branch, rows: newRows });
    }
    // setAllCategories(data?.results?.categories);
  };

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
              <h2>Branch Manager</h2>
            </div>
            <div className="col-12 mb-4">
              <form action="#" className="row search_part">
                <div className="form-group col-9 position-relative">
                  <input
                    className="form-control"
                    type="text"
                    id=""
                    placeholder="Search by Name"
                  />
                  <button className="search_bt">
                    <img src="assets/img/search.png" alt="" />
                  </button>
                </div>
                <div className="col-3">
                  <a className="comman_btns w-100" href="add-new-manager.html">
                    Add New Manager
                  </a>
                </div>
              </form>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-9"></div>
                <div className="col-3">
                  <div className="dropdown fliter_dropdown">
                    <a
                      className="dropdown-toggle"
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

                <div className="col-12 table_comman mt-2">
                  <div className="table-responsive p-1">
                    <MDBDataTable
                      bordered
                      displayEntries={false}
                      className="categoryTable "
                      hover
                      data={branch}
                      noBottomColumns
                      sortable
                    />
                  </div>
                  {/* <div className="pagination_custom">
                    <a href="javascript:;">
                      <img src="assets/img/ar_left.png" alt="" />
                    </a>{" "}
                    <span>1 - 10 of 100</span>{" "}
                    <a href="javascript:;">
                      <img src="assets/img/ar_right.png" alt="" />
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchManage;
