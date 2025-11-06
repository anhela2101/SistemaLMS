import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRouter";
import LadingPage from "../pages/LadingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/HomePage";

export const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LadingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route element={<DashboardLayout />}>
            <Route path="home" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
