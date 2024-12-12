import React, { useState, useEffect } from "react";
import { createProject, updateProject } from "../apis/propertyApi.js";

const ProjectForm = ({ fetchProjects, projectToEdit = null }) => {
  const [formData, setFormData] = useState({
    city: "",
    locality: "",
    sublocality: "",
    builderName: "",
    projectName: "",
    companyName: "",
    launchDate: "",
    shortCode: "",
    deliveryStatus: "",
    deliveryDate: "",
    reraNumber: "",
    totalTowers: "",
    totalFlats: "",
    towerPhaseWise: "",
    constructionType: "",
    propertyCategory: "",
    propertyType: "",
    sectorBriefing: "",
    projectBriefing: "",
    masterLayoutPlan: [{ layoutUrl: "", description: "" }],
    phases: [{ phaseNumber: "", reraNumber: "", status: "", deliveryDate: "" }],
    bedrooms: [
      {
        size: "",
        superArea: "",
        builtUpArea: "",
        carpetArea: "",
        toilets: "",
        balconies: "",
        servantQuarters: "",
        studyRoom: "",
        poojaRoom: "",
        pricePerSqft: "",
        priceRangeMin: "",
        priceRangeMax: "",
      },
    ],
    media: [{ type: "", url: "", caption: "" }],
  });

  useEffect(() => {
    if (projectToEdit) {
      setFormData(projectToEdit);
    }
  }, [projectToEdit]);

  const handleInputChange = (e, group, index) => {
    const { name, value } = e.target;

    if (group) {
      const updatedGroup = [...formData[group]];
      updatedGroup[index][name] = value;
      setFormData({ ...formData, [group]: updatedGroup });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSection = (section, defaultValues) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], { ...defaultValues }],
    });
  };

  const handleRemoveSection = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (projectToEdit) {
        await updateProject(projectToEdit.id, formData);
      } else {
        await createProject(formData);
      }
      setFormData({
        city: "",
        locality: "",
        sublocality: "",
        builderName: "",
        projectName: "",
        companyName: "",
        launchDate: "",
        shortCode: "",
        deliveryStatus: "",
        deliveryDate: "",
        reraNumber: "",
        totalTowers: "",
        totalFlats: "",
        towerPhaseWise: "",
        constructionType: "",
        propertyCategory: "",
        propertyType: "",
        sectorBriefing: "",
        projectBriefing: "",
        masterLayoutPlan: [{ layoutUrl: "", description: "" }],
        phases: [
          { phaseNumber: "", reraNumber: "", status: "", deliveryDate: "" },
        ],
        bedrooms: [
          {
            size: "",
            superArea: "",
            builtUpArea: "",
            carpetArea: "",
            toilets: "",
            balconies: "",
            servantQuarters: "",
            studyRoom: "",
            poojaRoom: "",
            pricePerSqft: "",
            priceRangeMin: "",
            priceRangeMax: "",
          },
        ],
        media: [{ type: "", url: "", caption: "" }],
      });
      fetchProjects();
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{projectToEdit ? "Edit Project" : "Create Project"}</h2>

      {/* General Information */}
      {[
        "city",
        "locality",
        "sublocality",
        "builderName",
        "projectName",
        "companyName",
        "shortCode",
        "deliveryStatus",
        "reraNumber",
        "constructionType",
        "propertyCategory",
        "propertyType",
      ].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={formData[field]}
          placeholder={field}
          onChange={(e) => handleInputChange(e)}
          required
        />
      ))}

      <input
        type="date"
        name="launchDate"
        value={formData.launchDate}
        placeholder="Launch Date"
        onChange={(e) => handleInputChange(e)}
        required
      />

      <input
        type="date"
        name="deliveryDate"
        value={formData.deliveryDate}
        placeholder="Delivery Date"
        onChange={(e) => handleInputChange(e)}
        required
      />

      <textarea
        name="sectorBriefing"
        value={formData.sectorBriefing}
        placeholder="Sector Briefing"
        onChange={(e) => handleInputChange(e)}
      />

      <textarea
        name="projectBriefing"
        value={formData.projectBriefing}
        placeholder="Project Briefing"
        onChange={(e) => handleInputChange(e)}
      />

      {/* Dynamic Sections */}
      {["phases", "bedrooms", "media", "masterLayoutPlan"].map((section) => (
        <div key={section}>
          <h3>{section}</h3>
          {formData[section].map((item, index) => (
            <div key={index}>
              {Object.keys(item).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={item[key]}
                  placeholder={key}
                  onChange={(e) => handleInputChange(e, section, index)}
                />
              ))}
              <button
                type="button"
                onClick={() => handleRemoveSection(section, index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAddSection(
                section,
                Object.fromEntries(
                  Object.keys(formData[section][0]).map((key) => [key, ""])
                )
              )
            }
          >
            Add {section}
          </button>
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProjectForm;

// import React, { useState } from "react";
// import { createProject, updateProject } from "../apis/propertyApi.js";

// const ProjectForm = ({ fetchProjects, projectToEdit = null }) => {
//   const [formData, setFormData] = useState({
//     city: "",
//     locality: "",
//     sublocality: "",
//     builderName: "",
//     projectName: "",
//     companyName: "",
//     launchDate: "",
//     shortCode: "",
//     deliveryStatus: "",
//     deliveryDate: "",
//     reraNumber: "",
//     totalTowers: "",
//     totalFlats: "",
//     towerPhaseWise: "",
//     constructionType: "",
//     propertyCategory: "",
//     propertyType: "",
//     sectorBriefing: "",
//     projectBriefing: "",
//     masterLayoutPlan: [{ layoutUrl: "", description: "" }],
//     phases: [{ phaseNumber: "", reraNumber: "", status: "", deliveryDate: "" }],
//     bedrooms: [
//       { size: "", superArea: "", priceRangeMin: "", priceRangeMax: "" },
//     ],
//     media: [{ type: "", url: "", caption: "" }],
//   });

//   const handleInputChange = (e, group) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [group]: formData[group].map((item, index) =>
//         index === parseInt(name.split("-")[1]) ? { ...item, value } : item
//       ),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (projectToEdit) {
//         await updateProject(projectToEdit.id, formData);
//       } else {
//         await createProject(formData);
//       }
//       setFormData({
//         city: "",
//         locality: "",
//         sublocality: "",
//         builderName: "",
//         projectName: "",
//         companyName: "",
//         launchDate: "",
//         shortCode: "",
//         deliveryStatus: "",
//         deliveryDate: "",
//         reraNumber: "",
//         totalTowers: "",
//         totalFlats: "",
//         towerPhaseWise: "",
//         constructionType: "",
//         propertyCategory: "",
//         propertyType: "",
//         sectorBriefing: "",
//         projectBriefing: "",
//         masterLayoutPlan: [{ layoutUrl: "", description: "" }],
//         phases: [
//           { phaseNumber: "", reraNumber: "", status: "", deliveryDate: "" },
//         ],
//         bedrooms: [
//           { size: "", superArea: "", priceRangeMin: "", priceRangeMax: "" },
//         ],
//         media: [{ type: "", url: "", caption: "" }],
//       });
//       fetchProjects();
//     } catch (err) {
//       console.error("Error submitting form", err);
//     }
//   };

//   const handleAddSection = (section) => {
//     setFormData({
//       ...formData,
//       [section]: [...formData[section], { value: "" }],
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="city"
//         value={formData.city}
//         placeholder="City"
//         onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//         required
//       />
//       <input
//         type="text"
//         name="projectName"
//         value={formData.projectName}
//         placeholder="Project Name"
//         onChange={(e) =>
//           setFormData({ ...formData, projectName: e.target.value })
//         }
//         required
//       />
//       {/* Add all other fields as required */}
//       {/* Handle dynamic inputs for sections */}
//       <div>
//         <button type="button" onClick={() => handleAddSection("phases")}>
//           Add Phase
//         </button>
//         {formData.phases.map((phase, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               name={`phase-${index}`}
//               value={phase.phaseNumber}
//               onChange={(e) => handleInputChange(e, "phases")}
//             />
//           </div>
//         ))}
//       </div>

//       <div>
//         <button type="button" onClick={() => handleAddSection("media")}>
//           Add Media
//         </button>
//         {formData.media.map((media, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               name={`media-${index}`}
//               value={media.url}
//               onChange={(e) => handleInputChange(e, "media")}
//             />
//           </div>
//         ))}
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ProjectForm;
