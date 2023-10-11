import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Profile from "../Dashboard/Profile";
import {
  AddNewCategory,
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

const EditCuisine = () => {
  const [slide, setSlide] = useState("MenuM");
  const [cateName, setCateName] = useState("");
  let location = useLocation();
  let { id } = useParams();
  const [cateId, setCateId] = useState("");
  let navigate = useNavigate();
  const [cuisines, setCuisines] = useState([]);
  const [Addons, setAddons] = useState([]);
  const [cates, setCates] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedAddon, setSelectedAddon] = useState([]);
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    const { data } = await CuisineDetails(id);
    if (!data?.error) {
      let values = data?.results?.cuisine;
      let options = [];
      values?.addOns?.map((itm, id) => {
        options.push({ value: itm?._id, label: itm?.name });
      });
      setCuisines(values);
      reset({
        name: values?.name,
        desc: values?.description ? values?.description : "Desc",
      });
      setSelectedAddon({
        optionSelected: options,
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
      getAllCuisines();
    }
  };

  const onSubmit = async (data) => {
    let addons = [];
    (selectedAddon.optionSelected || [])?.map((item) => {
      addons.push(item?.value);
    });
    let formData = new FormData();
    formData.append("name", data?.name ? data?.name : cuisines?.name);
    formData.append(
      "categoryId",
      data?.categoryId ? data?.categoryId : cuisines?.categoryId?._id
    );
    formData.append("addOns", JSON.stringify(addons));
    formData.append("price", data?.price ? data?.price : cuisines?.price);
    formData.append("image", files?.cuisineImg);
    formData.append("cuisineId", id);

    const res = await EditCuisineDetails(formData);
    if (!res?.data?.error) {
      Swal.fire({
        title: res?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      getAllCuisines();
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
              <h2>Edit Product</h2>
            </div>
            <div className="col-12">
              <div className="row comman-new-design">
                <div className="col-12">
                  <form
                    className="comman_form row"
                    action="#"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-8 form-group position-relative">
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
                        defaultValue={cuisines?.name}
                      />
                      {errors.name && (
                        <small className="errorText  ">
                          {errors.name?.message}
                        </small>
                      )}
                      {/* <p className="input_description">
                        Type your product name, customer can find this item
                        using this name, this will also printed in cart &amp;
                        Invoice{" "}
                      </p> */}
                    </div>
                    <div className="col-4 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        Categories
                      </label>
                      <select
                        {...register("categoryId", {
                          required: true,
                          onChange: (e) => setCateId(e.target.value),
                        })}
                        className={classNames(" form-select form-control", {
                          "is-invalid": errors.categoryId,
                        })}
                        name="categoryId"
                        aria-label="Default select example">
                        <option value={cuisines?.categoryId?._id}>
                          {cuisines?.categoryId?.name}
                        </option>
                        {cates?.map((itm, id) => (
                          <option value={itm?._id}>{itm?.name}</option>
                        ))}
                      </select>
                      {errors.categoryId && (
                        <small className="errorText  ">
                          {errors.categoryId?.message}
                        </small>
                      )}
                      {/* <p className="input_description">
                        Choose the Product`s Selling Category In which..
                      </p> */}
                    </div>
                    <div className="col-8 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        Short Description
                      </label>
                      <textarea
                        {...register("desc", { required: true })}
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.desc,
                        })}
                        name="desc"
                        defaultValue={cuisines?.description}
                      />
                      {errors.desc && (
                        <small className="errorText  ">
                          {errors.desc?.message}
                        </small>
                      )}
                      {/* <p className="input_description">
                        2-3 Line Description text about your Product, We suggest
                        you to put in bullet points.
                      </p> */}
                    </div>
                    <div className="col-4 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        Addon
                      </label>
                      <Select
                        isMulti
                        name="colors"
                        options={options}
                        className="basic-multi-select mt-2"
                        classNamePrefix="select"
                        onChange={handleChange}
                        value={selectedAddon?.optionSelected}
                      />
                    </div>
                    <div className="col-8 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        Featured Image
                      </label>
                      <div className="upload_file">
                        <input
                          type="file"
                          id="file_upload"
                          className="d-none"
                          name="cuisineImg"
                          onChange={(e) => onFileSelection(e, "cuisineImg")}
                        />
                        <label className="file_upload" htmlFor="file_upload">
                          <div>
                            <img src="assets/img/upload.png" alt="" />
                            <span>
                              File Format: JPG, JPEG, PNG or PDF Size: Upto
                              500KB
                            </span>
                          </div>
                        </label>
                        <div className="uploded_file">
                          <div className="uploded_file_img">
                            <img src="assets/img/profile_bg.png" alt="" />
                            <a className="shadow" href="javascript:;">
                              <img
                                src="assets/img/delete-bin-line.svg"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* <p className="input_description">
                        We recommend good quality Product image that is helpful
                        to showcase your Product. Max. upload file size: 5MB{" "}
                      </p> */}
                    </div>
                    {/* <div className="col-2 form-group position-relative">
                      <label className="set_label without_input" htmlFor="">
                        Best Seller
                      </label>
                      <div className="text_toggle Required_toggle">
                        <div className="check_toggle">
                          <input
                            type="checkbox"
                            defaultChecked=""
                            name="Seller"
                            id="Seller"
                            className="d-none"
                          />
                          <label htmlFor="Seller" />
                        </div>
                      </div>
                    </div> */}

                    <div className="col-6 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        Price
                      </label>
                      <input
                        {...register("price", { required: true })}
                        type="number"
                        className={classNames("form-control", {
                          "is-invalid": errors.price,
                        })}
                        name="price"
                        defaultValue={cuisines?.price}
                      />
                      {errors.price && (
                        <small className="errorText  ">
                          {errors.price?.message}
                        </small>
                      )}
                      {/* <p className="input_description">
                        Product Selling Price.
                      </p> */}
                    </div>
                    <div className="col-2 form-group position-relative">
                      <label className="set_label without_input" htmlFor="">
                        Status
                      </label>
                      <div className="text_toggle">
                        <div className="check_toggle">
                          <input
                            type="checkbox"
                            name="Status"
                            id="Status"
                            className="d-none"
                            defaultChecked={cuisines?.status}
                            onClick={() => {
                              CuisineStatus(cuisines?._id);
                            }}
                          />
                          <label htmlFor="Status" />
                        </div>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="row">
                        <div className="col-4">
                          <button className="btns_new_bg w-100" type="submit">
                            Save
                          </button>
                        </div>
                        <div className="col-4">
                          <a
                            className="btns_new_border w-100"
                            onClick={() => {
                              navigate(-1);
                            }}>
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

export default EditCuisine;
