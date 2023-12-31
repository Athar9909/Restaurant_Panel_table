import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Trans, useTranslation } from "react-i18next";

const Sidebar = ({ slide, getBarClick, getBar }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [SlideState, setSlideState] = useState("");
  const width = window.innerWidth;
  const [sideBar, setSideBar] = useState(width < 768 ? false : true);
  useEffect(() => {
    setSlideState(slide);
  }, []);
  let token = localStorage.getItem("token-admin");
  // let AdminData = JSON.parse(localStorage.getItem("token-admin-data"));
  if (token === null) {
    Swal.fire({
      title: "PLease Login to Continue!",
      text: "Login Expired!",
      icon: "warning",
      confirmButtonText: "Login",
      confirmButtonColor: "#e25829",
    }).then((res) => {
      navigate("/restaurant/Login");
    });
  }

  return (
    <div className="sider_bar">
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className={
                slide === "Dash"
                  ? "accordion-button "
                  : "accordion-button collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              onClick={() => {
                navigate("/restaurant/dashboard");
              }}
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne">
              <img src={require("../../assets/img/dashboard.png")} alt="" />
              {t("Dashboard")}
            </button>
          </h2>
          <div
            id="collapseOne"
            className={
              slide === "Dash"
                ? "accordion-collapse collapse show"
                : "accordion-collapse collapse"
            }
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="siderbar_menus">
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard");
                  }}>
                  {t("Restaurant")}
                </a>
                {/* <a>Survey</a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item d-none">
          <h2 className="accordion-header" id="heading2">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse2"
              aria-expanded="true"
              aria-controls="collapse2">
              <img src={require("../../assets/img/branch.png")} alt="" /> Branch
              Management
            </button>
          </h2>
          <div
            id="collapse2"
            className="accordion-collapse collapse"
            aria-labelledby="heading2"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="siderbar_menus">
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/branch-management");
                  }}>
                  Branch Manager
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="heading3">
            <button
              className={
                slide === "BookM"
                  ? "accordion-button "
                  : "accordion-button collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse3n"
              aria-expanded="true"
              aria-controls="collapse3n">
              <img src={require("../../assets/img/booking.png")} alt="" />{" "}
              {t("Order")}
            </button>
          </h2>
          <div
            id="collapse3n"
            className={
              slide === "BookM"
                ? "accordion-collapse collapse show"
                : "accordion-collapse collapse"
            }
            aria-labelledby="heading3"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="siderbar_menus">
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/booking/takeaway");
                  }}>
                  {t("Takeaway")}
                </a>
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/booking/dinings");
                  }}>
                  {t("Dining")}
                </a>
                {/* <a>Dining with Food</a> */}
                {/* <a>Waiting List</a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="heading3">
            <button
              className={
                slide === "MenuM"
                  ? "accordion-button "
                  : "accordion-button collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse3"
              aria-expanded="true"
              aria-controls="collapse3">
              <img src={require("../../assets/img/menus.png")} alt="" />{" "}
              {t("Menu")}
            </button>
          </h2>
          <div
            id="collapse3"
            className={
              slide === "MenuM"
                ? "accordion-collapse collapse show"
                : "accordion-collapse collapse"
            }
            aria-labelledby="heading3"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="siderbar_menus">
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/category-management");
                  }}>
                  {t("CateM")}
                </a>
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/cuisines-management");
                  }}>
                  {t("CuisM")}
                </a>
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/booking/AddOn");
                  }}>
                  {t("AddOn")}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="heading4">
            <button
              className={
                slide === "TableM"
                  ? "accordion-button "
                  : "accordion-button collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse4"
              aria-expanded="true"
              aria-controls="collapse4">
              <img src={require("../../assets/img/qr-code-line.png")} alt="" />{" "}
              {t("QR_Code")}
            </button>
          </h2>
          <div
            id="collapse4"
            className={
              slide === "TableM"
                ? "accordion-collapse collapse show"
                : "accordion-collapse collapse"
            }
            aria-labelledby="heading4"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="siderbar_menus">
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/table/manual-table");
                  }}>
                  {t("ManualT")}
                </a>
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/table/waiting-table");
                  }}>
                  {t("WaitingT")}
                </a>
                {/* <a>Floor Plan Management</a>
                <a>Slots Management</a> */}
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="heading6">
            <button
              className={
                slide === "TransM"
                  ? "accordion-button "
                  : "accordion-button collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse6"
              aria-expanded="true"
              aria-controls="collapse6">
              <img
                width={11}
                src={require("../../assets/img/dollar.png")}
                alt=""
              />{" "}
              {t("Transaction")}
            </button>
          </h2>
          <div
            id="collapse6"
            className={
              slide === "TableM"
                ? "accordion-collapse collapse show"
                : "accordion-collapse collapse"
            }
            aria-labelledby="heading6"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="siderbar_menus">
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/transactions");
                  }}>
                  {t("AllTransaction")}
                </a>
                {/* <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/table/waiting-table");
                  }}>
                  Wating Tables
                </a> */}
                {/* <a>Floor Plan Management</a>
                <a>Slots Management</a> */}
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="heading6">
            <button
              onClick={() => {
                navigate("/restaurant/dashboard/Notifications");
              }}
              className={
                slide === "NotiM"
                  ? "accordion-button "
                  : "accordion-button collapsed "
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse9"
              aria-expanded="true"
              aria-controls="collapse9">
              <img
                width={11}
                src={require("../../assets/img/dollar.png")}
                alt=""
              />{" "}
              {t("Notification")}
            </button>
          </h2>
          <div
            id="collapse9"
            className={
              slide === "NotiM"
                ? "accordion-collapse collapse show"
                : "accordion-collapse collapse"
            }
            aria-labelledby="heading6"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="siderbar_menus">
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/Notifications");
                  }}>
                  {t("Notification")}
                </a>
                {/* <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/table/waiting-table");
                  }}>
                  Wating Tables
                </a> */}
                {/* <a>Floor Plan Management</a>
                <a>Slots Management</a> */}
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="heading7">
            <button
              className={
                slide === "ProfileM"
                  ? "accordion-button "
                  : "accordion-button collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse7"
              aria-expanded="true"
              aria-controls="collapse7">
              <img src={require("../../assets/img/profilemy.png")} alt="" />
              {t("My_Profile")}
            </button>
          </h2>
          <div
            id="collapse7"
            className={
              slide === "ProfileM"
                ? "accordion-collapse collapse show"
                : "accordion-collapse collapse"
            }
            aria-labelledby="heading6"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="siderbar_menus">
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/profile");
                  }}>
                  {t("EditProfile")}
                </a>
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/banners");
                  }}>
                  {t("EditBanner")}
                </a>
                {/* <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/table/waiting-table");
                  }}>
                  Wating Tables
                </a> */}
                {/* <a>Floor Plan Management</a>
                <a>Slots Management</a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item d-none">
          <h2 className="accordion-header" id="heading5">
            <button
              className={
                slide === "DiscountM"
                  ? "accordion-button "
                  : "accordion-button collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse5"
              aria-expanded="true"
              aria-controls="collapse5">
              <img src={require("../../assets/img/Discount.png")} alt="" />{" "}
              Discount
            </button>
          </h2>
          <div
            id="collapse5"
            className={
              slide === "DiscountM"
                ? "accordion-collapse collapse show"
                : "accordion-collapse collapse"
            }
            aria-labelledby="heading5"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="siderbar_menus">
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/Manage-Discount");
                  }}>
                  Manage Discount
                </a>
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/Promo-Manage");
                  }}>
                  Promo Code Management
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="accordion-item">
          <h2 className="accordion-header" id="heading7">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse7"
              aria-expanded="true"
              aria-controls="collapse7">
              <img src={require("../../assets/img/profilemy.png")} alt="" /> My
              Profile
            </button>
          </h2>
          <div
            id="collapse7"
            className="accordion-collapse collapse"
            aria-labelledby="heading7"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="siderbar_menus">
                <a>Setting</a>
                <a>About Us</a>
                <a>Privacy Policy</a>
                <a>Help Center</a>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="heading6">
            <a
              className="accordion-button collapsed arrow_remove"
              href="my-earning.html">
              <img src={require("../../assets/img/myearning.png")} alt="" /> My
              Earning
            </a>
          </h2>
        </div> */}

        <div className="accordion-item">
          <h2 className="accordion-header" id="heading8">
            <a
              className="accordion-button collapsed arrow_remove"
              onClick={() => {
                localStorage.removeItem("token-admin");
                navigate("/restaurant/Login");
                window.location.reload();
              }}>
              <img src={require("../../assets/img/logout.png")} alt="" />
              {t("Logout")}
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
