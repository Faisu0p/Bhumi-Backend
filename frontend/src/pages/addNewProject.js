import React, { useState, useEffect } from "react";
import { createProject } from "../apis/propertyApi"; // Assuming you have the API functions in api.js file
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import ViewProperties from "../components/ProjectList"; // Adjust the path as needed
import { getAllBuilders } from "../apis/builderApi";

const CreatePropertyForm = () => {
  const [formData, setFormData] = useState({
    city: "Mumbai",
    locality: "Andheri",
    sublocality: "West",
    builderName: "XYZ Builders",
    projectName: "Skyline Heights",
    companyName: "XYZ Group",
    launchDate: "2024-01-15",
    shortCode: "SH123",
    deliveryStatus: "Ongoing",
    deliveryDate: "2026-12-31",
    reraNumber: "RERA12345",
    totalTowers: 5,
    totalFlats: 250,
    towerPhaseWise: "Yes",
    constructionType: "Residential",
    propertyCategory: "Luxury",
    propertyType: "Apartments",
    sectorBriefing: "Prime location with premium amenities.",
    projectBriefing: "A modern residential complex with all facilities.",
    masterLayoutPlan: {
      layoutUrl: "https://example.com/master-plan.pdf",
      description: "Detailed master layout plan.",
    },
    mediaUrls: [
      {
        type: "image",
        url: "https://example.com/image1.jpg",
        caption: "Project front view",
      },
      {
        type: "video",
        url: "https://example.com/video1.mp4",
        caption: "Walkthrough video",
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        reraNumber: "RERA-PH1",
        status: "Completed",
        deliveryDate: "2023-12-31",
      },
    ],
    bedrooms: [
      {
        size: "2BHK",
        superArea: 1200,
        builtUpArea: 1000,
        carpetArea: 900,
        toilets: 2,
        balconies: 1,
        servantQuarters: 0,
        studyRoom: 0,
        poojaRoom: 1,
        pricePerSqft: 12000,
        priceRangeMin: 10000000,
        priceRangeMax: 12000000,
      },
    ],
  });

  const [responseMessage, setResponseMessage] = useState({
    message: "",
    type: "",
  });

  // Add a phase dynamically
  const addPhase = () => {
    setFormData({
      ...formData,
      phases: [
        ...formData.phases,
        {
          phaseNumber: formData.phases.length + 1,
          reraNumber: "",
          status: "Ongoing",
          deliveryDate: "",
        },
      ],
    });
  };

  // Remove a phase
  const removePhase = (index) => {
    const updatedPhases = formData.phases.filter((_, i) => i !== index);
    setFormData({ ...formData, phases: updatedPhases });
  };

  // Add a bedroom entry
  const addBedroom = () => {
    setFormData({
      ...formData,
      bedrooms: [
        ...formData.bedrooms,
        {
          size: "2BHK",
          superArea: 1200,
          builtUpArea: 1000,
          carpetArea: 900,
          toilets: 2,
          balconies: 1,
          servantQuarters: 0,
          studyRoom: 0,
          poojaRoom: 1,
          pricePerSqft: 12000,
          priceRangeMin: 10000000,
          priceRangeMax: 12000000,
        },
      ],
    });
  };

  // Remove a bedroom entry
  const removeBedroom = (index) => {
    const updatedBedrooms = formData.bedrooms.filter((_, i) => i !== index);
    setFormData({ ...formData, bedrooms: updatedBedrooms });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdProject = await createProject(formData);
      console.log("Project created successfully:", createdProject);
      setResponseMessage({
        message: "Project created successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error creating project:", error);
      setResponseMessage({
        message: "Error creating project. Please try again.",
        type: "error",
      });
    }
  };

  // Function to add a new media entry
  const addMedia = () => {
    setFormData({
      ...formData,
      media: [...(formData.media || []), { type: "", url: "", caption: "" }],
    });
  };

  // Function to remove a media entry by index
  const removeMedia = (index) => {
    const updatedMedia = formData.media?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, media: updatedMedia });
  };

  const [builders, setBuilders] = useState([]);

  useEffect(() => {
    const fetchbuilders = async () => {
      const builderdata = await getAllBuilders();
      console.log(builderdata);
      setBuilders(builderdata);
    };

    fetchbuilders();
  }, []);

  // Handle the builder name change from the dropdown
  const handleBuilderNameChange = (e) => {
    setFormData({ ...formData, builderName: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h1>Welcome to the Property Management System</h1>
      <ViewProperties />
      <h2>Add new project</h2>
      {responseMessage.message && (
        <div
          className={`alert ${
            responseMessage.type === "success"
              ? "alert-success"
              : "alert-danger"
          }`}
          role="alert"
        >
          {responseMessage.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* General Information Fields */}
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.projectName}
            onChange={(e) =>
              setFormData({ ...formData, projectName: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Builder Name</label>
          <select
            className="form-control"
            value={formData.builderName}
            onChange={handleBuilderNameChange}
            required
          >
            <option value="">Select Builder</option>
            {builders.map((builder, index) => (
              <option key={index} value={builder.id}>
                {builder.builderCompleteName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Launch Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.launchDate}
            onChange={(e) =>
              setFormData({ ...formData, launchDate: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Locality</label>
          <input
            type="text"
            className="form-control"
            value={formData.locality}
            onChange={(e) =>
              setFormData({ ...formData, locality: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">SubLocality/Society</label>
          <input
            type="text"
            className="form-control"
            value={formData.sublocality}
            onChange={(e) =>
              setFormData({ ...formData, sublocality: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Short Code</label>
          <input
            type="text"
            className="form-control"
            value={formData.shortCode}
            onChange={(e) =>
              setFormData({ ...formData, shortCode: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Delivery status</label>
          <input
            type="text"
            className="form-control"
            value={formData.deliveryStatus}
            onChange={(e) =>
              setFormData({ ...formData, deliveryStatus: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Delivery Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.deliveryDate}
            onChange={(e) =>
              setFormData({ ...formData, deliveryDate: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rera Number</label>
          <input
            type="text"
            className="form-control"
            value={formData.reraNumber}
            onChange={(e) =>
              setFormData({ ...formData, reraNumber: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total towers</label>
          <input
            type="number"
            className="form-control"
            value={formData.totalTowers}
            onChange={(e) =>
              setFormData({ ...formData, totalTowers: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Flats</label>
          <input
            type="number"
            className="form-control"
            value={formData.totalFlats}
            onChange={(e) =>
              setFormData({ ...formData, totalFlats: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tower phase wise</label>
          <input
            type="text"
            className="form-control"
            value={formData.towerPhaseWise}
            onChange={(e) =>
              setFormData({ ...formData, towerPhaseWise: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Construction Type</label>
          <input
            type="text"
            className="form-control"
            value={formData.constructionType}
            onChange={(e) =>
              setFormData({ ...formData, constructionType: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Property Category</label>
          <input
            type="text"
            className="form-control"
            value={formData.propertyCategory}
            onChange={(e) =>
              setFormData({ ...formData, propertyCategory: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Property Type</label>
          <input
            type="text"
            className="form-control"
            value={formData.propertyType}
            onChange={(e) =>
              setFormData({ ...formData, propertyType: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sector Briefing</label>
          <input
            type="text"
            className="form-control"
            value={formData.sectorBriefing}
            onChange={(e) =>
              setFormData({ ...formData, sectorBriefing: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Project Briefing</label>
          <input
            type="text"
            className="form-control"
            value={formData.projectBriefing}
            onChange={(e) =>
              setFormData({ ...formData, projectBriefing: e.target.value })
            }
          />
        </div>

        {/* Phases Section */}
        <div className="mb-3">
          <label className="form-label">Phases</label>
          {formData.phases.map((phase, index) => (
            <div key={index} className="mb-3 border p-3">
              <div className="mb-2">
                <label className="form-label">Phase Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={phase.phaseNumber}
                  onChange={(e) => {
                    const updatedPhases = [...formData.phases];
                    updatedPhases[index].phaseNumber = e.target.value;
                    setFormData({ ...formData, phases: updatedPhases });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">RERA Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={phase.reraNumber}
                  onChange={(e) => {
                    const updatedPhases = [...formData.phases];
                    updatedPhases[index].reraNumber = e.target.value;
                    setFormData({ ...formData, phases: updatedPhases });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  className="form-control"
                  value={phase.status}
                  onChange={(e) => {
                    const updatedPhases = [...formData.phases];
                    updatedPhases[index].status = e.target.value;
                    setFormData({ ...formData, phases: updatedPhases });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={phase.deliveryDate}
                  onChange={(e) => {
                    const updatedPhases = [...formData.phases];
                    updatedPhases[index].deliveryDate = e.target.value;
                    setFormData({ ...formData, phases: updatedPhases });
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removePhase(index)}
              >
                Remove Phase
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={addPhase}>
            Add Phase
          </button>
        </div>

        {/* Bedrooms Section */}
        <div className="mb-3">
          <label className="form-label">Bedrooms</label>
          {formData.bedrooms.map((bedroom, index) => (
            <div key={index} className="mb-3 border p-3">
              <div className="mb-2">
                <label className="form-label">Bedroom Size</label>
                <input
                  type="text"
                  className="form-control"
                  value={bedroom.size}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].size = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">SuperArea </label>
                <input
                  type="number"
                  className="form-control"
                  value={bedroom.superArea}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].superArea = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Built-up Area</label>
                <input
                  type="number"
                  className="form-control"
                  value={bedroom.builtUpArea}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].builtUpArea = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Carpet Area</label>
                <input
                  type="number"
                  className="form-control"
                  value={bedroom.carpetArea}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].carpetArea = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Baths</label>
                <input
                  type="number"
                  className="form-control"
                  value={bedroom.toilets}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].toilets = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Balconies</label>
                <input
                  type="number"
                  className="form-control"
                  value={bedroom.balconies}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].balconies = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Servant Quarters</label>
                <input
                  type="number"
                  className="form-control"
                  value={bedroom.servantQuarters}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].servantQuarters = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Study Room</label>
                <input
                  type="number"
                  className="form-control"
                  value={bedroom.studyRoom}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].studyRoom = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Pooja Room</label>
                <input
                  type="number"
                  className="form-control"
                  value={bedroom.poojaRoom}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].poojaRoom = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Price per sq/ft</label>
                <input
                  type="number"
                  className="form-control"
                  value={bedroom.pricePerSqft}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].pricePerSqft = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Price range (Min)</label>
                <input
                  type="number"
                  className="form-control"
                  value={bedroom.priceRangeMin}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].priceRangeMin = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Price range (Max)</label>
                <input
                  type="number"
                  className="form-control"
                  value={bedroom.priceRangeMax}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].priceRangeMax = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeBedroom(index)}
              >
                Remove Bedroom
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={addBedroom}
          >
            Add Bedroom
          </button>
        </div>
        {/* Media Section */}
        <div className="mb-3">
          <label className="form-label">Media</label>
          {formData.media?.map((mediaItem, index) => (
            <div key={index} className="mb-3 border p-3">
              <div className="mb-2">
                <label className="form-label">Type</label>
                <input
                  type="file"
                  className="form-control"
                  value={mediaItem.type || ""}
                  onChange={(e) => {
                    const updatedMedia = [...formData.media];
                    updatedMedia[index].type = e.target.value;
                    setFormData({ ...formData, media: updatedMedia });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={mediaItem.url || ""}
                  onChange={(e) => {
                    const updatedMedia = [...formData.media];
                    updatedMedia[index].url = e.target.value;
                    setFormData({ ...formData, media: updatedMedia });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Caption</label>
                <input
                  type="text"
                  className="form-control"
                  value={mediaItem.caption || ""}
                  onChange={(e) => {
                    const updatedMedia = [...formData.media];
                    updatedMedia[index].caption = e.target.value;
                    setFormData({ ...formData, media: updatedMedia });
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeMedia(index)}
              >
                Remove Media
              </button>
            </div>
          )) || []}
          <button type="button" className="btn btn-primary" onClick={addMedia}>
            Add Media
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePropertyForm;
