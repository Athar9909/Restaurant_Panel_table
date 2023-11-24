import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ChnageLanguage,
  GetProfileDetail,
} from "../adminLogin/httpServicesAdmin/adminApis";
import Cookies from "js-cookie";
import i18next from "i18next";

const Profile = ({ slide, getBarClick, getBar }) => {
  const navigate = useNavigate();
  const [SlideState, setSlideState] = useState("");
  const width = window.innerWidth;
  const [sideBar, setSideBar] = useState(width < 768 ? false : true);
  const [profile, setProfile] = useState();
  const [currentLangCode, setCurrentLangCode] = useState(
    Cookies.get("i18next") || "en"
  );
  useEffect(() => {
    setSlideState(slide);
    getProfile();
  }, []);

  useEffect(() => {
    if (currentLangCode === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [currentLangCode]);

  const ChangeLang = async (lng) => {
    await ChnageLanguage({
      language: lng,
      deviceId: "123",
    });
  };

  const getProfile = async (key) => {
    const { data } = await GetProfileDetail();
    if (!data?.error) {
      let values = data?.results?.restaurant;
      setProfile(values);
    }
  };
  let token = localStorage.getItem("token-admin");
  // let AdminData = JSON.parse(localStorage.getItem("token-admin-data"));

  // console.log(AdminData);
  if (token === null) {
    Swal.fire({
      title: "PLease Login to Continue!",
      text: "Login Expired!",
      icon: "warning",
      confirmButtonText: "Login",
      confirmButtonColor: "#e25829",
    }).then((res) => {
      navigate("/admin/Login");
    });
  }
  // console.log(width);

  const Logout = () => {
    localStorage.removeItem("token-admin");
    navigate("/admin/Login");
    window.location.reload();
  };

  return (
    <div>
      <div className="admin_header">
        <div className="row align-items-center w-100">
          <div className="col">
            <a>
              <img
                className="logo_dashboard"
                src={require("../../assets/img/logoNN.png")}
                alt=""
              />
            </a>
          </div>
          <div className="col-auto">
            <a
              onClick={() => {
                navigate("/restaurant/dashboard/profile");
              }}
              className="user_profile">
              <div className="name">
                {" "}
                <img
                  style={{
                    borderRadius: "50%",
                    height: "2rem",
                  }}
                  width={30}
                  id="coverImg"
                  src={
                    profile?.cover_image
                      ? profile?.cover_image
                      : require("../../assets/img/logo_profile.png")
                  }
                  alt=""
                />
              </div>
            </a>
          </div>
          <div className="col-auto ">
            <Link
              className="comman_btn px-3 bg-white text-dark fw-bold"
              to=""
              onClick={() => {
                i18next.changeLanguage(currentLangCode === "en" ? "ar" : "en");
                setCurrentLangCode(currentLangCode === "en" ? "ar" : "en");
                ChangeLang(currentLangCode === "en" ? "Arabic" : "English");
                // window.location.reload(false);
              }}>
              <img
                className="mx-2"
                width={30}
                src={
                  currentLangCode === "en"
                    ? require("../../assets/img/Arabic.png")
                    : require("../../assets/img/usa.png")
                }
                alt=""
              />
              {currentLangCode === "en" ? "عربى" : "English"}
            </Link>
          </div>
          <div className="col-auto pe-5 ps-5">
            <a
              className="Notification"
              onClick={() => {
                navigate("/restaurant/dashboard/Notifications");
              }}>
              <img src={require("../../assets/img/notification.png")} alt="" />
              <span />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
