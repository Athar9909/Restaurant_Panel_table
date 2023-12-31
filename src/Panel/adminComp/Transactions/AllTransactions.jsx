import React, { useEffect, useState } from "react";
import Profile from "../Dashboard/Profile";
import Sidebar from "../Dashboard/Sidebar";
import {
  GetAllTransactions,
  exportTransactionData,
} from "../adminLogin/httpServicesAdmin/adminApis";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";


const AllTransactions = () => {
  const [slide, setSlide] = useState("TransM");
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({ from: "", to: "" });

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async (key) => {
    const { data  } = await GetAllTransactions({
      search: key ? key : "",
      branch: "",
      from: values?.from,
      till: values?.to,
    });
    if (!data?.error) {
      let values = data?.results?.transactions;
      setList(values);
    }
  };

  const ExportTransaction = async () => {
    const { data } = await exportTransactionData({
      from: values?.from,
      till: values?.to,
    });
    if (!data.error) {
      window?.open(data?.results?.file);
    }
  };

  const handleDate = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
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
                <h2>{t('AllTransaction')}</h2>
              </div>

              <div className="col-5 mb-4 mt-5">
                <form action="#" className="row search_part">
                  <div className="form-group col-12 position-relative">
                    <input
                      className="form-control"
                      type="text"
                      id=""
                      placeholder={t('STrans')}
                      onChange={(e) => {
                        getTransactions(e.target.value);
                      }}
                    />
                    <a className="search_bt">
                      <img
                        src={require("../../assets/img/search.png")}
                        alt=""
                      />
                    </a>
                  </div>
                </form>
              </div>

              <div className="col-5 mt-3">
                <form
                  className="form-design py-4 px-3  row align-items-end justify-content-between"
                  action="">
                  <div className="form-group mb-0 col-4">
                    <label htmlFor="">{t('from')}</label>
                    <input
                      type="date"
                      className="form-control"
                      name="from"
                      id="dashFrom"
                      value={values.from}
                      onChange={handleDate}
                    />
                  </div>
                  <div className="form-group mb-0 col-4">
                    <label htmlFor="">{t('To')}</label>
                    <input
                      type="date"
                      className="form-control"
                      name="to"
                      id="dashTo"
                      value={values.to}
                      onChange={handleDate}
                    />
                  </div>
                  <div className="form-group mb-0 col-4">
                    <a
                      onClick={() => {
                        getTransactions();
                      }}
                      className="comman_btn text-decoration-none">
                      <span>{t('Search')}</span>
                    </a>
                  </div>
                </form>
              </div>
              <div className="col-2 mt-5">
                <div className="mt-1">
                  <a className="comman_btn" onClick={() => ExportTransaction()}>
                    <strong>
                      <i class="fa-solid fa-file-export mx-1"></i>{t('Exp')}
                    </strong>
                  </a>
                </div>
            </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12 table_comman mt-3">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>{t('Date')}</th>
                            <th>{t('OrderId')}</th>
                            <th>{t('TableN')}</th>
                            <th>{t('TransId')}</th>
                            <th>{t('OrderType')}</th>
                            <th>{t('Total')}</th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {list?.map((item, index) => (
                            <tr>
                              <td>{item?.createdAt?.slice(0, 10)}</td>
                              <td>
                                <a
                                  className="tag_class1"
                                  onClick={() => {
                                    navigate(
                                      `/restaurant/dashboard/booking/View/${item?.orderId?._id}`
                                    );
                                  }}>
                                  {item?.orderId?.orderId}
                                </a>
                              </td>
                              <td>{item?.orderId?.tableId?.name}</td>
                              <td>{item?.transactionId}</td>
                              <td>{item?.type}</td>
                              <td>{item?.orderId?.total}</td>
                              {/* <td>
                                <a
                                  className="table_btn"
                                  onClick={() => {
                                    navigate(
                                      `/restaurant/dashboard/booking/View/${item?._id}`
                                    );
                                  }}>
                                  View
                                </a>
                              </td> */}
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
    </div>
  );
};

export default AllTransactions;
