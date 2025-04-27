import React, { useState } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/client/user/login", loginData);
      if (response.data.success) {
        toast.success("Login successful!");
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        // Redirect to home page
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* tab1 */}
            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form onSubmit={handleLoginSubmit}>
                  <input 
                    type="email" 
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Email address *" 
                    required 
                  />
                  <input 
                    type="password" 
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password *" 
                    required 
                  />
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/resetPassword">Lost password?</Link>
                    </p>
                  </div>
                  <button type="submit">Log In</button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Tab2 */}
            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <form>
                  <input type="text" placeholder="Username *" required />
                  <input type="email" placeholder="Email address *" required />
                  <input type="password" placeholder="Password *" required />
                  <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our
                    <Link
                      to="/terms"
                      style={{ textDecoration: "none", color: "#c32929" }}
                    >
                      {" "}
                      privacy policy
                    </Link>
                    .
                  </p>
                  <button>Register</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
