import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import {
  GetProfileDetail,
  UpdateRestaurant,
} from "../adminLogin/httpServicesAdmin/adminApis";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Swal from "sweetalert2";

const EditProfile = () => {
  const [slide, setSlide] = useState("Dash");
  const [profile, setProfile] = useState([]);
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getProfile();
  }, []);

  const onFileSelection = (e, key) => {
    setFiles({ ...files, [key]: e.target.files[0] });
  };

  const getProfile = async (key) => {
    const { data } = await GetProfileDetail();
    if (!data?.error) {
      let values = data?.results?.restaurant;
      setProfile(values);
    }
  };

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append(
      "restaurant_name",
      data?.name ? data?.name : profile?.restaurant_name
    );
    formData.append(
      "restaurant_address",
      data?.address ? data?.address : profile?.restaurant_address
    );
    formData.append(
      "restaurant_description",
      data?.desc ? data?.desc : profile?.restaurant_description
    );
    formData.append("owner_name", "Owner");
    formData.append("email", profile?.email);
    formData.append("facebook", data?.fb ? data?.fb : profile?.facebook);
    formData.append("linkedin", data?.link ? data?.link : profile?.linkedin);
    formData.append(
      "instagram",
      data?.insta ? data?.insta : profile?.instagram
    );
    formData.append("logo", files?.logo);
    formData.append("cover_image)", files?.cover);

    const res = await UpdateRestaurant(formData);
    if (!res?.data?.error) {
      Swal.fire({
        title: res?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
    //   document.getElementById("modalClose").click();
    //   document.getElementById("reset1").click();
      getProfile();
    }
  };

  return (
    <div>
      <div className="admin_main">
        <Profile />
        <div className="admin_innermain d-flex">
          <Sidebar slide={slide} />

          <div className="admin_main_part">
            <div className="row">
              <div className="col-12 heading_main mb-4">
                <h2>My Profile</h2>
              </div>
              <form
                className="row Comman_design_box comman_dashboard_form"
                action="#"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12 mb-4">
                  <div className="col-12">
                    <div
                      className="myprofile"
                      style={{
                        backgroundImage: 'url("assets/img/profile_bg.png")',
                      }}>
                      <div className="myprofile_logo">
                        <img
                          src={require("../../assets/img/logo_profile.png")}
                          alt=""
                        />
                        <i
                          onClick={() => {
                            document.getElementById("logoInput").click();
                          }}
                          className="fa fa-edit fa-2x"></i>
                        <input
                          type="file"
                          className="form-control d-none"
                          defaultValue=""
                          id="logoInput"
                          name="logo"
                          onChange={(e) => onFileSelection(e, "logo")}
                        />
                      </div>
                      <a className="edit_bg">
                        <img
                          src={require("../../assets/img/logo_profile.png")}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-12 form-group mb-3">
                    <label className="label_bold" htmlFor="">
                      Restaurant Details
                    </label>
                  </div>
                  <div className="col-5 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Restaurant Name
                    </label>
                    <input
                      {...register("name", { required: false })}
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.name,
                      })}
                      name="name"
                      defaultValue={profile?.restaurant_name}
                    />
                    {errors.name && (
                      <small className="errorText  ">
                        {errors.name?.message}
                      </small>
                    )}
                    {/* <select
                      className="form-select form-control"
                      aria-label="Default select example">
                      <option selected="">Gateway Restaurant</option>
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                    </select> */}
                  </div>
                  <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Restaurant Address
                    </label>

                    <input
                      {...register("address", { required: false })}
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.address,
                      })}
                      name="address"
                      defaultValue={profile?.restaurant_address}
                    />
                    {errors.address && (
                      <small className="errorText  ">
                        {errors.address?.message}
                      </small>
                    )}

                    {/* <select
                      className="form-select form-control"
                      aria-label="Default select example">
                      <option selected="">USA</option>
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                    </select> */}
                  </div>
                  <div className="col-12 form-group position-relative mb-0">
                    <label className="set_label" htmlFor="">
                      Restaurant Description
                    </label>
                    <textarea
                      {...register("desc", { required: false })}
                      type="text"
                      className={classNames(" textarea_design", {
                        "is-invalid": errors.desc,
                      })}
                      name="desc"
                      defaultValue={profile?.restaurant_description}
                    />
                    {errors.desc && (
                      <small className="errorText  ">
                        {errors.desc?.message}
                      </small>
                    )}
                  </div>

                  <div className="form-group col-12 choose_file position-relative mt-2">
                    <label htmlFor="upload_video"> Upload Cover</label>
                    <input
                      type="file"
                      className="form-control"
                      defaultValue=""
                      name="cover"
                      id="upload_video"
                      onChange={(e) => onFileSelection(e, "cover")}
                    />
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="col-12 form-group mb-3">
                    <label className="label_bold" htmlFor="">
                      Social Media Accounts
                    </label>
                  </div>
                  <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Facebook
                    </label>
                    <input
                      {...register("fb", { required: false })}
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.fb,
                      })}
                      name="fb"
                      defaultValue={profile?.facebook}
                    />
                  </div>
                  <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Instagram
                    </label>
                    <input
                      {...register("insta", { required: false })}
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.insta,
                      })}
                      name="insta"
                      defaultValue={profile?.instagram}
                    />
                  </div>
                  <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      LinkedIn
                    </label>
                    <input
                      {...register("link", { required: false })}
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.link,
                      })}
                      name="link"
                      defaultValue={profile?.linkedin}
                    />
                  </div>
                  <div className="col-12 form-group position-relative mb-0">
                    <a className="add_new_link">Add New Link</a>
                  </div>

                  <button
                    className="comman_btn w-50 text-center mt-4"
                    type="submit">
                    Update Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
