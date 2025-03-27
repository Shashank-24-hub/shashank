import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

const categories = [
  "All",
  "Pre Sarfaesi",
  "NPA",
  "13(3) Responses",
  "Symbolic Possession",
  "DM Order",
  "Physical Possessions",
  "Auctions",
];

const allColumns = [
  { key: "loanNo", label: "Loan No" },
  { key: "loanType", label: "Loan Type" },
  { key: "borrower", label: "Borrower" },
  { key: "borrowerAddress", label: "Borrower Address" },
  { key: "coBorrower1Name", label: "Co-Borrower" },
  { key: "coBorrower1Address", label: "Co-Borrower Address" },
  { key: "currentDPD", label: "Current DPD" },
  { key: "sanctionAmount", label: "Sanction Amount" },
  { key: "region", label: "Region" },
  { key: "state", label: "State" },
];

const Portfolio = () => {
  const [loans, setLoans] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(
    allColumns.map((c) => c.key)
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/get-loans`
      );
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    console.log("Dropdown Toggled:", !dropdownOpen);
  };

  const handleColumnChange = (columnKey) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(columnKey)
        ? prevSelected.filter((key) => key !== columnKey)
        : [...prevSelected, columnKey]
    );
  };

  return (
    <div className="main-container">
      <Navbar />
      <div className="content-container">
        <Sidebar />

        <div className="portfolio-content">
          <h2 className="page-title">Portfolio</h2>

          {/* Category Filter Bar */}
          <div className="category-bar">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search and Column Filter Section */}
          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Search Loan Number"
              className="search-input"
            />

            {/* Column Selection Dropdown */}
            {/* Column Selection Dropdown */}
            <div
              className={`dropdown ${dropdownOpen ? "active" : ""}`}
              ref={dropdownRef}
            >
              <button className="dropdown-button" onClick={toggleDropdown}>
                Select Column ▼
              </button>
              <div className="dropdown-content">
                {allColumns.map((column) => (
                  <label key={column.key} className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(column.key)}
                      onChange={() => handleColumnChange(column.key)}
                    />
                    {column.label}
                  </label>
                ))}
              </div>
            </div>

            <button className="filter-button">Filter</button>
          </div>

          {/* Add Loan Button */}
          <button
            onClick={() => navigate("/add-loan")}
            className="add-loan-button"
          >
            ➕ Add Loan
          </button>

          {/* Loan Table */}
          <div className="table-container">
            <table className="loan-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  {allColumns
                    .filter((column) => selectedColumns.includes(column.key))
                    .map((column) => (
                      <th key={column.key}>{column.label}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan._id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    {allColumns
                      .filter((column) => selectedColumns.includes(column.key))
                      .map((column) => (
                        <td key={column.key}>{loan[column.key]}</td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
