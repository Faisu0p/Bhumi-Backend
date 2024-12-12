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

// Create a new phase
// Function to create a new phase
export async function createPhase(phaseData) {
  // Destructure the input data
  const { phaseNumber, reraNumber, status, deliveryDate } = phaseData;

  console.log("Phase data received:", phaseData); // For debugging purposes

  // SQL query to insert data into the Phases table
  const sql = `
    INSERT INTO Phases (
       phaseNumber, reraNumber, status, deliveryDate
    ) VALUES (
      @param0, @param1, @param2, @param3, @param4
    );
    SELECT SCOPE_IDENTITY() AS id; -- Return the newly generated ID
  `;

  // Execute the query with parameters
  const result = await query(sql, [
    phaseNumber,
    reraNumber,
    status,
    deliveryDate,
  ]);

  // Return the auto-generated ID
  return result[0]?.id;
}

// Retrieve a phase by ID
export async function getPhaseById(id) {
  validateInput(id, "Phase ID");

  const sql = `
    SELECT * FROM Phases WHERE id = @param0;
  `;
  const result = await query(sql, [id]);

  return result[0];
}

// Retrieve all phases for a specific project
export async function getPhasesByProjectId(projectId) {
  validateInput(projectId, "Project ID");

  const sql = `
    SELECT * FROM Phases WHERE projectId = @param0;
  `;
  return await query(sql, [projectId]);
}

// Update a phase
export async function updatePhase(id, phaseData) {
  validateInput(id, "Phase ID");

  const { phaseNumber, reraNumber, status, deliveryDate } = phaseData;

  const sql = `
    UPDATE Phases
    SET phaseNumber = @param1,
        reraNumber = @param2,
        status = @param3,
        deliveryDate = @param4
    WHERE id = @param0;
  `;

  await query(sql, [id, phaseNumber, reraNumber, status, deliveryDate]);
}

// Delete a phase
export async function deletePhase(id) {
  validateInput(id, "Phase ID");

  const sql = `
    DELETE FROM Phases WHERE id = @param0;
  `;
  await query(sql, [id]);
}

// Retrieve all phases
export async function getAllPhases() {
  const sql = "SELECT * FROM Phases";
  return await query(sql);
}
