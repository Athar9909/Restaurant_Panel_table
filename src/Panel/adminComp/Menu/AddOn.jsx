import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Profile from "../Dashboard/Profile";
import {
  AddNewAddOn,
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

const AddOn = () => {
  const [slide, setSlide] = useState("MenuM");
  const [cateId, setCateId] = useState("");
  const [Addons, setAddons] = useState([]);
  const navigate = useNavigate();
  const [editedImg, setEditedImg] = useState();
  const [files, setFiles] = useState([]);
  const [formValues, setFormValues] = useState([
    {
      name: [],
      price: [],
    },
  ]);
  let handleChange = (e, i) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };
  const removeFormFields = (index) => {
    let newFormValues = [...formValues];
    newFormValues?.splice(index, 1);
    setFormValues(newFormValues);
  };

  console.log(formValues, "5456");
  const addFormFields = (e) => {
    setFormValues([
      ...formValues,
      {
        name: [],
        price: [],
      },
    ]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getAllAddons();
  }, []);

  const onFileSelection = (e, key) => {
    setFiles({ ...files, [key]: e.target.files[0] });
  };

  const getAllAddons = async (key) => {
    const { data } = await AllAddOns({
      search: key ? key : "",
    });
    if (!data?.error) {
      let values = data?.results?.addOns;
      setAddons(values);
    }
  };

  const onSubmit = async (data) => {
    let formData = new FormData();

    const res = await AddNewAddOn({
      name: data?.name,
      options: formValues,
    });
    if (!res?.data.error) {
      Swal.fire({
        title: res?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      document.getElementById("modalClose").click();
      document.getElementById("reset1").click();
      getAllAddons();
      setFormValues([
        {
          name: [],
          price: [],
        },
      ]);
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
              <h2>AddOn Management</h2>
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
                      <strong>+ Add New Addon</strong>
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
                          <th>S.No</th>
                          <th>Name</th>
                          <th>Options</th>
                          {/* <th>Max Limit</th> */}
                          {/* <th>Type</th> */}
                          <th>Created At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(Addons || [])?.map((itm, ind) => (
                          <tr>
                            <td>{ind + 1}</td>
                            <td>{itm?.name}</td>
                            <td>
                              {itm?.options?.map((i, d) => (
                                <li>{i.name}</li>
                              ))}
                            </td>
                            <td>{itm?.createdAt?.slice(0, 10)}</td>

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
                Add New AddOn
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
                      Option Name
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
                    <div className="form-group  col-12">
                      {(formValues || [])?.map((item, index) => (
                        <div className="form-group mb-0 row mt-2 ">
                          <div className="form-group mb-3 col-6 mt-1">
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Enter Option Name"
                              value={item?.name || ""}
                              onChange={(e) => handleChange(e, index)}
                              required
                            />
                          </div>
                          <div className="form-group  col-5 mt-1">
                            <input
                              type="text"
                              name="price"
                              className="form-control"
                              placeholder="Enter Price"
                              value={item?.price || ""}
                              onChange={(e) => handleChange(e, index)}
                              required
                            />
                          </div>
                          <div className="form-group col-1  rmv_btn">
                            <button
                              className="comman_btn mt-1"
                              type="button"
                              disabled={formValues?.length <= 1 ? true : false}
                              onClick={() => removeFormFields(index)}>
                              <i className="fa fa-minus mt-1 mx-1" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="form-group mb-0 col-12 d-flex justify-content-center">
                      <div className="form-group mb-3">
                        <button
                          className="comman_btn fs-6 px-4 py-3"
                          type="button"
                          onClick={() => addFormFields()}>
                          + Add More
                        </button>
                      </div>

                      <button
                        className="comman_btn2 d-none"
                        type="reset"
                        id="resets5">
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="col-12 form-group mb-0 position-relative text-center">
                    <button className="small_bts_bg" type="submit">
                      + Add AddOn
                    </button>
                    <button
                      className="small_bts_bg d-none"
                      type="reset"
                      id="reset1">
                      + Add AddOn
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

export default AddOn;
