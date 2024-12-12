import React from "react";
import { Form } from "react-bootstrap";

const Media = ({ formData, handleFileChange, handleChange }) => {
  return (
    <div>
      <h3>Photos, Video, and Voice Over</h3>
      <Form.Group controlId="photos">
        <Form.Label>Photos</Form.Label>
        <Form.Control
          type="file"
          name="photos"
          multiple
          onChange={handleFileChange}
        />
      </Form.Group>

      <Form.Group controlId="video">
        <Form.Label>Video</Form.Label>
        <Form.Control
          type="text"
          name="video"
          value={formData.video}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="voiceOver">
        <Form.Label>Voice Over</Form.Label>
        <Form.Control
          type="text"
          name="voiceOver"
          value={formData.voiceOver}
          onChange={handleChange}
        />
      </Form.Group>
    </div>
  );
};

export default Media;

// import React from "react";

// const Media = ({ formData, handleFileChange, handleChange }) => {
//   return (
//     <>
//       <h3>Photos, Video, and Voice Over</h3>
//       <label>
//         Photos:
//         <input type="file" name="photos" multiple onChange={handleFileChange} />
//       </label>

//       <label>
//         Video:
//         <input
//           type="text"
//           name="video"
//           value={formData.video}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         Voice Over:
//         <input
//           type="text"
//           name="voiceOver"
//           value={formData.voiceOver}
//           onChange={handleChange}
//         />
//       </label>
//     </>
//   );
// };

// export default Media;
