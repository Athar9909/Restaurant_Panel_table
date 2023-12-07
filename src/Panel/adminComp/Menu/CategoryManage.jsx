import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Profile from "../Dashboard/Profile";
import {
  AddNewCategory,
  AllCategories,
  DeleteCategory,
  EditCategoryStatus,
} from "../adminLogin/httpServicesAdmin/adminApis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import { t } from "i18next";

const CategoryManage = () => {
  const [slide, setSlide] = useState("MenuM");
  const [cateName, setCateName] = useState("");
  const [cateNameAr, setCateNameAr] = useState("");
  const [cates, setCates] = useState([]);
  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
    const { data } = await AddNewCategory({
      name: cateName,
      name_ar: cateNameAr,
    });
    if (!data?.error) {
      Swal.fire({
        title: data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
        timer: "2000",
      });
      setLoader(false);
      getAllCategories();
      setCateName("");
      document.getElementById("modalClose").click();
      document.getElementById("reset1").click();
    }
  };

  const CategoryStatus = async (id) => {
    const { data } = await EditCategoryStatus(id);
    if (!data.error) {
      Swal.fire({
        title: data.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      getAllCategories();
    }
  };

  const DeleteItem = async (id) => {
    const { data } = await DeleteCategory(id);
    if (!data?.error) {
      Swal.fire({
        title: data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      getAllCategories();
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
              <h2>{t("CateM")}</h2>
            </div>

            <div className="col-12 mb-4">
              <form action="#" className="row search_part">
                <div className="form-group col-9 position-relative">
                  <input
                    className="form-control"
                    type="text"
                    id=""
                    placeholder={t("SCateN")}
                    onChange={(e) => {
                      getAllCategories(e.target.value);
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
                      data-bs-target="#promocode">
                      <strong>+{t("AddCate")}</strong>
                    </a>
                  </div>
                </div>
                {/* <div className="col-3">
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
                </div> */}
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
                          <th>Category (en)</th>
                          <th>{t("Cate")} (ar)</th>
                          <th>{t("Status")}</th>
                          <th>{t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(cates || [])?.map((itm, ind) => (
                          <tr>
                            <td>{ind + 1}</td>

                            <td>{itm?.name}</td>
                            <td>{itm?.name_ar}</td>
                            <td>
                              <form className="table_btns d-flex align-items-center justify-content-center">
                                <div className="check_toggle">
                                  <input
                                    type="checkbox"
                                    defaultChecked={itm?.status}
                                    name={itm?._id + "99"}
                                    id={itm?._id}
                                    className="d-none"
                                    onClick={() => {
                                      CategoryStatus(itm?._id);
                                    }}
                                  />
                                  <label htmlFor={itm?._id} />
                                </div>
                              </form>
                            </td>
                            <td>
                              <a
                                className="table_btn_border ms-1"
                                onClick={() =>
                                  navigate(
                                    `/restaurant/dashboard/menu/edit-category/${itm?._id}`,
                                    {
                                      state: {
                                        name: itm?.name,
                                        name_ar: itm?.name_ar,
                                      },
                                    }
                                  )
                                }>
                                {t("Edit")}
                              </a>
                              <a
                                className="table_btn_border ms-1"
                                onClick={() => DeleteItem(itm?._id)}>
                                {t("Delete")}
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
                {t("AddCate")}
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
                      Name (en)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type Something..."
                      onChange={(e) => {
                        setCateName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      {t("Name")} (ar)
                    </label>
                    <input
                      type="text"
                      lang="ar"
                      dir="rtl"
                      className="form-control"
                      placeholder="..اكتب شيئا باللغة العربية"
                      onChange={(e) => {
                        setCateNameAr(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-4 form-group mb-0 position-relative text-center">
                    <Button
                      className="small_bts_bg "
                      type="primary"
                      loading={loader}
                      onClick={() => {
                        AddCategory();
                      }}>
                      {t("AddCate")}
                    </Button>
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
