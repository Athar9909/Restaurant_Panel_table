import React, { useEffect, useState } from "react";
import Profile from "../Dashboard/Profile";
import Sidebar from "../Dashboard/Sidebar";
import {
  ViewNewOrders,
  changeOrderStatus,
} from "../adminLogin/httpServicesAdmin/adminApis";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

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
        timer:"2000"
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
                <h2>Takeaway Details</h2>
              </div>
              <div className="col-12 mb-4">
                <div className="row Customer_Information">
                  <div className="col-12">
                    <div className="row Customer_infotop align-items-center">
                      <div className="col">
                        <h3>Order Information:</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="row Customer_details">
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>Order Id</strong>
                          <span>{order?.orderId}</span>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>Order Amount</strong>
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
                        <h3>Order Status:</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="row Customer_details">
                      <div className="col-12">
                        <div className="Customer_boxx">
                          <strong>Change Order Status</strong>

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
                        <h3>Booking Information:</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="row Customer_details">
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>Table Name</strong>
                          <span>{order?.tableId?.name}</span>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>Any excepted request</strong>
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

export default ViewOrder;
