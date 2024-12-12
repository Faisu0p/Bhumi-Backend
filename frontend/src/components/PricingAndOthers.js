import React from "react";

const PricingAndOthers = ({ formData, handleChange }) => {
  return (
    <>
      <h3>Pricing and Others</h3>
      <label>
        Price (For Sale):
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>

      <label>
        Monthly Rent (For Lease):
        <input
          type="number"
          name="monthlyRent"
          value={formData.monthlyRent}
          onChange={handleChange}
        />
      </label>
    </>
  );
};

export default PricingAndOthers;
