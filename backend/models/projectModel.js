import { query } from "../config/dbconfig.js";

// Helper function to validate parameters
function validateInput(input, paramName) {
  if (
    input === undefined ||
    input === null ||
    (typeof input === "string" && !input.trim())
  ) {
    throw new Error(`${paramName} cannot be null or empty`);
  }
}

// Create a new project
export async function createProject(projectData) {
  const {
    city,
    locality,
    sublocality,
    builderName,
    projectName,
    companyName,
    launchDate,
    shortCode,
    deliveryStatus,
    deliveryDate,
    reraNumber,
    totalTowers,
    totalFlats,
    towerPhaseWise,
    constructionType,
    propertyCategory,
    propertyType,
    sectorBriefing,
    projectBriefing,
    masterLayoutPlan,
    mediaUrls, // Array of objects { type, url, caption }
    phases, // Array of objects { phaseNumber, reraNumber, status, deliveryDate }
    bedrooms, // Array of objects with bedroom details
  } = projectData;

  // Validate mandatory fields
  validateInput(projectName, "Project Name");
  validateInput(city, "City");
  validateInput(builderName, "Builder Name");

  // Serialize masterLayoutPlan into a JSON string
  const masterLayoutPlanJson = JSON.stringify(masterLayoutPlan);

  const sql = `
    INSERT INTO Projects (
      city, locality, sublocality, builderName, projectName, companyName,
      launchDate, shortCode, deliveryStatus, deliveryDate, reraNumber,
      totalTowers, totalFlats, towerPhaseWise, constructionType,
      propertyCategory, propertyType, sectorBriefing, projectBriefing, masterLayoutPlan 
    ) VALUES (
      @param0, @param1, @param2, @param3, @param4, @param5,
      @param6, @param7, @param8, @param9, @param10,
      @param11, @param12, @param13, @param14,
      @param15, @param16, @param17, @param18, @param19
    );
    SELECT SCOPE_IDENTITY() AS id;
  `;

  const result = await query(sql, [
    city,
    locality,
    sublocality,
    builderName,
    projectName,
    companyName,
    launchDate,
    shortCode,
    deliveryStatus,
    deliveryDate,
    reraNumber,
    totalTowers,
    totalFlats,
    towerPhaseWise,
    constructionType,
    propertyCategory,
    propertyType,
    sectorBriefing,
    projectBriefing,
    masterLayoutPlanJson,
  ]);

  const projectId = result[0].id;

  // Insert related data (media, phases, bedrooms)
  await Promise.all([
    insertMedia(projectId, mediaUrls),
    insertPhases(projectId, phases),
    insertBedrooms(projectId, bedrooms),
  ]);

  return projectId;
}

// Insert media URLs
async function insertMedia(projectId, mediaUrls) {
  if (mediaUrls && mediaUrls.length > 0) {
    const mediaSql = `
      INSERT INTO Media (projectId, type, url, caption)
      VALUES (@param0, @param1, @param2, @param3);
    `;
    for (const media of mediaUrls) {
      await query(mediaSql, [projectId, media.type, media.url, media.caption]);
    }
  }
}

// Insert phases
async function insertPhases(projectId, phases) {
  if (phases && phases.length > 0) {
    const phaseSql = `
      INSERT INTO Phases (projectId, phaseNumber, reraNumber, status, deliveryDate)
      VALUES (@param0, @param1, @param2, @param3, @param4);
    `;
    for (const phase of phases) {
      await query(phaseSql, [
        projectId,
        phase.phaseNumber,
        phase.reraNumber,
        phase.status,
        phase.deliveryDate,
      ]);
    }
  }
}

