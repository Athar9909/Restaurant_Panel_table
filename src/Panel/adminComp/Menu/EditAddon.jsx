import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Profile from "../Dashboard/Profile";
import {
  AddonsDetail,
  EditAddonDetails,
  EditAddonStatus,
} from "../adminLogin/httpServicesAdmin/adminApis";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Button } from "antd";
import { t } from "i18next";

const EditAddon = () => {
  const [slide, setSlide] = useState("MenuM");
  let { id } = useParams();
  let navigate = useNavigate();
  const [options, setOptions] = useState([
    {
      name: [],
      price: "",
    },
  ]);
  const [Addon, setAddon] = useState([]);
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    getAddons();
  }, []);

  const getAddons = async (key) => {
    const { data } = await AddonsDetail(id);
    if (!data?.error) {
      let values = data?.results?.addOn;
      setAddon(values);
      setOptions(values?.options);
      reset({
        name: values?.name,
        name_ar: values?.name_ar,
      });
    }
  };

  let handleChange = (i, e) => {
    let newFormValues = [...options];
    newFormValues[i][e.target.name] = e.target.value;
    console.log(options);
    setOptions(options);
  };

  const AddonStatusStatus = async (id) => {
    const { data } = await EditAddonStatus(id);
    if (!data.error) {
      Swal.fire({
        title: data.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      getAddons();
    }
  };

  const onSubmit = async (data) => {
    setLoader(true);
    let AddOn = options?.map(({ _id, ...options }) => options);
    const res = await EditAddonDetails({
      name: data?.name,
      name_ar: data?.name_ar,
      options: AddOn,
      addOnId: id,
    });

    if (!res?.data?.error) {
      Swal.fire({
        title: res?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      setLoader(false);
      navigate(-1);
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
              <h2>
                {t("Cate")} {t("AddOn")}
              </h2>
            </div>
            <div className="col-12">
              <div className="row comman-new-design">
                <div className="col-12">
                  <form
                    className="comman_form row"
                    action="#"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-6 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        Name (en)
                      </label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.name,
                        })}
                        name="name"
                      />
                      {errors.name && (
                        <small className="errorText  ">
                          {errors.name?.message}
                        </small>
                      )}
                    </div>

                    <div className="col-6 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        {t("Name")} (ar)
                      </label>
                      <input
                        {...register("name_ar", { required: true })}
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.name_ar,
                        })}
                        name="name_ar"
                      />
                      {errors.name_ar && (
                        <small className="errorText  ">
                          {errors.name_ar?.message}
                        </small>
                      )}
                    </div>

                    <div className="col-12 form-group options_box">
                      <h2 className="options_head">{t("OptionsN")}</h2>
                      {options?.map((item, ind) => (
                        <div className="row">
                          <div className="col-4 form-group mb-3 position-relative">
                            <label className="set_label" htmlFor="">
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="name"
                              defaultValue={item?.name}
                              onChange={(e) => handleChange(ind, e)}
                            />
                          </div>{" "}
                          <div className="col-4 form-group mb-3 position-relative">
                            <label className="set_label" htmlFor="">
                              {t("Name")} (ar)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="name_ar"
                              lang="ar"
                              dir="rtl"
                              defaultValue={item?.name_ar}
                              onChange={(e) => handleChange(ind, e)}
                            />
                          </div>
                          <div className="col-4 form-group mb-3 position-relative">
                            <label className="set_label" htmlFor="">
                              {t("Price")}
                            </label>
                            <input
                              type="number"
                              name="price"
                              className="form-control"
                              placeholder=""
                              defaultValue={item?.price}
                              onChange={(e) => handleChange(ind, e)}
                            />
                          </div>
                          {/* <div className="col-2 form-group mb-3 position-relative form-checkbox">
                            <label
                              className="set_label without_input"
                              htmlFor="">
                              Default
                            </label>
                            <div className="check_radio">
                              <input
                                type="checkbox"
                                defaultChecked=""
                                name="radia2"
                                id="radia2"
                                className="d-none"
                              />
                              <label htmlFor="radia2" />
                            </div>
                          </div>
                          <div className="col-2 form-group mb-3 position-relative">
                            <label
                              className="set_label without_input"
                              htmlFor="">
                              Actions
                            </label>
                            <div className="actions_btn">
                              <a href="javascript:;">
                                <img src="assets/img/add-line.svg" alt="" />
                              </a>
                              <a href="javascript:;">
                                <img
                                  src="assets/img/delete-bin-line.svg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div> */}
                        </div>
                      ))}
                    </div>

                    {/* <div className="col-4 form-group position-relative">
                      <label className="set_label without_input" htmlFor="">
                        Required
                      </label>
                      <div className="text_toggle Required_toggle">
                        <div className="check_toggle">
                          <input
                            type="checkbox"
                            name="Required"
                            id="Required"
                            className="d-none"
                          />
                          <label htmlFor="Required" />
                        </div>
                      </div>
                    </div> */}
                    <div className="col-4 form-group position-relative">
                      <label className="set_label without_input" htmlFor="">
                        {t("Status")}
                      </label>
                      <div className="text_toggle">
                        <div className="check_toggle">
                          <input
                            type="checkbox"
                            name="check1"
                            id="check1"
                            className="d-none"
                            defaultChecked={Addon?.status}
                            onClick={() => {
                              AddonStatusStatus(Addon?._id);
                            }}
                          />
                          <label htmlFor="check1" />
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="row">
                        <div className="col-4">
                          {loader ? (
                            <Button
                              className="small_bts_bg  mx-3"
                              type="primary"
                              loading={loader}>
                              Loading..
                            </Button>
                          ) : (
                            <button className="btns_new_bg w-100" type="submit">
                              {t("Save")}
                            </button>
                          )}
                        </div>
                        <div className="col-4">
                          <a
                            className="btns_new_border w-100"
                            onClick={() => {
                              navigate(-1);
                            }}>
                            {t("Back")}
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAddon;
