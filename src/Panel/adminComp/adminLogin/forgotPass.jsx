import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
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
              <h2>Forgot Password</h2>
              <p>Enter the Phone number you used when you joined.</p>
            </div>
            <form className="comman_form row" action="#">
              <div className="col-12 form-group position-relative">
                <label className="set_label" htmlFor="">
                  Phone Number
                </label>
                <input type="text" className="form-control" placeholder="" />
              </div>
              <div className="col-12 form-group mt-4 mb-0">
                <a
                  onClick={() => {
                    navigate("/restaurant/login/forgot-Password/OTP-verification");
                  }}
                  className="comman_btn">
                  Send OTP
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
