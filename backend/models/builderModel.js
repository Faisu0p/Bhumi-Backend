import sql from 'mssql'; 
import config from '../config/dbconfig.js'; 

export const createBuilder = async (builderData) => {
  const {
    city,
    builderCompleteName,
    builderShortName,
    builderLogo,
    yearsInRealEstate,
    shortDescription,
  } = builderData;

  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('city', sql.NVarChar, city)
      .input('fullName', sql.NVarChar, builderCompleteName)
      .input('nickName', sql.NVarChar, builderShortName)
      .input('builderLogo', sql.NVarChar, builderLogo)
      .input('yearsOfExperience', sql.Int, yearsInRealEstate)
      .input('shortDescription', sql.NVarChar, shortDescription)
      .query(`
        INSERT INTO Builders (
          City,
          FullName,
          NickName,
          Builder_logo,
          Years_of_experience,
          Short_Description,
          Builder_isVerified
        ) VALUES (
          @city,
          @fullName,
          @nickName,
          @builderLogo,
          @yearsOfExperience,
          @shortDescription,
          0
        )
      `);

    return result.rowsAffected[0];
  } catch (err) {
    console.error('Error creating builder:', err.message);
    throw err;
  }
};

export const getAllBuilders = async () => {
  const sqlQuery = "SELECT * FROM Builders";
  return await query(sqlQuery);
}

export const getBuildersName = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT id, builderCompleteName FROM Builders;
    `);
    return result.recordset;
  } catch (err) {
    console.error("Error fetching builders:", err);
    throw new Error("Error fetching builders");
  }
};

export const verifyBuilder = async (builderCompleteName) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('builderCompleteName', sql.VarChar, builderCompleteName)
      .query(`
        UPDATE Builders
        SET Builder_isVerified = 1
        WHERE FullName = @builderCompleteName;
      `);

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error("Error verifying builder:", err);
    throw new Error("Error verifying builder");
  }
};
