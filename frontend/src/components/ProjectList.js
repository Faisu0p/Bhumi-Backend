import React, { useState, useEffect } from "react";
import { getAllProjects } from "../apis/propertyApi"; // Import the API function
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ViewProperties = () => {
  const [properties, setProperties] = useState([]); // State to store properties
  const [selectedProperty, setSelectedProperty] = useState(null); // State to store the selected property details

  // Fetch all properties when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getAllProjects();
        if (response && response.success) {
          setProperties(response.data); // Assuming the response has a 'data' field
        } else {
          console.error("Error: Invalid response data");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Handle click event to show more details of a property
  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="container mt-5">
      <h2>View All Properties</h2>

      {/* Display selected property details if any */}
      {selectedProperty && (
        <div className="mb-4">
          <h4>Property Details</h4>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{selectedProperty.projectName}</h5>
              <p>
                <strong>Builder Name:</strong> {selectedProperty.builderName}
              </p>
              <p>
                <strong>Location:</strong> {selectedProperty.locality},{" "}
                {selectedProperty.city}
              </p>
              <p>
                <strong>Launch Date:</strong> {selectedProperty.launchDate}
              </p>
              <p>
                <strong>Price Range:</strong> ₹{selectedProperty.priceRangeMin}{" "}
                - ₹{selectedProperty.priceRangeMax}
              </p>
              <p>
                <strong>Status:</strong> {selectedProperty.status}
              </p>
              <p>
                <strong>Short Code:</strong> {selectedProperty.shortCode}
              </p>
              {/* Add more fields here as necessary */}
            </div>
          </div>
        </div>
      )}

      {/* Display properties in a grid layout */}
      {/* Display properties in a grid layout */}
      <div className="row">
        {Array.isArray(properties) && properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="col-md-4 mb-4">
              <div
                className="card h-100"
                onMouseEnter={() => setSelectedProperty(property)} // Show details on hover
                onClick={() => handlePropertyClick(property)} // Show details on click
              >
                <img
                  src={
                    property.imageUrl ||
                    "https://via.placeholder.com/300x200?text=Property+Image"
                  }
                  className="card-img-top"
                  alt={property.projectName}
                />
                <div className="card-body">
                  <h5 className="card-title">{property.projectName}</h5>
                  <p className="card-text">Builder: {property.builderName}</p>
                  <p className="card-text">
                    Location: {property.locality}, {property.city}
                  </p>
                  <p className="card-text">
                    Launch Date: {property.launchDate}
                  </p>
                  <p className="card-text">
                    Price Range: ₹{property.priceRangeMin} - ₹
                    {property.priceRangeMax}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No properties available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewProperties;
