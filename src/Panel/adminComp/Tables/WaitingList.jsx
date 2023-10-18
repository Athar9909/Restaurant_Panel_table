import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import {
  AddNewQR,
  AddNewWaitQR,
  AllBranches,
  AllManTables,
  WaitingTables,
} from "../adminLogin/httpServicesAdmin/adminApis";
import Profile from "../Dashboard/Profile";
import Swal from "sweetalert2";
import { QRCode } from "react-qrcode-logo";
import { useNavigate } from "react-router-dom";

const WaitingList = () => {
  const [slide, setSlide] = useState("TableM");
  const [tables, setTables] = useState([]);
  const [branch, setBranch] = useState([]);
  const [selectBranch, setSelectBranch] = useState([]);
  const [previewImg, setPreviewImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllWaitingTables();
    getAllBranches();
  }, []);

  const getAllWaitingTables = async (key) => {
    const { data } = await WaitingTables({
      search: key ? key : "",
    });
    if (!data?.error) {
      let values = data?.results?.waitingList;
      setTables(values);
    }
  };

  const getAllBranches = async () => {
    const { data } = await AllBranches();
    if (!data?.error) {
      setBranch(data?.results?.restaurants);
    }
  };

  const GenerateQR = async () => {
    const { data } = await AddNewWaitQR(selectBranch);
    if (!data?.error) {
      Swal.fire({
        title: data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
        timer: "2000",
      });
      setPreviewImg(data?.results?.branch?._id);
      getAllWaitingTables();
      document.getElementById("modalClose").click();
      document.getElementById("modalOpen").click();
      document.getElementById("reset1").click();
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
                <h2>Waiting Table List</h2>
              </div>
              <div className="col-12 mb-4">
                <form action="#" className="row search_part">
                  <div className="form-group col-9 position-relative">
                    <input
                      className="form-control"
                      type="text"
                      id=""
                      placeholder="Search by Customer name"
                      onChange={(e) => {
                        getAllWaitingTables(e.target.value);
                      }}
                    />
                    <a className="search_bt">
                      <img
                        src={require("../../assets/img/search.png")}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="col-3">
                    <div className="">
                      <a
                        data-bs-toggle="modal"
                        data-bs-target="#promocode"
                        className="comman_btn">
                        <strong>Generate Waiting QR</strong>
                      </a>

                      <a
                        data-bs-toggle="modal"
                        data-bs-target="#preview"
                        id="modalOpen"
                        className="comman_btn d-none">
                        <strong>Generate Waiting QR</strong>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12 table_comman mt-3">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>S. No</th>
                            <th>Time</th>
                            <th>Customer Name</th>
                            <th>Mobile Number</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(tables || [])?.map((itm, idx) => (
                            <tr>
                              <td>{idx + 1}</td>

                              <td>{itm?.createdAt?.slice(0, 10)}</td>
                              <td>{itm?.name}</td>
                              <td>{itm?.phone_number}</td>

                              <td className="text-center">{itm?.status}</td>
                              <td>
                                <a
                                  className="table_btn_border ms-1"
                                  onClick={() => {
                                    navigate(
                                      `/restaurant/dashboard/viewTableWaiting/${itm?._id}`,
                                      {
                                        state: {
                                          name: itm?.name,
                                          num: itm?.phone_number,
                                          status: itm?.status,
                                          tableId: itm?.tableId?._id,
                                          tableName: itm?.tableId?.name,
                                          time: itm?.time,
                                        },
                                      }
                                    );
                                  }}>
                                  Edit
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="pagination_custom">
                      <a href="javascript:;">
                        <img src="assets/img/ar_left.png" alt="" />
                      </a>{" "}
                      <span>1 - 10 of 100</span>{" "}
                      <a href="javascript:;">
                        <img src="assets/img/ar_right.png" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade comman_modal add_item"
        id="promocode"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add Waiting Table QR
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="modalClose"
              />
            </div>
            <div className="modal-body">
              <div className="add_item_form">
                <form className="row comman_dashboard_form" action="#">
                  <div className="col-12 form-group position-relative">
                    <label className="set_label" htmlFor="">
                      Select Branch
                    </label>

                    <select
                      className=" form-select form-control"
                      name="categoryId"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setSelectBranch(e.target.value);
                      }}>
                      <option selected="">Select Branch</option>
                      {branch?.map((itm, id) => (
                        <option value={itm?._id}>
                          {itm?.restaurantId?.restaurant_name}-
                          {itm?.username ? itm?.username : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-4 form-group mb-0 position-relative">
                    <a
                      className="small_bts_bg text-center"
                      onClick={() => {
                        GenerateQR();
                      }}>
                      Generate QR
                    </a>
                    <button className="d-none" type="reset" id="reset1">
                      reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade comman_modal add_item"
        id="preview"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Preview QR
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="modalClose"
                onClick={() => {
                  setPreviewImg("");
                }}
              />
            </div>
            <div className="modal-body">
              <div className="add_item_form">
                <QRCode
                  fgColor="#fff"
                  bgColor="rgb(242,133,0)"
                  ecLevel="Q"
                  size={300}
                  quietZone="10"
                  qrStyle="dots"
                  logoWidth={100}
                  logoImage={require("../../assets/img/QrLogo.png")}
                  removeQrCodeBehindLogo={false}
                  eyeRadius={8}
                  logoPadding={3}
                  value={`https://zitex.techgropsedev.com/waitList/${previewImg}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingList;
