import { Carousel } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "./httpServicesAdmin/adminApis";
import classNames from "classnames";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let AdminData = JSON.parse(localStorage.getItem("AdminSave"));

  function togglePassword() {
    var x = document.getElementById("password-Input");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const onSubmit = async (data) => {
    const res = await adminLogin({
      phone_number: data?.phone_number,
      country_code: data?.country_code,
      password: data?.password,
      deviceId: "123",
      deviceOS: "Web",
      fcmToken:
        "doUUb6ImtVj9C2IVmurpob:APA91bFnybYuEarbUvX0jJMVPT3VlRt6JpSePtHLY7KET28bYCuUgKpgih_MPaez7lWjGjm-llnkUO95WiRfKQXnteBSNGbpPEJi8_lZPxc7zQvJyfBftmkhzhkPValwZVpT03F28NLn",
      language: "English",
    });
    console.log(res);

    if (!res?.data.error) {
      Swal.fire({
        title: res?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
      });
      localStorage.setItem("token-admin", res.data?.results.token);
      navigate("/restaurant/dashboard");
    }
  };

  return (
    <div>
      <div className="onboarding_pages">
        <div className="onboarding_left">
          <a className="logo_top mb-5" href="javascript:;">
            <img src={require("../../assets/img/logoNN.png")} alt="" />
          </a>
          <div className="onboarding_slider owl-carousel mt-5">
            <Carousel autoplay>
              <div className="onboarding_slider_box text-center">
                <img src={require("../../assets/img/take.png")} alt="" />
                <h3>Takeaway</h3>
                <p className="mb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's .
                </p>
              </div>
              <div className="onboarding_slider_box text-center">
                <img src={require("../../assets/img/Dine.png")} alt="" />
                <h3>Dining</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's .
                </p>
              </div>
              <div className="onboarding_slider_box text-center">
                <img src={require("../../assets/img/dineWith.png")} alt="" />
                <h3>Dining With Food</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's .
                </p>
              </div>
            </Carousel>
          </div>
        </div>

        <div className="onboarding_right">
          <div className="w-100">
            <div className="onboarding_heading">
              <h2>Welcome Back,</h2>
              <p>Please login to your account</p>
            </div>
            <form className="comman_form row" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-12 form-group position-relative">
                <div className="d-flex">
                  <label className="set_label" htmlFor="">
                    Country code
                  </label>
                  <input
                    {...register("country_code", { required: true })}
                    type="tel"
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
                    {...register("phone_number", { required: true })}
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
                  <small className="errorText  ">
                    {errors.phone_number?.message}
                  </small>
                )}
              </div>
              <div className="col-12 form-group position-relative mb-2">
                <label className="set_label" htmlFor="">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className={classNames("form-control", {
                    "is-invalid": errors.password,
                  })}
                  {...register("password", {
                    required: "Please Enter Your Password",
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
              <div className="col-12 form-group text-end">
                <a
                  className="forgot_pass"
                  onClick={() => {
                    navigate("/restaurant/login/forgot-Password");
                  }}>
                  Forgot Password?
                </a>
              </div>
              <div className="col-12 form-group mt-4">
                <button className="comman_btn w-100" type="submit">
                  Sign in
                </button>
              </div>
              {/* <div className="col-12 form-group mt-4">
                <div className="register_now">    
                  Don’t have an account yet? <a>Register Now</a>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
