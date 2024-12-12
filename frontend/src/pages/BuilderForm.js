import React, { useState } from "react";
import { createBuilder } from "../apis/builderApi"; // Import the API function
import MediaSection from "../components/MediaSection";

const BuilderForm = () => {
  const [formData, setFormData] = useState({
    city: "",
    builderCompleteName: "",
    builderShortName: "",
    builderLogo: null,
    yearsInRealEstate: 0,
    shortDescription: "",
    listOfProjects: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); // Handle file uploads
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Math.max(0, Number(value)) }); // Prevent negative values
  };

  // Function to update builderLogo with the uploaded image URL
  const updatebuilderLogo = (url) => {
    setFormData({ ...formData, builderLogo: url });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Create a new builder by calling the API function
  //     console.log("Builder Data Submitted:", response);
  //     const response = await createBuilder(formData);
  //     alert("Builder information submitted successfully!");

  //     // Reset form data after successful submission
  //     setFormData({
  //       city: "",
  //       builderCompleteName: "",
  //       builderShortName: "",
  //       builderLogo: null,
  //       yearsInRealEstate: 0,
  //       shortDescription: "",
  //       listOfProjects: "",
  //     });
  //   } catch (error) {
  //     console.error("Error submitting builder data:", error);
  //     alert("There was an error submitting the builder information.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure builderLogo is a string, not an array
    const updatedFormData = {
      ...formData,
      builderLogo: Array.isArray(formData.builderLogo)
        ? formData.builderLogo[0]
        : formData.builderLogo,
    };

    try {
      console.log("Form data before submission:", updatedFormData);
      const response = await createBuilder(updatedFormData);
      console.log("Builder Data Submitted:", response);
      alert("Builder information submitted successfully!");

      // Reset form data after successful submission
      setFormData({
        city: "",
        builderCompleteName: "",
        builderShortName: "",
        builderLogo: null,
        yearsInRealEstate: 0,
        shortDescription: "",
        listOfProjects: "",
      });
    } catch (error) {
      console.error("Error submitting builder data:", error);
      alert("There was an error submitting the builder information.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}
    >
      <div
        className="card shadow p-4 w-100"
        style={{ maxWidth: "500px", overflowY: "auto" }}
      >
        <h2 className="text-center mb-4">Builder Information Form</h2>
        <form onSubmit={handleSubmit}>
          {/* City Input */}
          <div className="mb-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          {/* Builder Complete Name Input */}
          <div className="mb-3">
            <input
              type="text"
              name="builderCompleteName"
              placeholder="Builder Complete Name"
              value={formData.builderCompleteName}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          {/* Builder Short Name Input */}
          <div className="mb-3">
            <input
              type="text"
              name="builderShortName"
              placeholder="Builder's Nick/Short Name"
              value={formData.builderShortName}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          {/* Media Section for uploading image */}
          <div className="mb-3">
            <label htmlFor="masterLayoutPlan" className="form-label">
              Upload Media:
            </label>
            <MediaSection updateMasterLayoutPlan={updatebuilderLogo} />
          </div>

          {/* Builder Logo Input */}
          <div className="mb-3">
            <label htmlFor="builderLogo" className="form-label">
              Upload Builder Logo URL:
            </label>
            <input
              type="text"
              id="builderLogo"
              name="builderLogo"
              value={formData.builderLogo}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Years in Real Estate */}
          {/* <div className="mb-3">
            <input
              type="number"
              name="yearsInRealEstate"
              placeholder="No. of Years in Real Estate"
              value={formData.yearsInRealEstate}
              onChange={handleNumberChange}
              required
              // min="0" // Enforces no negative values
              className="form-control"
            />
          </div> */}

          <div className="input-group">
            <input
              type="number"
              id="yearsInRealEstate"
              name="yearsInRealEstate"
              placeholder="Enter the number of years"
              value={formData.yearsInRealEstate}
              onChange={handleNumberChange}
              required
              min="0" // Enforces no negative values
              className="form-control"
            />
            <span className="input-group-text">Years</span>
          </div>

          {/* Short Description */}
          <div className="mb-3">
            <textarea
              name="shortDescription"
              placeholder="Short Description"
              value={formData.shortDescription}
              onChange={handleChange}
              rows="3"
              className="form-control"
            />
          </div>

          {/* List of Projects */}
          <div className="mb-3">
            <textarea
              name="listOfProjects"
              placeholder="List of Projects (comma-separated)"
              value={formData.listOfProjects}
              onChange={handleChange}
              rows="3"
              className="form-control"
            />
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuilderForm;

// import React, { useState } from "react";
// import { createBuilder } from "../apis/builderApi"; // Import the API function
// import MediaSection from "../components/MediaSection";

// const BuilderForm = () => {
//   const [formData, setFormData] = useState({
//     city: "",
//     builderCompleteName: "",
//     builderShortName: "",
//     builderLogo: null,
//     yearsInRealEstate: 0,
//     shortDescription: "",
//     listOfProjects: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       setFormData({ ...formData, [name]: files[0] }); // Handle file uploads
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleNumberChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: Math.max(0, Number(value)) }); // Prevent negative values
//   };

