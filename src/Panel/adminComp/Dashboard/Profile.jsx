import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = ({ slide, getBarClick, getBar }) => {
  const navigate = useNavigate();
  const [SlideState, setSlideState] = useState("");
  const width = window.innerWidth;
  const [sideBar, setSideBar] = useState(width < 768 ? false : true);

  useEffect(() => {
    setSlideState(slide);
  }, []);

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
              <div className="name">DA</div>
            </a>
          </div>
          <div className="col-auto pe-5 ps-5">
            <a className="Notification">
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
