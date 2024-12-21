import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./components/form/Form";
import Info from "./components/main/Info";
import Login from "./components/form/Login";
import Register from "./components/form/Register";
import UserDashbord from "./components/user/UserDashbord";
import HousePost from "./components/form/HousePost";
import Owner from "./components/form/Owner";
import OwnerDashboard from "./components/Owner/OwnerDashboard";
import { AuthProvider } from "./components/AuthContext";
import OwnerLogin from "./components/form/OwnerLogin";
import { OwnerAuthProvider } from "./components/OwnerContextAuth";
//import Loading from "./components/Loading";
import { DashProvider } from "./components/ShowDashContext";

function App() {
  return (
    <BrowserRouter>
      {/* Wrapping the entire app with both context providers */}
      <AuthProvider>
        <OwnerAuthProvider>
          <DashProvider>
            <Routes>
              {/* User routes */}

              <Route path="/" element={<Home />} />
              <Route path="/reserve/:id" element={<Form />} />
              <Route path="/info/:id" element={<Info />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/dashbord" element={<UserDashbord />} />

              {/* Owner routes */}
              <Route path="/owner/Login" element={<OwnerLogin />} />
              <Route path="/owner/SignUp" element={<Owner />} />
              <Route path="/owner/dash/posthome" element={<HousePost />} />
              <Route path="/owner/dash" element={<OwnerDashboard />} />
            </Routes>
          </DashProvider>
        </OwnerAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
