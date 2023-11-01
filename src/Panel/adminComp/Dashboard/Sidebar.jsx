import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = ({ slide, getBarClick, getBar }) => {
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
  console.log(slide, "kjkj");
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
  // console.log(width);

  const Logout = () => {
    localStorage.removeItem("token-admin");
    navigate("/restaurant/Login");
    window.location.reload();
  };

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
              <img src={require("../../assets/img/dashboard.png")} alt="" />{" "}
              Dashboard
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
                  Restaurant
                </a>
                {/* <a>Survey</a> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="accordion-item">
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
        </div> */}

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
              <img src={require("../../assets/img/booking.png")} alt="" /> Order
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
                  Takeaway
                </a>
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/booking/dinings");
                  }}>
                  Dining
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
              <img src={require("../../assets/img/menus.png")} alt="" /> Menu
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
                  Category Management
                </a>
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/cuisines-management");
                  }}>
                  Cuisines Management
                </a>
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/booking/AddOn");
                  }}>
                  Add On
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
              QR Code
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
                  Manual Table
                </a>
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/table/waiting-table");
                  }}>
                  Wating Tables
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
              Transactions
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
                  All Transactions
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
              <i
                class={"fa fa-bell me-3"}
                style={{
                  color: "#ff7622",
                }}
                aria-hidden="true"></i>
              Notifications
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
                  Notifications
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
              <img src={require("../../assets/img/profilemy.png")} alt="" /> My
              Profile
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
                  Edit profile
                </a>
                <a
                  onClick={() => {
                    navigate("/restaurant/dashboard/banners");
                  }}>
                  Edit Banners
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
        {/* <div className="accordion-item">
          <h2 className="accordion-header" id="heading5">
            <button
              className="accordion-button collapsed"
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
            className="accordion-collapse collapse"
            aria-labelledby="heading5"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="siderbar_menus">
                <a>Manage Discount</a>
                <a>Promo Code Management</a>
              </div>
            </div>
          </div>
        </div> */}
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
              <img src={require("../../assets/img/logout.png")} alt="" /> Logout
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
