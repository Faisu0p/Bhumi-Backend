import { query } from '../config/dbconfig.js'; // Corrected import for the query function
import sql from 'mssql'; // Import sql to use with SQL Server
import config from '../config/dbconfig.js'; // Import config for SQL connection

// Retrieve all builders
export async function getAllBuilders() {
  const sqlQuery = "SELECT * FROM Builders";
  return await query(sqlQuery);
}

// Get builder by ID
export const getBuilderById = async (id) => {
  try {
    const sqlQuery = 'SELECT * FROM Builders WHERE id = @id';
    const builders = await query(sqlQuery, [id]);
    return builders[0]; // Return the first builder or null if not found
  } catch (err) {
    console.error('Error fetching builder:', err);
    throw err;
  }
};

export const createBuilder = async (builderData) => {
  const {
    city,
    builderCompleteName,
    builderShortName,
    builderLogo,
    yearsInRealEstate,
    shortDescription,
    listOfProjects,
    isVerified,
  } = builderData;

  try {
    const pool = await sql.connect(config); // Using the correct config for connection
    const result = await pool
      .request()
      .input('city', sql.NVarChar, city)
      .input('builderCompleteName', sql.NVarChar, builderCompleteName)
      .input('builderShortName', sql.NVarChar, builderShortName)
      .input('builderLogo', sql.NVarChar, builderLogo)
      .input('yearsInRealEstate', sql.Int, yearsInRealEstate)
      .input('shortDescription', sql.NVarChar, shortDescription)
      .input('listOfProjects', sql.NVarChar, JSON.stringify(listOfProjects)) // Convert listOfProjects array to a JSON string
      .input('isVerified', sql.Bit, isVerified) // Assuming `isVerified` is a boolean (true/false)
      .query(`
        INSERT INTO Builders (
          city,
          builderCompleteName,
          builderShortName,
          builderLogo,
          yearsInRealEstate,
          shortDescription,
          listOfProjects,
          isVerified
        ) VALUES (
          @city,
          @builderCompleteName,
          @builderShortName,
          @builderLogo,
          @yearsInRealEstate,
          @shortDescription,
          @listOfProjects,
          @isVerified
        )
      `);

    return result.rowsAffected[0]; // Return the number of rows affected
  } catch (err) {
    console.error('Error creating builder:', err.message);
    throw err;
  }
};


// Update an existing builder
export const updateBuilder = async (id, builderData) => {
  const { cityName, builderFullName, shortName, logoUrl, numberOfProjects, briefDescription, listOfProjects } = builderData;
  try {
    const sqlQuery = `
      UPDATE Builders
      SET 
        cityName = @cityName,
        builderFullName = @builderFullName,
        shortName = @shortName,
        logoUrl = @logoUrl,
        numberOfProjects = @numberOfProjects,
        briefDescription = @briefDescription,
        listOfProjects = @listOfProjects 
      WHERE id = @id
    `;
    const result = await query(sqlQuery, [
      cityName, 
      builderFullName, 
      shortName, 
      logoUrl, 
      numberOfProjects, 
      briefDescription, 
      JSON.stringify(listOfProjects), // Store listOfProjects as a string
      id
    ]);
    return result;
  } catch (err) {
    console.error('Error updating builder:', err);
    throw err;
  }
};

// Delete a builder
export const deleteBuilder = async (id) => {
  try {
    const sqlQuery = 'DELETE FROM Builders WHERE id = @id';
    const result = await query(sqlQuery, [id]);
    return result;
  } catch (err) {
    console.error('Error deleting builder:', err);
    throw err;
  }
};
