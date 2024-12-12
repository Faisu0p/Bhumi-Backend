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

// Create a new bedroom record
export async function createBedroom(bedroomData) {
  const {
    projectId,
    size,
    superArea,
    builtUpArea,
    carpetArea,
    toilets,
    balconies,
    servantQuarters,
    studyRoom,
    poojaRoom,
    pricePerSqft,
    priceRangeMin,
    priceRangeMax,
  } = bedroomData;

  // Validate mandatory fields
  validateInput(projectId, "Project ID");
  validateInput(size, "Size");

  const sql = `
    INSERT INTO Bedrooms (
      projectId, size, superArea, builtUpArea, carpetArea, toilets, balconies,
      servantQuarters, studyRoom, poojaRoom, pricePerSqft, priceRangeMin, priceRangeMax
    ) VALUES (
      @param0, @param1, @param2, @param3, @param4, @param5, @param6,
      @param7, @param8, @param9, @param10, @param11, @param12
    );
    SELECT SCOPE_IDENTITY() AS id;
  `;

  const result = await query(sql, [
    projectId,
    size,
    superArea,
    builtUpArea,
    carpetArea,
    toilets,
    balconies,
    servantQuarters,
    studyRoom,
    poojaRoom,
    pricePerSqft,
    priceRangeMin,
    priceRangeMax,
  ]);

  return result[0].id;
}

// Retrieve a bedroom record by ID
export async function getBedroomById(id) {
  validateInput(id, "Bedroom ID");

  const sql = `
    SELECT *
    FROM Bedrooms
    WHERE id = @param0
  `;

  const result = await query(sql, [id]);
  return result[0];
}

// Update a bedroom record
export async function updateBedroom(id, bedroomData) {
  validateInput(id, "Bedroom ID");

  const {
    size,
    superArea,
    builtUpArea,
    carpetArea,
    toilets,
    balconies,
    servantQuarters,
    studyRoom,
    poojaRoom,
    pricePerSqft,
    priceRangeMin,
    priceRangeMax,
  } = bedroomData;

  const sql = `
    UPDATE Bedrooms
    SET size = @param1, superArea = @param2, builtUpArea = @param3, carpetArea = @param4,
        toilets = @param5, balconies = @param6, servantQuarters = @param7,
        studyRoom = @param8, poojaRoom = @param9, pricePerSqft = @param10,
        priceRangeMin = @param11, priceRangeMax = @param12
    WHERE id = @param0
  `;

  await query(sql, [
    id,
    size,
    superArea,
    builtUpArea,
    carpetArea,
    toilets,
    balconies,
    servantQuarters,
    studyRoom,
    poojaRoom,
    pricePerSqft,
    priceRangeMin,
    priceRangeMax,
  ]);
}

// Delete a bedroom record
export async function deleteBedroom(id) {
  validateInput(id, "Bedroom ID");

  const sql = `
    DELETE FROM Bedrooms
    WHERE id = @param0
  `;
  await query(sql, [id]);
}

// Retrieve all bedrooms for a specific project
export async function getBedroomsByProjectId(projectId) {
  validateInput(projectId, "Project ID");

  const sql = `
    SELECT *
    FROM Bedrooms
    WHERE projectId = @param0
  `;

  const result = await query(sql, [projectId]);
  return result;
}

// Retrieve all bedroom records
export async function getAllBedrooms() {
  const sql = "SELECT * FROM Bedrooms";
  return await query(sql);
}
