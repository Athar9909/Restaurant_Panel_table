import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Profile from "../Dashboard/Profile";
import {
  AddNewCategory,
  AddNewCuisine,
  AllAddOns,
  AllCategories,
  AllCousines,
} from "../adminLogin/httpServicesAdmin/adminApis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Select from "react-select";

const CuisineManage = () => {
  const [slide, setSlide] = useState("MenuM");
  const [sideBar, setSideBar] = useState();
  const [cates, setCates] = useState([]);
  const [cateId, setCateId] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [Addons, setAddons] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedAddon, setSelectedAddon] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getAllCuisines();
    getAllCategories();
    getAllAddons();
  }, []);

  const onFileSelection = (e, key) => {
    setFiles({ ...files, [key]: e.target.files[0] });
  };

  const getAllCategories = async (key) => {
    const { data } = await AllCategories({
      search: key ? key : "",
    });
    if (!data?.error) {
      let values = data?.results?.categories;
      setCates(values);
    }
  };

  const getAllAddons = async (key) => {
    const { data } = await AllAddOns({
      search: key ? key : "",
    });
    if (!data?.error) {
      let values = data?.results?.addOns;
      const optionList = values?.map((item, index) => ({
        value: item?._id,
        label: item?.name,
      }));
      setOptions(optionList);
      setAddons(values);
    }
  };

  const getAllCuisines = async (key) => {
    const { data } = await AllCousines({
      search: key ? key : "",
    });
    if (!data?.error) {
      let values = data?.results?.cuisines;
      setCuisines(values);
    }
  };

  const handleChange = (selected) => {
    setSelectedAddon({
      optionSelected: selected,
    });
  };
  
  const onSubmit = async (data) => {
    let addons = [];
    (selectedAddon.optionSelected || [])?.map((item) => {
      addons.push(item?.value);
    });
    let formData = new FormData();
    formData.append("name", data?.name);
    formData.append("categoryId", data?.categoryId);
    formData.append("mainIngredients", JSON.stringify(data?.mainIngredients));
    formData.append("addOns", JSON.stringify(addons));
    formData.append("price", data?.price);
    formData.append("image", files?.cuisineImg);

    const res = await AddNewCuisine(formData);
    if (!res?.data?.error) {
      Swal.fire({
        title: res?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      document.getElementById("modalClose").click();
      document.getElementById("reset1").click();
      getAllCuisines();
      setSelectedAddon([
        {
          optionSelected: [],
        },
      ]);
    }
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
              <h2>Cuisines Management</h2>
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
                      data-bs-target="#additem">
                      <strong>+ Add Cuisine</strong>
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
                          <th>Item Name</th>
                          <th>Category</th>
                          <th>CPrice</th>
                          <th>Main Ingredients</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(cuisines || [])?.map((itm, ind) => (
                          <tr>
                            <td>{ind + 1}</td>

                            <td>{itm?.name}</td>
                            <td>{itm?.categoryId}</td>
                            <td>{itm?.price}</td>
                            <td>
                              {itm?.mainIngredients?.map((i, d) => (
                                <strong>{i}</strong>
                              ))}
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
                Add New Cuisines
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

                  <div className="col-12 form-group position-relative">
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
                  </div>
                  <div className="col-12 form-group position-relative">
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
                    {/* <select
                      {...register("addOn", {
                        required: true,
                        onChange: () => setCateId(""),
                      })}
                      className={classNames(" form-select form-control", {
                        "is-invalid": errors.addOn,
                      })}
                      name="addOn"
                      aria-label="Default select example">
                      <option selected="">Select Addon</option>
                      {Addons?.map((itm, id) => (
                        <option value={itm?._id}>{itm?.name}</option>
                      ))}
                    </select> */}
                    {errors.addOn && (
                      <small className="errorText  ">
                        {errors.addOn?.message}
                      </small>
                    )}
                  </div>

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

export default CuisineManage;
