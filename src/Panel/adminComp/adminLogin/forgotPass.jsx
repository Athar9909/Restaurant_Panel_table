import classNames from "classnames";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { adminForgotPass } from "./httpServicesAdmin/adminApis";

const ForgotPass = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await adminForgotPass({
      phone_number: data?.phone_number,
      country_code: data?.country_code,
      language: "",
    });
    if (!res?.data.error) {
      navigate(
        `/restaurant/login/forgot-Password/OTP-verification/${data?.phone_number}/${data?.country_code}`
      );
    }
  };

  return (
    <div>
      <div className="onboarding_pages">
        <div className="onboarding_left">
          <a className="logo_top">
            <img src={require("../../assets/img/logoNN.png")} alt="" />
          </a>
          <div className="onboarding_logos ">
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
              <h2>Forgot Password</h2>
              <p>Enter the Phone number you used when you joined.</p>
            </div>
            <form
              className="comman_form row"
              action="#"
              onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex">
                <input
                  {...register("country_code", { required: true })}
                  type="tel"
                  maxLength={3}
                  className={classNames("form-control", {
                    "is-invalid": errors.country_code,
                  })}
                  name="country_code"
                  style={{
                    width: "30%",
                  }}
                  placeholder="+966"
                />

                <input
                  {...register("phone_number", {
                    required: true,
                    maxLength: { value: 10, message: "max length is 10" },
                    minLength: { value: 10, message: "min length is 10" },
                  })}
                  type="number"
                  placeholder="Enter Registered Number"
                  style={{
                    width: "70%",
                  }}
                  className={classNames("form-control", {
                    "is-invalid": errors.phone_number,
                  })}
                  name="phone_number"
                  // placeholder=""
                />
              </div>
              {errors.phone_number && (
                <small className="errorText  fw-bold text-danger">
                  {errors.phone_number?.message}
                </small>
              )}
              <div className="col-12 form-group mt-4 mb-0">
                <button type="submit" className="comman_btn px-3">
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
