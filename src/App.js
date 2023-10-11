import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Panel/adminComp/adminLogin/Login";
import ForgotPass from "./Panel/adminComp/adminLogin/forgotPass";
import OtpVerify from "./Panel/adminComp/adminLogin/OtpVerify";
import Dashboard from "./Panel/adminComp/Dashboard/Dashboard";
import BranchManage from "./Panel/adminComp/BranchManage/BranchManage";
import CategoryManage from "./Panel/adminComp/Menu/CategoryManage";
import CuisineManage from "./Panel/adminComp/Menu/CuisineManage";
import ManualTable from "./Panel/adminComp/Tables/ManualTable";
import AddOn from "./Panel/adminComp/Menu/AddOn";
import TakeAway from "./Panel/adminComp/Booking/TakeAway";
import Dining from "./Panel/adminComp/Booking/Dining";
import ViewOrder from "./Panel/adminComp/Booking/viewOrder";
import EditProfile from "./Panel/adminComp/Dashboard/EditProfile";
import WaitingList from "./Panel/adminComp/Tables/WaitingList";
import EditCategory from "./Panel/adminComp/Menu/EditCategory";
import EditCuisine from "./Panel/adminComp/Menu/EditCuisine";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/restaurant/login" element={<Login />} />
          <Route
            path="/restaurant/login/forgot-Password"
            element={<ForgotPass />}
          />
          <Route
            path="/restaurant/login/forgot-Password/OTP-verification"
            element={<OtpVerify />}
          />
          <Route path="/restaurant/dashboard" element={<Dashboard />} />
          <Route
            path="/restaurant/dashboard/branch-management"
            element={<BranchManage />}
          />
          <Route
            path="/restaurant/dashboard/category-management"
            element={<CategoryManage />}
          />
          <Route
            path="/restaurant/dashboard/cuisines-management"
            element={<CuisineManage />}
          />
          <Route
            path="/restaurant/dashboard/table/manual-table"
            element={<ManualTable />}
          />
          <Route
            path="/restaurant/dashboard/table/waiting-table"
            element={<WaitingList />}
          />
          <Route
            path="/restaurant/dashboard/booking/takeaway"
            element={<TakeAway />}
          />
          <Route
            path="/restaurant/dashboard/booking/View/:id"
            element={<ViewOrder />}
          />
          <Route
            path="/restaurant/dashboard/booking/dinings"
            element={<Dining />}
          />
          <Route
            path="/restaurant/dashboard/booking/AddOn"
            element={<AddOn />}
          />
           <Route
            path="/restaurant/dashboard/profile"
            element={<EditProfile />}
          />
            <Route
            path="/restaurant/dashboard/menu/edit-category/:id"
            element={<EditCategory />}
          />
            <Route
            path="/restaurant/dashboard/menu/edit-cuisine/:id"
            element={<EditCuisine />}
          />
            <Route
            path="/restaurant/dashboard/menu/edit-addOn"
            element={<EditProfile />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
