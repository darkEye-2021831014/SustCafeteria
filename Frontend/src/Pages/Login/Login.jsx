import React, { useState, useEffect } from "react";
import logo from "../../assets/sustLogo.png";
import { useLogin } from "../../hooks/useUser";
import { useNavigate } from "react-router";
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    mutate: loginUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useLogin();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("Login successful, navigating to dashboard...");
      navigate("/");
    }
  }, [isSuccess, navigate]);
  return (
    <div className="flex  h-[calc(100vh-81px)] overflow-hidden bg-gray-50">
      <div className="relative w-1/2 bg-[#8B3A3A] text-white flex items-center justify-center overflow-hidden">
        <svg
          className="absolute top-0 right-0 h-full w-full"
          viewBox="0 0 500 800"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            d="M 0,0 Q 500,200 500,800 L 0,800 Z"
            fill="#ffffff"
            opacity="0.1"
          />
          <path
            d="M 100,0 Q 400,250 500,800 L 0,800 Z"
            fill="#ffffff"
            opacity="0.08"
          />
        </svg>
        <div className="relative z-10 text-center px-10 max-w-md">
          <div className="w-40 mx-auto mb-4 bg-white p-2 rounded-xl">
            <img
              src={logo}
              alt="SUST Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-snug">
            SUST Cafeteria
            <br />
            Management System
          </h1>
          <p className="text-[17px] opacity-90">
            Manage food orders, inventory, staff, and reports all in one place.
          </p>
        </div>
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center px-16">
        <div className="pl-15">
          <div className="bg-[#E8B5BA] border-l-4 border-[#ec727e] text-black font-bold p-4 rounded-lg mb-8">
            <h3 className="font-bold mb-2">Cafeteria Notice</h3>
            <p className="text-sm">
              Today's menu has been updated. Fresh meals available now!
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit} className=" pr-80 space-y-4">
              <h2 className="text-4xl font-bold mb-4">Staff Login</h2>
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A]"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A]"
                />
              </div>

              {isError && (
                <p className="text-red-500 text-sm">
                  {error?.response?.data?.message || "Login failed"}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#8B3A3A] text-white py-3 rounded-lg font-semibold hover:bg-[#6f2e2e] transition-colors"
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
