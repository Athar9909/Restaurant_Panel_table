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
        <Route path="/:id" element={<Home />} />
        <Route path="/app/home/add-product/:id" element={<AddProduct />} />
        <Route path="/app/home/cart" element={<Cart />} />
        <Route path="/app/home/payment-method" element={<Payment />} />
        <Route path="/app/home/payment-method/Add-card" element={<AddCard />} />
        <Route path="/app/home/order-Confirmed" element={<OrderConfirmed />} />
        <Route path="/app/home/rate-order" element={<RateOrder />} />

        {/* Admin Routes */}

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
  );
}

export default App;
