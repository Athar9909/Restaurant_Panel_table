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
function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/login/forgot-Password" element={<ForgotPass />} />
        <Route
          path="/admin/login/forgot-Password/OTP-verification"
          element={<OtpVerify />}
        />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route
          path="/admin/dashboard/branch-management"
          element={<BranchManage />}
        />
        <Route
          path="/admin/dashboard/category-management"
          element={<CategoryManage />}
        />
        <Route
          path="/admin/dashboard/cuisines-management"
          element={<CuisineManage />}
        />
        <Route
          path="/admin/dashboard/table/manual-table"
          element={<ManualTable />}
        />
        <Route
          path="/admin/dashboard/booking/takeaway"
          element={<TakeAway />}
        />
        <Route path="/admin/dashboard/booking/dinings" element={<Dining />} />
        <Route path="/admin/dashboard/booking/AddOn" element={<AddOn />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
