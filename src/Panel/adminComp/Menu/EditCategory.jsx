import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import Profile from "../Dashboard/Profile";
import {
  AddNewCategory,
  AllCategories,
  EditCategoryDetails,
} from "../adminLogin/httpServicesAdmin/adminApis";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditCategory = () => {
  const [slide, setSlide] = useState("MenuM");
  const [cateName, setCateName] = useState("");
  let location = useLocation();
  let { id } = useParams();
  let navigate = useNavigate();
  const onSave = async () => {
    const { data } = await EditCategoryDetails({
      name: cateName,
      categoryId: id,
    });
    if (!data.error) {
      Swal.fire({
        title: data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#e25829",
        timer: "2000",
      });
      setCateName("");
      navigate(-1);
    }
  };
  return (
    <div className="admin_main">
      <Profile />

      <div className="admin_innermain d-flex">
        <Sidebar slide={slide} />
        <div className="admin_main_part">
          <div className="row">
            <div className="col-12 heading_main mb-4">
              <h2>Edit Category</h2>
            </div>
            <div className="col-12">
              <div className="row comman-new-design">
                <div className="col-12">
                  <form className="comman_form row" action="#">
                    <div className="p_form form-group col-12">
                      <p>
                        Product Selling Categories can be defined here like...
                        Beverages, Bakery, Breads, Dairy Items{" "}
                      </p>
                    </div>
                    <div className="col-6 form-group position-relative">
                      <label className="set_label" htmlFor="">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={location?.state}
                        onChange={(e) => {
                          setCateName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-12">
                      <div className="row">
                        <div className="col-4">
                          <a className="btns_new_bg w-100" onClick={onSave}>
                            Save
                          </a>
                        </div>
                        <div className="col-4">
                          <a
                            className="btns_new_border w-100"
                            onClick={() => navigate(-1)}>
                            Back
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
