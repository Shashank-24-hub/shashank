import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoanForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loanNo: "",
    loanType: "",
    borrower: "",
    borrowerAddress: "",
    coBorrower1Name: "",
    coBorrower1Address: "",
    sanctionAmount: "",
    region: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/add-loan`, formData);
      alert("Loan added successfully!");
      navigate("/portfolio");
    } catch (error) {
      console.error("Error adding loan:", error);
    }
  };
  

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Loan</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-semibold">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default LoanForm;