//   // Function to update builderLogo with the uploaded image URL
//   const updatebuilderLogo = (url) => {
//     setFormData({ ...formData, builderLogo: url });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Create a new builder by calling the API function
//       const response = await createBuilder(formData);
//       console.log("Builder Data Submitted:", response);
//       alert("Builder information submitted successfully!");

//       // Reset form data after successful submission
//       setFormData({
//         city: "",
//         builderCompleteName: "",
//         builderShortName: "",
//         builderLogo: null,
//         yearsInRealEstate: 0,
//         shortDescription: "",
//         listOfProjects: "",
//       });
//     } catch (error) {
//       console.error("Error submitting builder data:", error);
//       alert("There was an error submitting the builder information.");
//     }
//   };

//   return (
//     <div
//       className="container d-flex justify-content-center align-items-center"
//       style={{ height: "100vh", backgroundColor: "#f9f9f9" }}
//     >
//       <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
//         <h2 className="text-center mb-4">Builder Information Form</h2>
//         <form onSubmit={handleSubmit}>
//           {/* City Input */}
//           <div className="mb-3">
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleChange}
//               required
//               className="form-control"
//             />
//           </div>

//           {/* Builder Complete Name Input */}
//           <div className="mb-3">
//             <input
//               type="text"
//               name="builderCompleteName"
//               placeholder="Builder Complete Name"
//               value={formData.builderCompleteName}
//               onChange={handleChange}
//               required
//               className="form-control"
//             />
//           </div>

//           {/* Builder Short Name Input */}
//           <div className="mb-3">
//             <input
//               type="text"
//               name="builderShortName"
//               placeholder="Builder's Nick/Short Name"
//               value={formData.builderShortName}
//               onChange={handleChange}
//               required
//               className="form-control"
//             />
//           </div>

//           {/* Media Section for uploading image */}
//           <div className="mb-3">
//             <label htmlFor="masterLayoutPlan" className="form-label">
//               Upload Media:
//             </label>
//             <MediaSection updateMasterLayoutPlan={updatebuilderLogo} />
//           </div>

//           {/* Builder Logo Input */}
//           <div className="mb-3">
//             <label htmlFor="builderLogo" className="form-label">
//               Upload Builder Logo URL:
//             </label>
//             <input
//               type="text"
//               id="builderLogo"
//               name="builderLogo"
//               value={formData.builderLogo}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>

//           {/* Years in Real Estate */}
//           <div className="mb-3">
//             <input
//               type="number"
//               name="yearsInRealEstate"
//               placeholder="No. of Years in Real Estate"
//               value={formData.yearsInRealEstate}
//               onChange={handleNumberChange}
//               required
//               min="0" // Enforces no negative values
//               className="form-control"
//             />
//           </div>

//           {/* Short Description */}
//           <div className="mb-3">
//             <textarea
//               name="shortDescription"
//               placeholder="Short Description"
//               value={formData.shortDescription}
//               onChange={handleChange}
//               rows="3"
//               className="form-control"
//             />
//           </div>

//           {/* List of Projects */}
//           <div className="mb-3">
//             <textarea
//               name="listOfProjects"
//               placeholder="List of Projects (comma-separated)"
//               value={formData.listOfProjects}
//               onChange={handleChange}
//               rows="3"
//               className="form-control"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="d-flex justify-content-center">
//             <button type="submit" className="btn btn-primary w-100">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BuilderForm;

// // import React, { useState } from "react";
// // import { createBuilder } from "../apis/builderApi"; // Import the API function
// // import MediaSection from "../components/MediaSection";

// // const BuilderForm = () => {
// //   const [formData, setFormData] = useState({
// //     city: "",
// //     builderCompleteName: "",
// //     builderShortName: "",
// //     builderLogo: null,
// //     yearsInRealEstate: 0,
// //     shortDescription: "",
// //     listOfProjects: "",
// //   });