// Insert bedrooms
async function insertBedrooms(projectId, bedrooms) {
  if (bedrooms && bedrooms.length > 0) {
    const bedroomSql = `
      INSERT INTO Bedrooms (projectId, size, superArea, builtUpArea, carpetArea, toilets, balconies,
                            servantQuarters, studyRoom, poojaRoom, pricePerSqft, priceRangeMin, priceRangeMax)
      VALUES (@param0, @param1, @param2, @param3, @param4, @param5, @param6,
              @param7, @param8, @param9, @param10, @param11, @param12);
    `;
    for (const bedroom of bedrooms) {
      await query(bedroomSql, [
        projectId,
        bedroom.size,
        bedroom.superArea,
        bedroom.builtUpArea,
        bedroom.carpetArea,
        bedroom.toilets,
        bedroom.balconies,
        bedroom.servantQuarters,
        bedroom.studyRoom,
        bedroom.poojaRoom,
        bedroom.pricePerSqft,
        bedroom.priceRangeMin,
        bedroom.priceRangeMax,
      ]);
    }
  }
}

// Retrieve a project by ID
export async function getProjectById(id) {
  validateInput(id, "Project ID");

  const sql = `
    SELECT p.*, 
           (SELECT * FROM Phases WHERE projectId = p.id FOR JSON PATH) AS phases,
           (SELECT * FROM Bedrooms WHERE projectId = p.id FOR JSON PATH) AS bedrooms,
           (SELECT * FROM Media WHERE projectId = p.id FOR JSON PATH) AS media,
           JSON_QUERY(p.masterLayoutPlan, '$') AS masterLayoutPlan
    FROM Projects p
    WHERE p.id = @param0;
  `;
  const result = await query(sql, [id]);

  return result[0];
}

// Update a project
export async function updateProject(id, projectData) {
  validateInput(id, "Project ID");

  const {
    city,
    locality,
    sublocality,
    builderName,
    projectName,
    companyName,
    launchDate,
    shortCode,
    deliveryStatus,
    deliveryDate,
    reraNumber,
    totalTowers,
    totalFlats,
    towerPhaseWise,
    constructionType,
    propertyCategory,
    propertyType,
    sectorBriefing,
    projectBriefing,
    masterLayoutPlan,
  } = projectData;

  const masterLayoutPlanJson = JSON.stringify(masterLayoutPlan);

  const sql = `
    UPDATE Projects
    SET city = @param1, locality = @param2, sublocality = @param3,
        builderName = @param4, projectName = @param5, companyName = @param6,
        launchDate = @param7, shortCode = @param8, deliveryStatus = @param9,
        deliveryDate = @param10, reraNumber = @param11,
        totalTowers = @param12, totalFlats = @param13, towerPhaseWise = @param14,
        constructionType = @param15, propertyCategory = @param16,
        propertyType = @param17, sectorBriefing = @param18, projectBriefing = @param19,
        masterLayoutPlan = @param20
    WHERE id = @param0;
  `;

  await query(sql, [
    id,
    city,
    locality,
    sublocality,
    builderName,
    projectName,
    companyName,
    launchDate,
    shortCode,
    deliveryStatus,
    deliveryDate,
    reraNumber,
    totalTowers,
    totalFlats,
    towerPhaseWise,
    constructionType,
    propertyCategory,
    propertyType,
    sectorBriefing,
    projectBriefing,
    masterLayoutPlanJson,
  ]);
}

// Delete a project and associated data
export async function deleteProject(id) {
  validateInput(id, "Project ID");

  const sql = `
    DELETE FROM Media WHERE projectId = @param0;
    DELETE FROM Bedrooms WHERE projectId = @param0;
    DELETE FROM Phases WHERE projectId = @param0;
    DELETE FROM Projects WHERE id = @param0;
  `;
  await query(sql, [id]);
}

// Retrieve all projects
export async function getAllProjects() {
  const sql = "SELECT * FROM Projects";
  return await query(sql);
}

// import { query } from "../config/dbconfig.js";

// // Helper function to validate parameters
// function validateInput(input, paramName) {
//   if (
//     input === undefined ||
//     input === null ||
//     (typeof input === "string" && !input.trim())
//   ) {
//     throw new Error(`${paramName} cannot be null or empty`);
//   }
// }

