import React from "react";
import { Routes, Route } from "react-router-dom";
import GuardianDashboard from "../pages/guardian/GuardianDashboard";
import StudentProgress from "../pages/guardian/StudentProgress";
import Messages from "../pages/guardian/Messages";

const GuardianRoutes = () => {
  return (
    <Routes>
      <Route path="/guardian" element={<GuardianDashboard />} />
      <Route path="/guardian/progress" element={<StudentProgress />} />
      <Route path="/guardian/messages" element={<Messages />} />
    </Routes>
  );
};

export default GuardianRoutes;