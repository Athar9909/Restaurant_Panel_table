import React from "react";
import { useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const navigate = useNavigate();
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
              <h2>Verify Code </h2>
              <p>Enter the Phone number you used when you joined.</p>
            </div>
            <form className="comman_form row" action="#">
              <div className="col-12 form-group d-flex">
                <input
                  type="text"
                  className="form-control text-center"
                  placeholder=""
                />
                <input
                  type="text"
                  className="form-control text-center ms-3"
                  placeholder=""
                />
                <input
                  type="text"
                  className="form-control text-center ms-3"
                  placeholder=""
                />
                <input
                  type="text"
                  className="form-control text-center ms-3"
                  placeholder=""
                />
              </div>
              <div className="col-12 form-group">
                <div className="timings">
                  You can resend the code in
                  <strong>00:59</strong>
                </div>
              </div>
              <div className="col-12 form-group mt-4 mb-0">
                <a className="comman_btn" href="forgot-password.html">
                  Reset Password
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
