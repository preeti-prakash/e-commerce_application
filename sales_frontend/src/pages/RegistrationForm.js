import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.username.trim()) {
      return "Username is required.";
    }
    if (!formData.first_name.trim()) {
      return "First name is required.";
    }
    if (!formData.last_name.trim()) {
      return "Last name is required.";
    }
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    if (!phoneRegex.test(formData.phone_number)) {
      return "Phone number must be exactly 10 digits.";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await axios.post("http://localhost:8000/users/register/", formData);
      setSuccess(true);
      setError(null);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">
            Registration successful! Redirecting...
          </p>
        )}
        <form onSubmit={handleSubmit}>
          {[
            "username",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "password",
          ].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 font-bold mb-2 capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