// //   const handleChange = (e) => {
// //     const { name, value, type, files } = e.target;
// //     if (type === "file") {
// //       setFormData({ ...formData, [name]: files[0] }); // Handle file uploads
// //     } else {
// //       setFormData({ ...formData, [name]: value });
// //     }
// //   };

// //   const handleNumberChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: Math.max(0, Number(value)) }); // Prevent negative values
// //   };

// //   // Function to update masterLayoutPlan with the uploaded image URL
// //   const updatebuilderLogo = (url) => {
// //     setFormData({ ...formData, builderLogo: url });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Create a new builder by calling the API function
// //       const response = await createBuilder(formData);
// //       console.log("Builder Data Submitted:", response);
// //       alert("Builder information submitted successfully!");

// //       // Reset form data after successful submission
// //       setFormData({
// //         city: "",
// //         builderCompleteName: "",
// //         builderShortName: "",
// //         builderLogo: null,
// //         yearsInRealEstate: 0,
// //         shortDescription: "",
// //         listOfProjects: "",
// //       });
// //     } catch (error) {
// //       console.error("Error submitting builder data:", error);
// //       alert("There was an error submitting the builder information.");
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         height: "100vh",
// //         backgroundColor: "#f9f9f9",
// //       }}
// //     >
// //       <h2 style={{ marginBottom: "20px" }}>Builder Information Form</h2>
// //       <form
// //         onSubmit={handleSubmit}
// //         style={{
// //           display: "flex",
// //           flexDirection: "column",
// //           width: "300px",
// //           gap: "15px",
// //         }}
// //       >
// //         <input
// //           type="text"
// //           name="city"
// //           placeholder="City"
// //           value={formData.city}
// //           onChange={handleChange}
// //           required
// //           style={inputStyle}
// //         />
// //         <input
// //           type="text"
// //           name="builderCompleteName"
// //           placeholder="Builder Complete Name"
// //           value={formData.builderCompleteName}
// //           onChange={handleChange}
// //           required
// //           style={inputStyle}
// //         />
// //         <input
// //           type="text"
// //           name="builderShortName"
// //           placeholder="Builder's Nick/Short Name"
// //           value={formData.builderShortName}
// //           onChange={handleChange}
// //           required
// //           style={inputStyle}
// //         />
// //         {/* Media Section for uploading image */}
// //         <div className="form-group">
// //           <label htmlFor="masterLayoutPlan">Upload Media:</label>
// //           <MediaSection updateMasterLayoutPlan={updatebuilderLogo} />
// //         </div>
// //         <label style={labelStyle}>
// //           Upload Builder Logo ur;:
// //           <input
// //             type="text"
// //             id="masterLayoutPlan"
// //             name="masterLayoutPlan"
// //             value={formData.builderLogo}
// //             onChange={handleChange}
// //           />
// //         </label>

// //         <input
// //           type="number"
// //           name="yearsInRealEstate"
// //           placeholder="No. of Years in Real Estate"
// //           value={formData.yearsInRealEstate}
// //           onChange={handleNumberChange}
// //           required
// //           style={inputStyle}
// //           min="0" // Enforces no negative values
// //         />
// //         <textarea
// //           name="shortDescription"
// //           placeholder="Short Description"
// //           value={formData.shortDescription}
// //           onChange={handleChange}
// //           rows="3"
// //           style={{ ...inputStyle, resize: "none" }}
// //         />
// //         <textarea
// //           name="listOfProjects"
// //           placeholder="List of Projects (comma-separated)"
// //           value={formData.listOfProjects}
// //           onChange={handleChange}
// //           rows="3"
// //           style={{ ...inputStyle, resize: "none" }}
// //         />
// //         <button type="submit" style={buttonStyle}>
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // const inputStyle = {
// //   padding: "10px",
// //   fontSize: "14px",
// //   border: "1px solid #ccc",
// //   borderRadius: "5px",
// // };

// // const inputFileStyle = {
// //   marginTop: "10px",
// //   padding: "5px",
// // };

// // const labelStyle = {
// //   fontSize: "14px",
// //   marginBottom: "10px",
// // };

// // const buttonStyle = {
// //   padding: "10px",
// //   fontSize: "16px",
// //   backgroundColor: "#007BFF",
// //   color: "#fff",
// //   border: "none",
// //   borderRadius: "5px",
// //   cursor: "pointer",
// // };

// // export default BuilderForm;