// export async function createProject(projectData) {
//   const {
//     city,
//     locality,
//     sublocality,
//     builderName,
//     projectName,
//     companyName,
//     launchDate,
//     shortCode,
//     deliveryStatus,
//     deliveryDate,
//     reraNumber,
//     totalTowers,
//     totalFlats,
//     towerPhaseWise,
//     constructionType,
//     propertyCategory,
//     propertyType,
//     sectorBriefing,
//     projectBriefing,
//     masterLayoutPlan,
//     mediaUrls, // Array of objects { type, url, caption }
//     phases, // Array of objects { phaseNumber, reraNumber, status, deliveryDate }
//     bedrooms, // Array of objects with bedroom details
//   } = projectData;

//   // Validate mandatory fields
//   validateInput(projectName, "Project Name");
//   validateInput(city, "City");
//   validateInput(builderName, "Builder Name");

//   // Serialize masterLayoutPlan into a JSON string
//   const masterLayoutPlanJson = JSON.stringify(masterLayoutPlan);

//   // Insert main project details
//   const sql = `
//     INSERT INTO Projects (
//       city, locality, sublocality, builderName, projectName, companyName,
//       launchDate, shortCode, deliveryStatus, deliveryDate, reraNumber,
//       totalTowers, totalFlats, towerPhaseWise, constructionType,
//       propertyCategory, propertyType, sectorBriefing, projectBriefing, masterLayoutPlan
//     ) VALUES (
//       @param0, @param1, @param2, @param3, @param4, @param5,
//       @param6, @param7, @param8, @param9, @param10,
//       @param11, @param12, @param13, @param14,
//       @param15, @param16, @param17, @param18, @param19
//     );
//     SELECT SCOPE_IDENTITY() AS id;
//   `;

//   const result = await query(sql, [
//     city,
//     locality,
//     sublocality,
//     builderName,
//     projectName,
//     companyName,
//     launchDate,
//     shortCode,
//     deliveryStatus,
//     deliveryDate,
//     reraNumber,
//     totalTowers,
//     totalFlats,
//     towerPhaseWise,
//     constructionType,
//     propertyCategory,
//     propertyType,
//     sectorBriefing,
//     projectBriefing,
//     masterLayoutPlanJson,
//   ]);

//   const projectId = result[0].id;

//   // Insert media URLs
//   if (mediaUrls && mediaUrls.length > 0) {
//     for (const media of mediaUrls) {
//       const mediaSql = `
//         INSERT INTO Media (projectId, type, url, caption)
//         VALUES (@param0, @param1, @param2, @param3);
//       `;
//       await query(mediaSql, [projectId, media.type, media.url, media.caption]);
//     }
//   }

//   // Insert phases
//   if (phases && phases.length > 0) {
//     for (const phase of phases) {
//       const phaseSql = `
//         INSERT INTO Phases (projectId, phaseNumber, reraNumber, status, deliveryDate)
//         VALUES (@param0, @param1, @param2, @param3, @param4);
//       `;
//       await query(phaseSql, [
//         projectId,
//         phase.phaseNumber,
//         phase.reraNumber,
//         phase.status,
//         phase.deliveryDate,
//       ]);
//     }
//   }

//   // Insert bedrooms
//   if (bedrooms && bedrooms.length > 0) {
//     for (const bedroom of bedrooms) {
//       const bedroomSql = `
//         INSERT INTO Bedrooms (projectId, size, superArea, builtUpArea, carpetArea, toilets, balconies,
//                               servantQuarters, studyRoom, poojaRoom, pricePerSqft, priceRangeMin, priceRangeMax)
//         VALUES (@param0, @param1, @param2, @param3, @param4, @param5, @param6,
//                 @param7, @param8, @param9, @param10, @param11, @param12);
//       `;
//       await query(bedroomSql, [
//         projectId,
//         bedroom.size,
//         bedroom.superArea,
//         bedroom.builtUpArea,
//         bedroom.carpetArea,
//         bedroom.toilets,
//         bedroom.balconies,
//         bedroom.servantQuarters,
//         bedroom.studyRoom,
//         bedroom.poojaRoom,
//         bedroom.pricePerSqft,
//         bedroom.priceRangeMin,
//         bedroom.priceRangeMax,
//       ]);
//     }
//   }

