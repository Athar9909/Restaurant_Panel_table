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
      let values = data?.results?.orders;
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
                        <h3>Customer Information:</h3>
                      </div>
                      <div className="col-auto"></div>
                    </div>
                    <div className="row Customer_details">
                      <div className="col-3 mb-5">
                        <div className="Customer_boxx">
                          <strong>Customer Name</strong>
                          <span>Phill Mathews</span>
                        </div>
                      </div>
                      <div className="col-3 mb-5">
                        <div className="Customer_boxx">
                          <strong>Mobile Number</strong>
                          <span>+15 7859852566</span>
                        </div>
                      </div>
                      <div className="col-3 mb-5">
                        <div className="Customer_boxx">
                          <strong>Mail Id</strong>
                          <span>ex@gmail.com</span>
                        </div>
                      </div>
                      <div className="col-3 mb-5">
                        <div className="Customer_boxx">
                          <strong>Address</strong>
                          <span>Alexandria, Egypt</span>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>Pickup Date/Time</strong>
                          <span>29 Aug 2023 13:30</span>
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
                          <strong>Restaurant branch</strong>
                          <span>Alexandria, Egypt</span>
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
                          <span>Ful Wa Ta’ameya</span>
                          <span>Hamam Mahshi</span>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="Customer_boxx">
                          <strong>Quantity</strong>
                          <span>02</span>
                          <span>01</span>
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
