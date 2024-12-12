import React from "react";
import { Form } from "react-bootstrap";

const LocationDetails = ({ formData, handleChange }) => {
  return (
    <div>
      <h3>Location Details</h3>
      <Form.Group controlId="address">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="state">
        <Form.Label>Locality</Form.Label>
        <Form.Control
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="pincode">
        <Form.Label>Sub Locality/Society</Form.Label>
        <Form.Control
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
      </Form.Group>
    </div>
  );
};

export default LocationDetails;

// import React from "react";

// const LocationDetails = ({ formData, handleChange }) => {
//   return (
//     <>
//       <h3>Location Details</h3>
//       <label>
//         Address:
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         City:
//         <input
//           type="text"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         State:
//         <input
//           type="text"
//           name="state"
//           value={formData.state}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         Pincode:
//         <input
//           type="text"
//           name="pincode"
//           value={formData.pincode}
//           onChange={handleChange}
//         />
//       </label>
//     </>
//   );
// };

// export default LocationDetails;
