import React, { useState, useEffect } from "react";
import { getAllBuilders } from "../apis/builderApi";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewBuilders = () => {
  const [builders, setBuilders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuilders = async () => {
      try {
        const data = await getAllBuilders();
        console.log(data); // Debugging API response
        setBuilders(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchBuilders();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5">
        Error fetching builders: {error}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">All Builders</h1>
      {builders.length === 0 ? (
        <div className="alert alert-warning text-center">
          No builders found.
        </div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>City</th>
              <th>Full Name</th>
              <th>Short Name</th>
              <th>Logo</th>
              <th>Years in Real Estate</th>
              <th>Description</th>
              <th>Projects</th>
            </tr>
          </thead>
          <tbody>
            {builders.map((builder) => (
              <tr key={builder.id}>
                <td>{builder.id}</td>
                <td>{builder.city}</td>
                <td>{builder.builderCompleteName}</td>
                <td>{builder.builderShortName}</td>
                <td>
                  {builder.builderLogo ? (
                    <img
                      src={builder.builderLogo}
                      alt={`${builder.builderShortName} logo`}
                      className="img-thumbnail"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    "No Logo"
                  )}
                </td>
                <td>{builder.yearsInRealEstate}</td>
                <td>{builder.shortDescription}</td>
                <td>
                  {Array.isArray(builder.listOfProjects)
                    ? builder.listOfProjects.join(", ")
                    : builder.listOfProjects || "No Projects"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewBuilders;
