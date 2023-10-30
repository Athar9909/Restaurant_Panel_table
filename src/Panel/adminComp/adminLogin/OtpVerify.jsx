import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OtpInput from "react-otp-input";
import { adminVerifyOtp } from "./httpServicesAdmin/adminApis";
const OtpVerify = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [counter, setCounter] = useState(60);
  const { mail, code } = useParams();
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const VerifyOtp = async () => {
    const formData = {
      phone_number: mail,
      country_code: code,
      otp: value,
      language: "",
      deviceId: "123",
    };
    const { data } = await adminVerifyOtp(formData);
    if (!data?.error) {
      navigate(
        `/restaurant/login/forgot-Password/Reset-Password/${mail}/${code}`
      );
    }
  };

  const ResendOtp = async (e) => {
    setCounter(60);
    e.preventDefault();
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
              <h2>Verify Code </h2>
              <p>Enter the code recieved on your registered number.</p>
            </div>
            <form className="comman_form row" action="#">
              <div className="col-12 form-group d-flex justify-content-center">
                <OtpInput
                  value={value}
                  onChange={setValue}
                  numInputs={4}
                  onChangeRegex={/^([0-9]{0,})$/}
                  renderSeparator={<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                  isInputNum
                  inputStyle="otp-field__input"
                  containerStyle="form-group"
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="col-12 form-group">
                {counter ? (
                  <div className="timings">
                    You can resend the code in{" "}
                    <strong className="">00:{counter}</strong>
                  </div>
                ) : null}
              </div>
              <div className="form-group col-12 text-center">
                <label className="text-center" htmlFor="">
                  Didn't received the OTP?
                  {counter ? (
                    <span
                      className="otp-sec mx-1 text-dark"
                      id="resendOTP"
                      onClick={ResendOtp}>
                      Please wait
                    </span>
                  ) : (
                    <span
                      className="otp-sec mx-1 text-primary"
                      id="resendOTP"
                      onClick={ResendOtp}
                      style={{ cursor: "pointer" }}>
                      Request again
                    </span>
                  )}
                </label>
              </div>
              <div className="col-12 form-group mt-4 mb-0">
                <a className="comman_btn" onClick={() => VerifyOtp()}>
                  Verify Otp
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
