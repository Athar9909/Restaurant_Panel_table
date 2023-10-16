import React, { useEffect, useState } from "react";
import Profile from "../Dashboard/Profile";
import Sidebar from "../Dashboard/Sidebar";
import {
  AddWaitingTime,
  ViewNewOrders,
  changeOrderStatus,
} from "../adminLogin/httpServicesAdmin/adminApis";
import { useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ViewWaitingReq = () => {
  const [slide, setSlide] = useState("BookM");
  const [order, setOrder] = useState([]);
  let { id } = useParams();

  let location = useLocation();

  const AddTime = async (val) => {
    const { data } = await AddWaitingTime({
      id: id,
      time: val,
    });
    if (!data?.error) {
      Swal.fire({
        title: "Time Added Successfully",
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
        timer: "2000",
      });
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
                <h2>Table Request</h2>
              </div>
              <div className="col-12 mb-4">
                <div className="row Customer_Information">
                  <div className="col-12">
                    <div className="row Customer_infotop align-items-center">
                      <div className="col">
                        <h3>Customer Information:</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="row Customer_details">
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>Customer Name</strong>
                          <span>{location?.state?.name}</span>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>Customer Number</strong>
                          <span>{location?.state?.num}</span>
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
                        <h3>Request Status:</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="row Customer_details">
                      <div className="col-12">
                        <div className="Customer_boxx">
                          <strong>Add Waiting Time</strong>
                          <input
                            type="time"
                            className="form-group border rounded"
                            id="appt"
                            name="appt"
                            min="09:00"
                            max="18:00"
                            required
                            onChange={(e) => {
                              AddTime(e.target.value);
                            }}
                          />{" "}
                          <small>Open hours are 9am to 6pm</small>
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
                        <h3>Alott Table:</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="Customer_boxx">
                      <strong>Choose Table</strong>

                      <select
                        className="form-select "
                        name="categoryId"
                        aria-label="Default select example"
                      >
                        <option value={order?.status}>{order?.status}</option>
                        <option value="Pending">table 1</option>
                        <option value="Complete">table2</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-4">
                <div className="row Customer_Information">
                  <div className="col-12">
                    <div className="row Customer_infotop align-items-center">
                      <div className="col">
                        <h3>Menu Information:</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="row Customer_details">
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>Items</strong>
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
                          <strong>Quantity</strong>
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

export default ViewWaitingReq;
