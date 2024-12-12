import React, { useState, useEffect } from "react";
import { getAllProjects } from "../apis/propertyApi"; // Import the API function
import "./ProjectView.css"; // Import custom CSS for styling

const ProjectView = () => {
  const [properties, setProperties] = useState([]); // State to store properties
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch all properties when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getAllProjects(); // Fetch data from API
        setProperties(response); // Set the properties to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Error fetching properties"); // Handle error
        setLoading(false); // Set loading to false on error
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="project-view-container">
      <h2 className="title">All Properties</h2>
      <div className="properties-grid">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <div className="property-card" key={index}>
              <img
                src={property.masterLayoutPlan} // Assuming masterLayoutPlan is the image URL
                alt={`${property.projectName} Image`}
                className="property-image"
              />
              <div className="property-info">
                <h3 className="property-name">{property.projectName}</h3>
                <p>
                  <strong>Builder Name:</strong> {property.builderName}
                </p>
                <p>
                  <strong>City:</strong> {property.city}
                </p>
                <p>
                  <strong>Locality:</strong> {property.locality}
                </p>
                <p>
                  <strong>Sublocality:</strong> {property.sublocality}
                </p>
                <p>
                  <strong>Launch Date:</strong>{" "}
                  {new Date(property.launchDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Short Code:</strong> {property.shortCode}
                </p>
                <p>
                  <strong>Delivery Status:</strong> {property.deliveryStatus}
                </p>
                <p>
                  <strong>Image URL:</strong>{" "}
                  <a
                    href={property.masterLayoutPlan}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {property.masterLayoutPlan}
                  </a>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectView;

// import React, { useState, useEffect } from "react";
// import { getAllProjects } from "../apis/propertyApi"; // Import the API function

// const ProjectView = () => {
//   const [properties, setProperties] = useState([]); // State to store properties
//   const [loading, setLoading] = useState(true); // To track loading state
//   const [error, setError] = useState(null); // For error handling

//   // Fetch all properties when the component mounts
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await getAllProjects(); // Fetch data from API
//         setProperties(response); // Set the properties to state
//         setLoading(false); // Set loading to false once data is fetched
//       } catch (err) {
//         setError("Error fetching properties"); // Handle error
//         setLoading(false); // Set loading to false on error
//       }
//     };

//     fetchProperties();
//   }, []);

//   if (loading) {
//     return <p>Loading properties...</p>; // Loading message
//   }

//   if (error) {
//     return <p>{error}</p>; // Error message
//   }

//   return (
//     <div className="project-view-container">
//       <h2>All Properties</h2>
//       {properties.length > 0 ? (
//         <table className="properties-table">
//           <thead>
//             <tr>
//               <th>Project Name</th>
//               <th>Builder Name</th>
//               <th>City</th>
//               <th>Locality</th>
//               <th>Sublocality</th>
//               <th>Launch Date</th>
//               <th>Short Code</th>
//               <th>Delivery Status</th>
//               <th>Image Url</th>
//             </tr>
//           </thead>
//           <tbody>
//             {properties.map((property, index) => (
//               <tr key={index}>
//                 <td>{property.projectName}</td>
//                 <td>{property.builderName}</td>
//                 <td>{property.city}</td>
//                 <td>{property.locality}</td>
//                 <td>{property.sublocality}</td>
//                 <td>{property.launchDate}</td>
//                 <td>{property.shortCode}</td>
//                 <td>{property.masterLayoutPlan}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No properties found.</p>
//       )}
//     </div>
//   );
// };

// export default ProjectView;
