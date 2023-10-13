import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Profile from "../Dashboard/Profile";
import {
  AddNewCategory,
  AddonsDetail,
  AllAddOns,
  AllCategories,
  CuisineDetails,
  EditCategoryDetails,
  EditCuisineDetails,
  EditCuisineStatus,
} from "../adminLogin/httpServicesAdmin/adminApis";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Select from "react-select";

const EditAddon = () => {
  const [slide, setSlide] = useState("MenuM");
  let { id } = useParams();
  let navigate = useNavigate();
  const [Addons, setAddons] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedAddon, setSelectedAddon] = useState([]);

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
      setOptions(values?.options);
      setAddons(values);
      reset({
        name: values?.name,
      });
    }
  };

  const handleChange = (selected) => {
    setSelectedAddon({
      optionSelected: selected,
    });
  };

  const CuisineStatus = async (id) => {
    const { data } = await EditCuisineStatus(id);
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
    let addons = [];
    (selectedAddon.optionSelected || [])?.map((item) => {
      addons.push(item?.value);
    });
    let formData = new FormData();
    formData.append("name", data?.name ? data?.name : Addons?.name);
    formData.append("addOns", JSON.stringify(addons));
    formData.append("price", data?.price ? data?.price : Addons?.price);
    formData.append("cuisineId", id);

    const res = await EditCuisineDetails(formData);

    if (!res?.data?.error) {
      Swal.fire({
        title: res?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      setSelectedAddon([
        {
          optionSelected: [],
        },
      ]);
      navigate(-1);
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
              <h2>Edit Addon</h2>
            </div>
            <div className="col-12">
              <div className="row comman-new-design">
                <div className="col-12">
                  <form className="comman_form row" action="#">
                    <div className="col-12 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        Name
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

                    <div className="col-12 form-group options_box">
                      <h2 className="options_head">Options</h2>
                      {options?.map(() => (
                        <div className="row">
                          <div className="col-4 form-group mb-3 position-relative">
                            <label className="set_label" htmlFor="">
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              defaultValue="Sprite"
                            />
                          </div>
                          <div className="col-4 form-group mb-3 position-relative">
                            <label className="set_label" htmlFor="">
                              Price
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              defaultValue={87}
                            />
                          </div>
                          <div className="col-2 form-group mb-3 position-relative form-checkbox">
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
                          </div>
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
                        Status
                      </label>
                      <div className="text_toggle">
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
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="row">
                        <div className="col-4">
                          <a className="btns_new_bg w-100" href="javascript:;">
                            Save
                          </a>
                        </div>
                        <div className="col-4">
                          <a
                            className="btns_new_border w-100"
                            href="javascript:;">
                            Back
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
