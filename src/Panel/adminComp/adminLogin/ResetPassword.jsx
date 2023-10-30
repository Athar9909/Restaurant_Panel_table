import classNames from "classnames";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { adminResetPass } from "./httpServicesAdmin/adminApis";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { mail, code } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await adminResetPass({
      phone_number: mail,
      country_code: code,
      password: data?.password,
      language: "",
    });
    console.log(res);

    if (!res?.data.error) {
      Swal.fire({
        title: res?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      navigate("/");
    }
  };

  return (
    <div>
      <div className="onboarding_pages">
        <div className="onboarding_left">
          <a className="logo_top">
            <img src={require("../../assets/img/loggo.png")} alt="" />
          </a>
          <div className="onboarding_logos">
            <img src={require("../../assets/img/verify.png")} alt="" />
          </div>
        </div>
        <div className="onboarding_right">
          <a
            className="Back_btn"
            onClick={() => {
              navigate(-1);
            }}>
            <img src={require("../../assets/img/left.png")} alt="" />
          </a>
          <div className="w-100">
            <div className="forgot_heading">
              <h2>Reset Password</h2>
              <p>Create a new password for your account.</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="comman_form row"
              action="#">
                
              <div className="col-12 form-group position-relative mb-2">
                <label className="set_label" htmlFor="">
                  Enter New Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className={classNames("form-control", {
                    "is-invalid": errors.password,
                  })}
                  {...register("password", {
                    required: "Please Enter Password",
                  })}
                />
                <img
                  className="show_pass"
                  src="assets/img/show_pass.png"
                  alt=""
                />
                {errors.password && (
                  <small className="errorText ">
                    {errors.password?.message}
                  </small>
                )}
              </div>
              <div className="col-12 form-group mt-4 mb-0">
                <button className="comman_btn py-1 px-5 " type="submit">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
