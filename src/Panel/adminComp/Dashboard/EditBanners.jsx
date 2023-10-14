import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import {
  AddBanner,
  GetProfileDetail,
  UpdateRestaurant,
  rmvBanner,
} from "../adminLogin/httpServicesAdmin/adminApis";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Swal from "sweetalert2";

const Editbanners = () => {
  const [slide, setSlide] = useState("ProfileM");
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

  const removeBanner = async (url) => {
    const res = await rmvBanner({
      url: url,
    });
    if (!res?.data?.error) {
      Swal.fire({
        title: res?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      getProfile();
    }
  };

  const addBanner = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", files?.image);

    const res = await AddBanner(formData);
    if (!res?.data?.error) {
      Swal.fire({
        title: res?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      getProfile();
      document.getElementById("modalClose").click();
      setFiles([]);
      window.location.reload();
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
                <h2>Zitex banners</h2>
              </div>
              <form
                className="row Comman_design_box comman_dashboard_form"
                action="#">
                <div>
                  <a
                    className="comman_btn px-5"
                    data-bs-toggle="modal"
                    data-bs-target="#addBanner">
                    {" "}
                    + Add banner
                  </a>
                </div>

                <div className="col-12  p-3 mx-3">
                  <div className="mt-5">
                    {profile?.banners?.map((item, id) => (
                      <div className="col-12 d-flex justify-content-start ">
                        <div className="myprofile ">
                          <i
                            onClick={() => {
                              removeBanner(item);
                            }}
                            className="fa fa-trash fa-2x "></i>
                          <img
                            style={{
                              width: "25rem",
                              borderRadius: "8%",
                            }}
                            src={item}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal  fade comman_modal add_item"
        id="addBanner"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add New Banner
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
                <form className="row comman_dashboard_form ">
                  <div className="form-group col-12 choose_file position-relative">
                    <label htmlFor="upload_video"> Upload Image</label>
                    <input
                      type="file"
                      className="form-control"
                      defaultValue=""
                      name="image"
                      id="upload_video"
                      onChange={(e) => onFileSelection(e, "image")}
                    />
                  </div>
                  <div className="col-4 form-group mb-0 position-relative">
                    <button
                      className="small_bts_bg"
                      onClick={(e) => addBanner(e)}>
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

export default Editbanners;
