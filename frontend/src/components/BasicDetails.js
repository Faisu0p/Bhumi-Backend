import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BasicDetails = ({ formData, handleChange }) => {
  const [selectedOption, setSelectedOption] = useState(
    formData.transactionType || ""
  );
  const [selectedFileOption, setSelectedFileOption] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState(
    formData.propertyType || ""
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [propertyLocation, setPropertyLocation] = useState({
    city: "",
    society: "",
    sector: "",
    address: "",
  });

  const selectOption = (option) => {
    setSelectedOption(option);
    handleChange({ target: { name: "transactionType", value: option } });
  };

  const toggleSelection = (option) => {
    const updatedSelection = selectedFileOption.includes(option)
      ? selectedFileOption.filter((item) => item !== option)
      : [...selectedFileOption, option];
    setSelectedFileOption(updatedSelection);
  };

  const toggleCategoryOptions = (event) => {
    const propertyType = event.target.value;
    setSelectedPropertyType(propertyType);
    handleChange({ target: { name: "propertyType", value: propertyType } });
  };

  const selectCategory = (category) => setSelectedCategory(category);

  const handleLocationChange = (field, value) => {
    setPropertyLocation((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h2>Welcome Admin!</h2>
      <p>Let's start with the basics</p>

      {/* Transaction Type */}
      <div className="options-group">
        <p>You want to *</p>
        <button
          className={`option-btn ${
            selectedOption === "Sell" ? "selected" : ""
          }`}
          onClick={() => selectOption("Sell")}
        >
          Sell
        </button>
        <button
          className={`option-btn ${
            selectedOption === "Rent/Lease" ? "selected" : ""
          }`}
          onClick={() => selectOption("Rent/Lease")}
        >
          Rent/Lease
        </button>
        <button
          className={`option-btn ${
            selectedOption === "PG/Sharing" ? "selected" : ""
          }`}
          onClick={() => selectOption("PG/Sharing")}
        >
          PG/Sharing
        </button>
      </div>

      {/* File/Mandate Options */}
      <div className="options-group">
        <p>Is it an investor file/mandate deal? (Optional)</p>
        <button
          className={`option-btn ${
            selectedFileOption.includes("File in hand") ? "selected" : ""
          }`}
          onClick={() => toggleSelection("File in hand")}
        >
          File in hand
        </button>
        <button
          className={`option-btn ${
            selectedFileOption.includes("Exchange") ? "selected" : ""
          }`}
          onClick={() => toggleSelection("Exchange")}
        >
          Exchange
        </button>
      </div>

      {/* Property Type */}
      <div className="options-group">
        <p>Property Type</p>
        <label>
          <input
            type="radio"
            name="property-type"
            value="Residential"
            checked={selectedPropertyType === "Residential"}
            onChange={toggleCategoryOptions}
          />
          Residential
        </label>
        <label>
          <input
            type="radio"
            name="property-type"
            value="Commercial"
            checked={selectedPropertyType === "Commercial"}
            onChange={toggleCategoryOptions}
          />
          Commercial
        </label>
      </div>

      {/* Category Options */}
      {selectedPropertyType && (
        <div
          className={`category-options ${selectedPropertyType.toLowerCase()}`}
        >
          <p>Category</p>
          {(selectedPropertyType === "Residential"
            ? [
                "Apartment Flat",
                "Pent House",
                "House/Kothi",
                "Independent Villa",
                "Plot",
                "Builder Independent Floor",
                "Farmhouse",
                "Studio/1RK",
                "Laal Doora",
                "Service Apartment",
                "Others",
              ]
            : [
                "Apartment/Flat",
                "Retail",
                "Storage",
                "Industry",
                "Warehouse",
                "Hospitality",
                "Others",
              ]
          ).map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "selected" : ""
              }`}
              onClick={() => selectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BasicDetails;