//   return projectId;
// }

// // Retrieve a project by ID, including the master layout plans as an array
// export async function getProjectById(id) {
//   validateInput(id, "Project ID");

//   const sql = `
//     SELECT p.*,
//            (SELECT * FROM Phases WHERE projectId = p.id FOR JSON PATH) AS phases,
//            (SELECT * FROM Bedrooms WHERE projectId = p.id FOR JSON PATH) AS bedrooms,
//            (SELECT feature FROM AdditionalFeatures WHERE projectId = p.id FOR JSON PATH) AS additionalFeatures,
//            (SELECT * FROM Media WHERE projectId = p.id FOR JSON PATH) AS media,
//            JSON_QUERY(p.masterLayoutPlan, '$') AS masterLayoutPlan  -- Use JSON_QUERY for arrays/objects
//     FROM Projects p
//     WHERE p.id = @param0
//   `;
//   const result = await query(sql, [id]);

//   // masterLayoutPlan is already parsed by SQL query (no need to parse it in JS)
//   return result[0];
// }

// // Update a project
// export async function updateProject(id, projectData) {
//   validateInput(id, "Project ID");

//   const {
//     city,
//     locality,
//     sublocality,
//     builderName,
//     projectName,
//     companyName,
//     launchDate,
//     shortCode,
//     deliveryStatus,
//     deliveryDate,
//     reraNumber,
//     totalTowers,
//     totalFlats,
//     towerPhaseWise,
//     constructionType,
//     propertyCategory,
//     propertyType,
//     sectorBriefing,
//     projectBriefing,
//     masterLayoutPlan,
//   } = projectData;

//   // Serialize masterLayoutPlan into a JSON string before update
//   const masterLayoutPlanJson = JSON.stringify(masterLayoutPlan);

//   const sql = `
//     UPDATE Projects
//     SET city = @param1, locality = @param2, sublocality = @param3,
//         builderName = @param4, projectName = @param5, companyName = @param6,
//         launchDate = @param7, shortCode = @param8, deliveryStatus = @param9,
//         deliveryDate = @param10, reraNumber = @param11,
//         totalTowers = @param12, totalFlats = @param13, towerPhaseWise = @param14,
//         constructionType = @param15, propertyCategory = @param16,
//         propertyType = @param17, sectorBriefing = @param18, projectBriefing = @param19,
//         masterLayoutPlan = @param20
//     WHERE id = @param0
//   `;

//   await query(sql, [
//     id,
//     city,
//     locality,
//     sublocality,
//     builderName,
//     projectName,
//     companyName,
//     launchDate,
//     shortCode,
//     deliveryStatus,
//     deliveryDate,
//     reraNumber,
//     totalTowers,
//     totalFlats,
//     towerPhaseWise,
//     constructionType,
//     propertyCategory,
//     propertyType,
//     sectorBriefing,
//     projectBriefing,
//     masterLayoutPlanJson, // Use serialized JSON for the layout plan
//   ]);
// }

// // Delete a project and associated data
// export async function deleteProject(id) {
//   validateInput(id, "Project ID");

//   const sql = `
//     DELETE FROM Media WHERE projectId = @param0;
//     DELETE FROM AdditionalFeatures WHERE projectId = @param0;
//     DELETE FROM Bedrooms WHERE projectId = @param0;
//     DELETE FROM Phases WHERE projectId = @param0;
//     DELETE FROM Projects WHERE id = @param0;
//   `;
//   await query(sql, [id]);
// }

// // Retrieve all projects
// export async function getAllProjects() {
//   const sql = "SELECT * FROM Projects";
//   return await query(sql);
// }
