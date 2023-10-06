import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Profile from "../Dashboard/Profile";
import {
  AddNewCategory,
  AllCategories,
} from "../adminLogin/httpServicesAdmin/adminApis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CategoryManage = () => {
  const [slide, setSlide] = useState("MenuM");
  const [sideBar, setSideBar] = useState();
  const initialValue = 0.0;
  const [cateName, setCateName] = useState("");
  const [cates, setCates] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async (key) => {
    const { data } = await AllCategories({
      search: key ? key : "",
    });
    if (!data?.error) {
      let values = data?.results?.categories;
      setCates(values);
    }
  };

  
  const AddCategory = async () => {
    const { data } = await AddNewCategory({
      name: cateName,
    });
    if (!data?.error) {
      Swal.fire({
        title: data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
        timer: "2000",
      });
      getAllCategories();
      setCateName("");
      document.getElementById("modalClose").click();
      document.getElementById("reset1").click();
    }
  };

  return (
    <div className="admin_main">
      <Profile />

      <div className="admin_innermain d-flex">
        <Sidebar slide={slide} />
        <div className="admin_main_part">
          <div className="row">
            <div className="col-12 heading_main mb-4">
              <h2>Category Management</h2>
            </div>
            <div className="col-12 mb-4">
              <form action="#" className="row search_part">
                <div className="form-group col-6 position-relative">
                  <input
                    className="form-control"
                    type="text"
                    id=""
                    placeholder="Search by Customer name"
                  />
                  <button className="search_bt">
                    <img src={require("../../assets/img/search.png")} alt="" />
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
                      className="dropdown-toggle"
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
                                <label htmlFor="02">Complete</label>
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
                          <th>Category</th>
                          <th>Status</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(cates || [])?.map((itm, ind) => (
                          <tr>
                            <td>{ind + 1}</td>
                            <td>
                              {itm?.restaurantId?.restaurant_address?.slice(
                                0,
                                15
                              )}
                            </td>
                            <td>{itm?.name}</td>
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
                              <a
                                className="table_btn_border ms-1"
                                href="javascript:;">
                                Edit
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
                Add New Category
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
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="FIRSTUSE"
                      onChange={(e) => {
                        setCateName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Decription
                    </label>
                    <textarea
                      className="form-control"
                      name=""
                      id=""
                      cols={30}
                      rows={10}
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-4 form-group mb-0 position-relative">
                    <a
                      className="small_bts_bg text-center"
                      onClick={() => {
                        AddCategory();
                      }}>
                      Add
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

export default CategoryManage;
