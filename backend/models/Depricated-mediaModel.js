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

// Create a new media record
export async function createMedia(mediaData) {
  const { projectId, type, url, caption } = mediaData;

  // Validate mandatory fields
  validateInput(type, "Type");
  validateInput(url, "URL");

  const sql = `
    INSERT INTO Media (
      projectId, type, url, caption
    ) VALUES (
      @param0, @param1, @param2, @param3
    );
    SELECT SCOPE_IDENTITY() AS id;
  `;

  const result = await query(sql, [projectId, type, url, caption]);
  return result[0].id;
}

// Retrieve a media record by ID
export async function getMediaById(id) {
  validateInput(id, "Media ID");

  const sql = `
    SELECT * FROM Media
    WHERE id = @param0
  `;
  const result = await query(sql, [id]);
  return result[0];
}

// Update a media record
export async function updateMedia(id, mediaData) {
  validateInput(id, "Media ID");

  const { projectId, type, url, caption } = mediaData;

  const sql = `
    UPDATE Media
    SET projectId = @param1, type = @param2, url = @param3, caption = @param4
    WHERE id = @param0
  `;

  await query(sql, [id, projectId, type, url, caption]);
}

// Delete a media record
export async function deleteMedia(id) {
  validateInput(id, "Media ID");

  const sql = `
    DELETE FROM Media WHERE id = @param0;
  `;
  await query(sql, [id]);
}

// Retrieve all media records
export async function getAllMedia() {
  const sql = "SELECT * FROM Media";
  return await query(sql);
}
