import React, { useEffect, useState } from "react";
import Profile from "../Dashboard/Profile";
import Sidebar from "../Dashboard/Sidebar";
import {
  ViewNewOrders,
  changeOrderStatus,
} from "../adminLogin/httpServicesAdmin/adminApis";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { t } from "i18next";

const ViewOrder = () => {
  const [slide, setSlide] = useState("BookM");
  const [order, setOrder] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    ViewOrder();
  }, []);

  const ViewOrder = async (key) => {
    const { data } = await ViewNewOrders(id);
    if (!data?.error) {
      let values = data?.results?.order;
      setOrder(values);
    }
  };

  const changeStatus = async (val) => {
    const { data } = await changeOrderStatus({
      orderId: id,
      status: val,
    });
    if (!data?.error) {
      Swal.fire({
        title: "Status Changed Successfully",
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
        timer: "2000",
      });
      ViewOrder();
    }
  };

  return (
    <div>
      <div className="admin_main">
        <Profile />
        <div className="admin_innermain d-flex">
          <Sidebar slide={slide} />
          <div className="admin_main_part">
            <div className="row">
              <div className="col-12 heading_main mb-4">
                {order?.type === "Dining" ? (
                  <h2>{t("Dining") + " " + t("Details")} </h2>
                ) : (
                  <h2>{t("Takeaway") + " " + t("Details")} </h2>
                )}
              </div>
              <div className="col-12 mb-4">
                <div className="row Customer_Information">
                  <div className="col-12">
                    <div className="row Customer_infotop align-items-center">
                      <div className="col">
                        <h3>{t("Info") + " " + t("Order")} :</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="row Customer_details">
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>{t("OrderId")}</strong>
                          <span>{order?.orderId}</span>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>
                            {t("Order")} {t("Amount")}
                          </strong>
                          <span>EGP {order?.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-4">
                <div className="row Customer_Information">
                  <div className="col-12">
                    <div className="row Customer_infotop align-items-center">
                      <div className="col">
                        <h3>{t("Status")} :</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="row Customer_details">
                      <div className="col-12">
                        <div className="Customer_boxx">
                          <strong>
                            {t("Change")} {t("Status")}
                          </strong>

                          <select
                            className="form-select "
                            name="categoryId"
                            aria-label="Default select example"
                            onChange={(e) => {
                              changeStatus(e.target.value);
                            }}>
                            <option value={order?.status}>
                              {order?.status}
                            </option>
                            <option value="Pending">Pending</option>
                            <option value="Complete">Completed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-4">
                <div className="row Customer_Information">
                  <div className="col-12">
                    <div className="row Customer_infotop align-items-center">
                      <div className="col">
                        <h3>{t("Info") + " " + t("Booking")} :</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="row Customer_details">
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>{t("TableN")}</strong>
                          <span>{order?.tableId?.name}</span>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>{t("comment")}</strong>
                          <span>No Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-4">
                <div className="row Customer_Information">
                  <div className="col-12">
                    <div className="row Customer_infotop align-items-center">
                      <div className="col">
                        <h3>{t("Info") + " " + t("Menu")} :</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="row Customer_details">
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>{t("Items")}</strong>
                          {order?.cuisines?.map((itm, ind) => (
                            <div className="d-flex">
                              <span>{itm?.cuisineId?.name}</span>
                              {/* <span>-EGP{itm?.cuisineId?.price}</span> */}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>{t("Qty")}</strong>
                          {order?.cuisines?.map((itm, ind) => (
                            <div className="d-flex text-center  ">
                              <span>{itm?.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
