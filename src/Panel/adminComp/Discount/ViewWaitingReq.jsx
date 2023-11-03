import React, { useEffect, useState } from "react";
import Profile from "../Dashboard/Profile";
import Sidebar from "../Dashboard/Sidebar";
import {
  AddAlotTable,
  AddWaitingTime,
  AllManTables,
  ViewNewOrders,
  changeOrderStatus,
} from "../adminLogin/httpServicesAdmin/adminApis";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ViewWaitingReq = () => {
  const [slide, setSlide] = useState("BookM");
  const [order, setOrder] = useState([]);
  let { id } = useParams();
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();
  let location = useLocation();
  const [time, setTime] = useState();
  useEffect(() => {
    getAllTables();
  }, []);

  const getAllTables = async (key) => {
    const { data } = await AllManTables({
      search: key ? key : "",
    });
    if (!data?.error) {
      let values = data?.results?.tables;
      setTables(values);
    }
  };

  const AddTime = async (val) => {
    const { data } = await AddWaitingTime({
      id: id,
      time: time,
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

  const AlotTable = async (val) => {
    const { data } = await AddAlotTable({
      id: id,
      tableId: val,
    });
    if (!data?.error) {
      Swal.fire({
        title: "Table Alloted Successfully",
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
        timer: "2000",
      });
      navigate(-1);
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
                            defaultValue={location?.state?.time}
                            required
                            onChange={(e) => {
                              setTime(e.target.value);
                            }}
                          />{" "}
                          <small>
                            Please Set Time According to Open and Close Hours
                          </small>
                        </div>

                        <button
                          className="comman_btn mt-4 px-3"
                          onClick={() => {
                            AddTime();
                          }}>
                          {location?.state?.time ? "Change Time" : "Save Time"}
                        </button>
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
                    <div className="Customer_boxx py-4">
                      <strong>Choose Table</strong>

                      <select
                        className="form-select "
                        name="categoryId"
                        aria-label="Default select example"
                        onChange={(e) => {
                          AlotTable(e.target.value);
                        }}>
                        <option value={location?.state?.tableId}>
                          {location?.state?.tableName}
                        </option>
                        {tables?.map((itm, ind) => (
                          <option value={itm?._id}>{itm?.name}</option>
                        ))}
                      </select>
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
