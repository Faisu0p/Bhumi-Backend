import React, { useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

const BrochureSection = ({ updateMasterLayoutPlan }) => {
  const [brochures, setBrochures] = useState([]); // State to store selected brochures
  const [brochureUrls, setBrochureUrls] = useState([]); // State to store uploaded brochure URLs
  const [uploading, setUploading] = useState(false); // State to manage uploading status

  // Function to upload the brochure to Azure Blob Storage
  const uploadToAzure = async (file) => {
    const accountName = "bhoomistorage2024";
    const containerName = "bhumibrochure";
    const blobSasToken =
      "sp=racwdli&st=2024-12-05T09:46:09Z&se=2025-12-05T17:46:09Z&sv=2022-11-02&sr=c&sig=yZcrdZWb%2B9sH61M7s6tmS3%2F4SV43zBO3vY8Sh4IrqG8%3D";

    // Initialize the BlobServiceClient with the SAS token
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${blobSasToken}`
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = `brochures/${Date.now()}-${file.name}`; // Unique file name for brochure
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      // Upload the file to Azure Blob Storage
      await blockBlobClient.uploadBrowserData(file);
      const uploadedUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
      return uploadedUrl; // Return the URL of the uploaded brochure
    } catch (error) {
      console.error("Azure Upload Error:", error);
      return null; // Return null if the upload fails
    }
  };

  // Handle brochure selection (only accept PDF files)
  const handleBrochureChange = (e) => {
    const selectedBrochures = Array.from(e.target.files);

    // Check if the selected files are valid PDFs
    const validBrochures = selectedBrochures.filter(
      (file) => file.type === "application/pdf"
    );

    if (validBrochures.length > 0) {
      setBrochures(validBrochures); // Set the selected brochures
    } else {
      alert("Please upload valid PDF files.");
    }
  };

  // Handle brochure upload
  const handleUpload = async () => {
    if (brochures.length > 0) {
      setUploading(true); // Set uploading state to true

      const uploadedUrls = [];
      for (const brochure of brochures) {
        const uploadedUrl = await uploadToAzure(brochure); // Upload each brochure
        if (uploadedUrl) {
          uploadedUrls.push(uploadedUrl); // Add URL to the array if successful
        }
      }

      setBrochureUrls(uploadedUrls); // Set all uploaded brochure URLs
      updateMasterLayoutPlan(uploadedUrls); // Update the parent component with the URLs
      setUploading(false); // Set uploading state to false
    }
  };

  return (
    <section className="form-section">
      <h2>Brochures</h2>

      {/* File input for selecting brochures */}
      <div className="input-group">
        <label htmlFor="brochureUpload">Upload Brochures (PDF only)</label>
        <input
          type="file"
          id="brochureUpload"
          accept="application/pdf" // Only accept PDF files
          multiple // Allow multiple file selection
          onChange={handleBrochureChange}
        />
      </div>

      {/* Show selected brochures */}
      {brochures.length > 0 && (
        <div className="brochure-preview">
          {brochures.map((brochure, index) => (
            <div key={index}>
              <p>{brochure.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <div className="input-group">
        <button
          onClick={handleUpload}
          disabled={uploading || brochures.length === 0}
          style={{ marginTop: "10px" }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Show the uploaded brochure URLs */}
      {brochureUrls.length > 0 && (
        <div className="uploaded-info">
          <h3>Uploaded Brochure URLs:</h3>
          <ul>
            {brochureUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default BrochureSection;

// import React, { useState } from "react";
// import { BlobServiceClient } from "@azure/storage-blob";

// const BrochureSection = ({ updateMasterLayoutPlan }) => {
//   const [brochures, setBrochures] = useState([]); // State to store selected brochures
//   const [brochureUrls, setBrochureUrls] = useState([]); // State to store uploaded brochure URLs
//   const [uploading, setUploading] = useState(false); // State to manage uploading status

//   // Function to upload the brochure to Azure Blob Storage
//   const uploadToAzure = async (file) => {
//     const accountName = "bhoomistorage2024";
//     const containerName = "bhumibrochure"; // Ensure this is the correct container name
//     const blobSasToken =
//       "sp=racwdli&st=2024-12-05T09:15:10Z&se=2025-12-05T17:15:10Z&sv=2022-11-02&sr=c&sig=8MfcrukbXwu5oVJiDiIPh5kOO%2FQRsdQrncyZWxpy6R8%3D";

//     const blobServiceClient = new BlobServiceClient(
//       `https://${accountName}.blob.core.windows.net?${blobSasToken}`
//     );
//     const containerClient = blobServiceClient.getContainerClient(containerName);

//     const blobName = `brochures/${Date.now()}-${file.name}`; // Unique file name for brochure
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//     try {
//       // Upload the file to Azure Blob Storage
//       await blockBlobClient.uploadBrowserData(file);
//       const uploadedUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
//       return uploadedUrl;
//     } catch (error) {
//       console.error("Azure Upload Error:", error);
//       return null;
//     }
//   };

//   // Handle brochure selection (only accept PDF files)
//   const handleBrochureChange = (e) => {
//     const selectedBrochures = Array.from(e.target.files);
//     setBrochures(selectedBrochures); // Set the selected brochures
//   };

//   // Handle brochure upload
//   const handleUpload = async () => {
//     if (brochures.length > 0) {
//       setUploading(true); // Set uploading state to true

//       const uploadedUrls = [];
//       for (const brochure of brochures) {
//         const uploadedUrl = await uploadToAzure(brochure); // Upload each brochure
//         if (uploadedUrl) {
//           uploadedUrls.push(uploadedUrl); // Add URL to the array
//         }
//       }

//       setBrochureUrls(uploadedUrls); // Set all uploaded brochure URLs
//       updateMasterLayoutPlan(uploadedUrls); // Update the master layout plan field in the parent component
//       setUploading(false); // Set uploading state to false
//     }
//   };

//   return (
//     <section className="form-section">
//       <h2>Brochures</h2>

//       {/* File input for selecting brochures */}
//       <div className="input-group">
//         <label htmlFor="brochureUpload">Upload Brochures (PDF only)</label>
//         <input
//           type="file"
//           id="brochureUpload"
//           accept="application/pdf" // Only accept PDF files
//           multiple // Allow multiple file selection
//           onChange={handleBrochureChange}
//         />
//       </div>

//       {/* Show selected brochures */}
//       {brochures.length > 0 && (
//         <div className="brochure-preview">
//           {brochures.map((brochure, index) => (
//             <div key={index}>
//               <p>{brochure.name}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Upload button */}
//       <div className="input-group">
//         <button
//           onClick={handleUpload}
//           disabled={uploading || brochures.length === 0}
//           style={{ marginTop: "10px" }}
//         >
//           {uploading ? "Uploading..." : "Upload"}
//         </button>
//       </div>

//       {/* Show the uploaded brochure URLs */}
//       {brochureUrls.length > 0 && (
//         <div className="uploaded-info">
//           <h3>Uploaded Brochure URLs:</h3>
//           <ul>
//             {brochureUrls.map((url, index) => (
//               <li key={index}>
//                 <a href={url} target="_blank" rel="noopener noreferrer">
//                   {url}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </section>
//   );
// };

// export default BrochureSection;
