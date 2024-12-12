import React from "react";
import { Form } from "react-bootstrap";

const PropertyProfile = ({ formData, handleChange }) => {
  return (
    <div>
      <h3>Property Profile</h3>
      <Form.Group controlId="bedrooms">
        <Form.Label>Bedrooms</Form.Label>
        <Form.Control
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="bathrooms">
        <Form.Label>Bathrooms</Form.Label>
        <Form.Control
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="balconies">
        <Form.Label>Balconies</Form.Label>
        <Form.Control
          type="number"
          name="balconies"
          value={formData.balconies}
          onChange={handleChange}
        />
      </Form.Group>
    </div>
  );
};

export default PropertyProfile;

// import React from "react";

// const PropertyProfile = ({ formData, handleChange }) => {
//   return (
//     <>
//       <h3>Property Profile</h3>
//       <label>
//         Bedrooms:
//         <input
//           type="number"
//           name="bedrooms"
//           value={formData.bedrooms}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         Bathrooms:
//         <input
//           type="number"
//           name="bathrooms"
//           value={formData.bathrooms}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         Balconies:
//         <input
//           type="number"
//           name="balconies"
//           value={formData.balconies}
//           onChange={handleChange}
//         />
//       </label>
//     </>
//   );
// };

// export default PropertyProfile;
