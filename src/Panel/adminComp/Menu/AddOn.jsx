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
import { Button } from "antd";
import { t } from "i18next";

const AddOn = () => {
  const [slide, setSlide] = useState("MenuM");
  const [cateId, setCateId] = useState("");
  const [Addons, setAddons] = useState([]);
  const navigate = useNavigate();
  const [editedImg, setEditedImg] = useState();
  const [loader, setLoader] = useState(false);
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
    setLoader(true);
    let formData = new FormData();

    const res = await AddNewAddOn({
      name: data?.name,
      name_ar: data?.name_ar,
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
      setLoader(false);
      setFormValues([
        {
          name: [],
          price: [],
        },
      ]);
    } else {
      setLoader(false);
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
              <h2>{t("AddOn")}</h2>
            </div>
            <div className="col-12 mb-4">
              <form action="#" className="row search_part">
                <div className="form-group col-6 position-relative">
                  <input
                    className="form-control"
                    type="text"
                    id=""
                    placeholder={t("SAddOn")}
                    onChange={(e) => {
                      getAllAddons(e.target.value);
                    }}
                  />
                  <a className="search_bt">
                    <img src={require("../../assets/img/search.png")} alt="" />
                  </a>
                </div>
                <div className="col-3">
                  <div className="">
                    <a
                      className="comman_btn"
                      data-bs-toggle="modal"
                      data-bs-target="#additem">
                      <strong>+ {t("AddAddon")}</strong>
                    </a>
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
                          <th>{t("S_no")}</th>

                          <th>Item Name (en)</th>
                          <th>{t("IName")} (ar)</th>
                          <th>Options (en)</th>
                          <th>{t("OptionsN")} (ar)</th>
                          {/* <th>Max Limit</th> */}
                          {/* <th>Type</th> */}
                          <th>{t("Date")}</th>
                          <th>{t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(Addons || [])?.map((itm, ind) => (
                          <tr>
                            <td>{ind + 1}</td>
                            <td>{itm?.name}</td>
                            <td>{itm?.name_ar}</td>
                            <td>
                              {itm?.options?.map((i, d) => (
                                <li>{i.name}</li>
                              ))}
                            </td>
                            <td>
                              {itm?.options?.map((i, d) => (
                                <li>{i.name_ar}</li>
                              ))}
                            </td>
                            <td>{itm?.createdAt?.slice(0, 10)}</td>

                            <td>
                              <a
                                className="table_btn_border ms-1"
                                onClick={() => {
                                  navigate(
                                    `/restaurant/dashboard/menu/edit-addOn/${itm?._id}`
                                  );
                                }}>
                                {t("Edit")}
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
        <div className="modal-dialog modal-xl modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {t("AddAddon")}
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
                      Option Name (en)
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
                      {t("Name")} (ar)
                    </label>
                    <input
                      {...register("name_ar", { required: true })}
                      type="text"
                      lang="ar"
                      dir="rtl"
                      className={classNames("form-control", {
                        "is-invalid": errors.name_ar,
                      })}
                      name="name_ar"
                      placeholder="اكتب شيئا باللغة العربية"
                    />
                    {errors.name_ar && (
                      <small className="errorText  ">
                        {errors.name_ar?.message}
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
                          <div className="form-group mb-3 col-6 mt-1">
                            <input
                              type="text"
                              name="name_ar"
                              lang="ar"
                              dir="rtl"
                              className="form-control"
                              placeholder={t("OptionsN")}
                              value={item?.name_ar || ""}
                              onChange={(e) => handleChange(e, index)}
                              required
                            />
                          </div>
                          <div className="form-group  col-8 mt-1">
                            <input
                              type="text"
                              name="price"
                              className="form-control"
                              placeholder={t("Price")}
                              value={item?.price || ""}
                              onChange={(e) => handleChange(e, index)}
                              required
                            />
                          </div>
                          <div className="form-group col-2  rmv_btn">
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
                          + {t("AddMore")}
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
                    {loader ? (
                      <Button
                        className="small_bts_bg  mx-3"
                        type="primary"
                        loading={loader}>
                        Loading..
                      </Button>
                    ) : (
                      <button className="small_bts_bg" type="submit">
                        + {t("AddAddon")}
                      </button>
                    )}

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
