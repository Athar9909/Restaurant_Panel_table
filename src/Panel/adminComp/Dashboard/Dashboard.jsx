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
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { GetOrders } from "../adminLogin/httpServicesAdmin/adminApis";
// import { MDBDataTable } from "mdbreact";
// import moment from "moment";

const Dashboard = () => {
  const [slide, setSlide] = useState("Dash");
  const [sideBar, setSideBar] = useState();
  const [files, setFiles] = useState([]);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFileSelection = (e, key) => {
    setFiles({ ...files, [key]: e.target.files[0] });
  };

  useEffect(() => {
    getAllTakeaways();
  }, []);

  const getAllTakeaways = async (key) => {
    const { data } = await GetOrders({
      search: key ? key : "",
      type: "Take Away",
    });
    if (!data?.error) {
      let values = data?.results?.orders;
      setList(values);
    }
  };
  const onSubmit = async (data) => {
    let addons = [];
    // (selectedAddon.optionSelected || [])?.map((item) => {
    //   addons.push(item?.value);
    // });
    // let formData = new FormData();
    // formData.append("name", data?.name);
    // formData.append("categoryId", data?.categoryId);
    // formData.append("mainIngredients", JSON.stringify(data?.mainIngredients));
    // formData.append("addOns", JSON.stringify(addons));
    // formData.append("price", data?.price);
    // formData.append("image", files?.cuisineImg);

    // const res = await AddNewCuisine(formData);
    // if (!res?.data?.error) {
    //   Swal.fire({
    //     title: res?.data?.message,
    //     icon: "success",
    //     confirmButtonText: "Okay",
    //     confirmButtonColor: "#e25829",
    //   });
    //   document.getElementById("modalClose").click();
    //   document.getElementById("reset1").click();
    //   getAllCuisines();
    //   setSelectedAddon([
    //     {
    //       optionSelected: [],
    //     },
    //   ]);
    // }
  };

  const getBarClick = (val) => {
    console.log(val);
    setSideBar(val);
  };

  return (
    <div className="admin_main">
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
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#additem"
                    className="comman_btns w-100">
                    +Add New Restaurant
                  </a>
                </div>
              </form>
            </div>

            <div className="col-12">
              <div className="row">
                <div className="col-9"></div>
                <div className="col-3">
                  {/* <div className="dropdown fliter_dropdown">
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
                  </div> */}
                </div>
                <div className="col-12 table_comman mt-3">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order Id</th>
                          <th>Table ID</th>
                          <th>Order ID</th>
                          <th>Pickup Time</th>
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
                            <td>{item?.createdAt?.slice(0, 10)}</td>
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
                                onClick={() => {
                                  navigate(
                                    `/restaurant/dashboard/booking/View/${item?._id}`
                                  );
                                }}>
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

      <div
        className="modal  fade comman_modal add_item"
        id="additem"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add New Restaurant
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
                <form
                  className="row comman_dashboard_form "
                  onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Display Name
                    </label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.name,
                      })}
                      name="name"
                      placeholder="Enter Display Name"
                    />
                    {errors.name && (
                      <small className="errorText  ">
                        {errors.name?.message}
                      </small>
                    )}
                  </div>
                  <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Main Ingredients.
                    </label>
                    <input
                      {...register("mainIngredients", { required: true })}
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.mainIngredients,
                      })}
                      name="mainIngredients"
                      placeholder="Enter mainIngredients"
                    />
                    {errors.mainIngredients && (
                      <small className="errorText  ">
                        {errors.mainIngredients?.message}
                      </small>
                    )}
                  </div>

                  {/* <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Select Category
                    </label>

                    <select
                      {...register("categoryId", {
                        required: true,
                        onChange: () => setCateId(""),
                      })}
                      className={classNames(" form-select form-control", {
                        "is-invalid": errors.categoryId,
                      })}
                      name="categoryId"
                      aria-label="Default select example">
                      <option selected="">Select Category</option>
                      {cates?.map((itm, id) => (
                        <option value={itm?._id}>{itm?.name}</option>
                      ))}
                    </select>
                    {errors.categoryId && (
                      <small className="errorText  ">
                        {errors.categoryId?.message}
                      </small>
                    )}
                  </div> */}
                  {/* <div className="col-12 form-group position-relative">
                    <label className=" mb-1" htmlFor="">
                      Select Addon
                    </label>
                    <Select
                      isMulti
                      name="colors"
                      options={options}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={handleChange}
                    />
                    
                    {errors.addOn && (
                      <small className="errorText  ">
                        {errors.addOn?.message}
                      </small>
                    )}
                  </div> */}

                  <div className="col-6 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Price
                    </label>
                    <input
                      {...register("price", { required: true })}
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.price,
                      })}
                      name="price"
                      placeholder="Enter Price"
                    />
                    {errors.price && (
                      <small className="errorText  ">
                        {errors.price?.message}
                      </small>
                    )}
                  </div>
                  <div className="col-6 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Compare Price
                    </label>
                    <input
                      {...register("Cprice", { required: true })}
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.Cprice,
                      })}
                      name="Cprice"
                      placeholder="Enter Price"
                    />
                    {errors.Cprice && (
                      <small className="errorText  ">
                        {errors.Cprice?.message}
                      </small>
                    )}
                  </div>

                  <div className="form-group col-12 choose_file position-relative">
                    <label htmlFor="upload_video"> Upload Image</label>
                    <input
                      type="file"
                      className="form-control"
                      defaultValue=""
                      name="cuisineImg"
                      id="upload_video"
                      onChange={(e) => onFileSelection(e, "cuisineImg")}
                    />
                  </div>
                  <div className="col-4 form-group mb-0 position-relative">
                    <button className="small_bts_bg" type="submit">
                      Add
                    </button>
                    <button
                      className="small_bts_bg d-none"
                      type="reset"
                      id="reset1">
                      reser
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

export default Dashboard;
