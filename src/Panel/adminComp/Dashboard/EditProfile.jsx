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
import { t } from "i18next";

const EditProfile = () => {
  const [slide, setSlide] = useState("ProfileM");
  const [profile, setProfile] = useState([]);
  const [logo, setLogo] = useState([]);
  const [cover, setCover] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getProfile();
  }, []);

  const onFileSelectionLogo = async (e, key, ind) => {
    setLogo([{ [key]: e.target.files[0] }]);

    if (e.target.files[0]) {
      var picture = new FileReader();
      picture.readAsDataURL(e.target.files[0]);
      picture.addEventListener("load", function (event) {
        document.getElementById(ind).setAttribute("src", event.target.result);
      });
    }
  };

  const onFileSelectionCover = async (e, key, ind) => {
    setCover([{ [key]: e.target.files[0] }]);
    if (e.target.files[0]) {
      var picture = new FileReader();
      picture.readAsDataURL(e.target.files[0]);
      picture.addEventListener("load", function (event) {
        document.getElementById(ind).setAttribute("src", event.target.result);
      });
    }
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

    formData.append(
      "restaurant_name_ar",
      data?.name_ar ? data?.name_ar : profile?.restaurant_name_ar
    );
    formData.append(
      "restaurant_address_ar",
      data?.address_ar ? data?.address_ar : profile?.restaurant_address_ar
    );
    formData.append(
      "restaurant_description_ar",
      data?.desc_ar ? data?.desc_ar : profile?.restaurant_description_ar
    );
    formData.append(
      "owner_name",
      data?.owner_name ? data?.owner_name : profile?.owner_name
    );
    formData.append(
      "owner_name_ar",
      data?.owner_name_ar ? data?.owner_name : profile?.owner_name_ar
    );
    formData.append("email", profile?.email);
    formData.append("facebook", data?.fb ? data?.fb : profile?.facebook);
    formData.append("linkedin", data?.link ? data?.link : profile?.linkedin);
    formData.append(
      "instagram",
      data?.insta ? data?.insta : profile?.instagram
    );
    formData.append("logo", logo[0]?.logo);
    formData.append("cover_image", cover[0]?.cover);

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
                <h2>{t("EditPro")}</h2>
              </div>
              <form
                className="row Comman_design_box comman_dashboard_form"
                action="#"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12 mb-4">
                  <div className="col-12">
                    <i
                      onClick={() => {
                        document.getElementById("logoInput").click();
                      }}
                      className="fa fa-edit fa-3x EditLogo"></i>
                    <div className="myprofile">
                      <img
                        className="cover_cut"
                        id="coverImg"
                        src={
                          profile?.cover_image
                            ? profile?.cover_image
                            : require("../../assets/img/logo_profile.png")
                        }
                        alt=""
                      />
                      <div className="myprofile_logo">
                        <img
                          className="logo_cut"
                          id="logoImg"
                          src={
                            profile?.restaurant_logo
                              ? profile?.restaurant_logo
                              : require("../../assets/img/logo_profile.png")
                          }
                          alt=""
                        />

                        <input
                          type="file"
                          className="form-control d-none"
                          defaultValue=""
                          id="logoInput"
                          name="cover"
                          onChange={(e) =>
                            onFileSelectionCover(e, "cover", "coverImg")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row form-group mb-3">
                    <label className="label_bold" htmlFor="">
                      {t("RestDetails")}
                    </label>

                    <div className="col-6 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        Restaurant Name (en)
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
                    <div className="col-6 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        {t("RestN")} (ar)
                      </label>
                      <input
                        {...register("name_ar", { required: false })}
                        type="text"
                        lang="ar"
                        dir="rtl"
                        className={classNames("form-control", {
                          "is-invalid": errors.name_ar,
                        })}
                        name="name_ar"
                        defaultValue={profile?.restaurant_name_ar}
                      />
                      {errors.name_ar && (
                        <small className="errorText  ">
                          {errors.name_ar?.message}
                        </small>
                      )}
                    </div>
                    <div className="col-6 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        Restaurant Address (en)
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
                    <div className="col-6 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        {t("RestAddress")} (ar) 
                      </label>

                      <input
                        {...register("address_ar", { required: false })}
                        type="text"
                        lang="ar"
                        dir="rtl"
                        className={classNames("form-control", {
                          "is-invalid": errors.address_ar,
                        })}
                        name="address_ar"
                        defaultValue={profile?.restaurant_address_ar}
                      />
                      {errors.address_ar && (
                        <small className="errorText  ">
                          {errors.address_ar?.message}
                        </small>
                      )}
                    </div>

                    <div className="col-6 form-group position-relative mb-3">
                      <label className="set_label" htmlFor="">
                        Restaurant Description (en)
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

                    <div className="col-6 form-group position-relative mb-0">
                      <label className="set_label" htmlFor="">
                      {t("RestDesc")} (ar) 
                      </label>
                      <textarea
                        {...register("desc_ar", { required: false })}
                        type="text"
                        className={classNames(" textarea_design", {
                          "is-invalid": errors.desc_ar,
                        })}
                        lang="ar"
                        dir="rtl"
                        name="desc_ar"
                        defaultValue={profile?.restaurant_description_ar}
                      />
                      {errors.desc_ar && (
                        <small className="errorText  ">
                          {errors.desc_ar?.message}
                        </small>
                      )}
                    </div>
                    <div className="col-6 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        Owner Name (en)
                      </label>
                      <input
                        {...register("owner_name", { required: false })}
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.owner_name,
                        })}
                        name="name"
                        defaultValue={profile?.owner_name}
                      />
                      {errors.owner_name && (
                        <small className="errorText  ">
                          {errors.owner_name?.message}
                        </small>
                      )}
                    </div>

                    <div className="col-6 form-group position-relative">
                      <label className="set_label" htmlFor="">
                         {t("RestOwn")}  (ar)
                      </label>
                      <input
                        {...register("owner_name_ar", { required: false })}
                        type="text"
                        lang="ar"
                        dir="rtl"
                        className={classNames("form-control", {
                          "is-invalid": errors.owner_name_ar,
                        })}
                        name="owner_name_ar"
                        defaultValue={profile?.owner_name_ar}
                      />
                      {errors.owner_name_ar && (
                        <small className="errorText  ">
                          {errors.owner_name_ar?.message}
                        </small>
                      )}
                    </div>
                    <div className="form-group col-6 choose_file position-relative mt-2">
                      <label htmlFor="upload_videoTwo"> {t("UpLogo")}</label>
                      <input
                        type="file"
                        className="form-control"
                        defaultValue=""
                        name="logo"
                        id="upload_videotwo"
                        onChange={(e) =>
                          onFileSelectionLogo(e, "logo", "logoImg")
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col-12 mb-4">
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

                 
                </div> */}
                <button
                    className="comman_btn w-50 text-center mt-4"
                    type="submit">
                    {t("Save")}
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
