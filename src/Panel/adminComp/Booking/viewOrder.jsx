import React, { useEffect, useState } from "react";
import Profile from "../Dashboard/Profile";
import Sidebar from "../Dashboard/Sidebar";
import { ViewNewOrders } from "../adminLogin/httpServicesAdmin/adminApis";
import { useParams } from "react-router-dom";

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
