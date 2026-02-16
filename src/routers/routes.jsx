import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRouter";
import LadingPage from "../pages/LadingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/HomePage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import NewPasswordPage from "../pages/NewPasswordPage";
import ResetPasswordPage2 from "../pages/ResetPasswordPage2";
import CourseDetailPage from "../pages/CourseDetailPage";
import CertificatesPage from "../pages/CertificatesPage";
import PurchasesPage from "../pages/PurchasesPage";
import MyCoursesPage from "../pages/MyCoursesPage";
import CourseStart from "../pages/CourseStart";

export const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exec path="/" element={<LadingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/new-password" element={<NewPasswordPage />} />
        <Route path="/reset-password2" element={<ResetPasswordPage2 />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route element={<DashboardLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="courses/:courseId" element={<CourseDetailPage />} />
            <Route path="my-certificates" element={<CertificatesPage />} />
            <Route path="my-purchases" element={<PurchasesPage />} />
            <Route path="my-courses" element={<MyCoursesPage />} />
            <Route path="course-start/:courseId" element={<CourseStart />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
