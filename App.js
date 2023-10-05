import Dining from "./adminComp/Booking/Dining";
import TakeAway from "./adminComp/Booking/TakeAway";
import BranchManage from "./adminComp/BranchManage/BranchManage";
import Dashboard from "./adminComp/Dashboard/Dashboard";
import AddOn from "./adminComp/Menu/AddOn";
import CategoryManage from "./adminComp/Menu/CategoryManage";
import CuisineManage from "./adminComp/Menu/CuisineManage";
import ManualTable from "./adminComp/Tables/ManualTable";
import Login from "./adminComp/adminLogin/Login";
import OtpVerify from "./adminComp/adminLogin/OtpVerify";
import ForgotPass from "./adminComp/adminLogin/forgotPass";
import AddCard from "./appComp/AddCard";
import AddProduct from "./appComp/AddProduct";
import Cart from "./appComp/Cart";
import OrderConfirmed from "./appComp/OrderConfirmed";
import Payment from "./appComp/Payment";
import RateOrder from "./appComp/RateOrder";
import Home from "./appComp/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/restaurant/login" element={<Login />} />
        <Route path="/restaurant/login/forgot-Password" element={<ForgotPass />} />
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
          path="/restaurant/dashboard/booking/takeaway"
          element={<TakeAway />}
        />
        <Route path="/restaurant/dashboard/booking/dinings" element={<Dining />} />
        <Route path="/restaurant/dashboard/booking/AddOn" element={<AddOn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
