import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public Pages
import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { Services } from '../pages/public/Services';
import { Contact } from '../pages/public/Contact';

// Auth Pages
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ForgotPassword, ResetPassword, VerifyEmail } from '../pages/auth/ForgotPassword';

// User Portal Pages
import { Dashboard as UserDashboard } from '../pages/user/Dashboard';
import { Profile as UserProfile } from '../pages/user/Profile';
import { Projects as UserProjects } from '../pages/user/Projects';
import { CreateProject } from '../pages/user/CreateProject';
import { ProjectDetails as UserProjectDetails } from '../pages/user/ProjectDetails';
import { Quotations as UserQuotations } from '../pages/user/Quotations';
import { QuotationDetails as UserQuotationDetails } from '../pages/user/QuotationDetails';
import { Milestones as UserMilestones } from '../pages/user/Milestones';
import { Payments as UserPayments } from '../pages/user/Payments';
import { Messages as UserMessages } from '../pages/user/Messages';
import { Notifications as UserNotifications } from '../pages/user/Notifications';
import { Reviews as UserReviews } from '../pages/user/Reviews';
import { Settings as UserSettings } from '../pages/user/Settings';

// Admin Portal Pages
import { AdminDashboard } from '../pages/admin/Dashboard';
import { AdminUsers } from '../pages/admin/Users';
import { AdminUserDetails } from '../pages/admin/UserDetails';
import { AdminProjects } from '../pages/admin/Projects';
import { AdminProjectDetails } from '../pages/admin/ProjectDetails';
import { AdminQuotations } from '../pages/admin/Quotations';
import { AdminMilestones } from '../pages/admin/Milestones';
import { AdminPayments } from '../pages/admin/Payments';
import { AdminMessages } from '../pages/admin/Messages';
import { AdminReviews } from '../pages/admin/Reviews';
import { AdminCategories } from '../pages/admin/Categories';
import { AdminSkills } from '../pages/admin/Skills';
import { AdminCountries } from '../pages/admin/Countries';
import { AdminReports, AdminSettings } from '../pages/admin/Reports';

// System Pages
import { NotFound, Forbidden } from '../pages/system/ErrorPages';

export function AppRoutes() {
  return (
    <Routes>
      {/* 1. Public Marketing & Information Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Auth Routes inside public layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>

      {/* 2. Client User Portal Routes (Protected) */}
      <Route element={<UserLayout />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/projects" element={<UserProjects />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects/:id" element={<UserProjectDetails />} />
        <Route path="/quotations" element={<UserQuotations />} />
        <Route path="/quotations/:id" element={<UserQuotationDetails />} />
        <Route path="/milestones" element={<UserMilestones />} />
        <Route path="/payments" element={<UserPayments />} />
        <Route path="/messages" element={<UserMessages />} />
        <Route path="/notifications" element={<UserNotifications />} />
        <Route path="/reviews" element={<UserReviews />} />
        <Route path="/settings" element={<UserSettings />} />
      </Route>

      {/* 3. Platform Admin Control Routes (Protected + requireAdmin) */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/:id" element={<AdminUserDetails />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/projects/:id" element={<AdminProjectDetails />} />
        <Route path="/admin/quotations" element={<AdminQuotations />} />
        <Route path="/admin/milestones" element={<AdminMilestones />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/skills" element={<AdminSkills />} />
        <Route path="/admin/countries" element={<AdminCountries />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* 4. Error Pages */}
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
