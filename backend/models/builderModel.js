import { query } from '../config/dbconfig.js'; // Corrected import for the query function
import sql from 'mssql'; // Import sql to use with SQL Server
import config from '../config/dbconfig.js'; // Import config for SQL connection

// Retrieve all builders
export async function getAllBuilders() {
  const sqlQuery = "SELECT * FROM Builders";
  return await query(sqlQuery);
}




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


// Fetch builder names and IDs from Builders table
export const getBuildersName = async () => {
  try {
    const pool = await sql.connect(config);

    // Log to check if connection is successful
    console.log("Connected to the database");

    const result = await pool.request().query(`
      SELECT id, builderCompleteName FROM Builders;
    `);

    // Log the result to see the output
    console.log("Query result:", result.recordset);

    return result.recordset; // This returns the builders as an array of objects
  } catch (err) {
    // Log detailed error for debugging
    console.error("Error fetching builders:", err);
    throw new Error("Error fetching builders");
  }
};



// Verify a builder by their complete name
export const verifyBuilder = async (builderCompleteName) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('builderCompleteName', sql.VarChar, builderCompleteName)
      .query(`
        UPDATE Builders
        SET isVerified = 1
        WHERE builderCompleteName = @builderCompleteName;
      `);

    return result.rowsAffected[0] > 0; // Return true if at least one row was updated
  } catch (err) {
    console.error("Error verifying builder:", err);
    throw new Error("Error updating builder verification status");
  }
};