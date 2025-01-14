import sql from 'mssql'; 
import config from '../config/dbconfig.js'; 


// Create New Builder with multiple State and City data
export const createBuilder = async (builderData) => {
  const {
    citiesAndStates, // Array of { state, city } pairs
    builderCompleteName,
    builderShortName,
    builderLogo,
    yearsInRealEstate,
    shortDescription,
    builderLogoRectangle
  } = builderData;

  try {
    const pool = await sql.connect(config);

    // Step 1: Insert into Builders table
    const result = await pool
      .request()
      .input('fullName', sql.NVarChar, builderCompleteName)
      .input('nickName', sql.NVarChar, builderShortName)
      .input('builderLogo', sql.NVarChar, builderLogo)
      .input('yearsOfExperience', sql.Int, yearsInRealEstate)
      .input('shortDescription', sql.NVarChar, shortDescription)
      .input('builderLogoRectangle', sql.NVarChar, builderLogoRectangle)
      .query(`
        INSERT INTO Builders (
          FullName,
          NickName,
          Builder_logo,
          Years_of_experience,
          Short_Description,
          Builder_isVerified,
          Builder_logo_rectangle
        ) VALUES (
          @fullName,
          @nickName,
          @builderLogo,
          @yearsOfExperience,
          @shortDescription,
          0,
          @builderLogoRectangle
        );
        SELECT SCOPE_IDENTITY() AS NewBuilderID;  -- Get the Builder_ID of the newly inserted builder
      `);

    const builderId = result.recordset[0].NewBuilderID; // Retrieve the Builder_ID

    // Step 2: Insert multiple State and City data into Builder_StateCity table
    for (const { state, city } of citiesAndStates) {
      const request = pool.request();  // Create a new request for each insert
      await request
        .input('builderIdForStateCity', sql.Int, builderId)  // Use a unique parameter name for each insert
        .input('state', sql.NVarChar, state)
        .input('city', sql.NVarChar, city)
        .query(`
          INSERT INTO Builder_StateCity (Builder_id, State_Name, City_Name)
          VALUES (@builderIdForStateCity, @state, @city);
        `);
    }

    return result.rowsAffected[0];
  } catch (err) {
    console.error('Error creating builder:', err.message);
    throw err;
  }
};


// Edit Existing Builder with multiple State and City data
export const updateBuilder = async (builderId, builderData) => {
  const {
    citiesAndStates, // Array of { state, city } pairs
    builderCompleteName,
    builderShortName,
    builderLogo,
    yearsInRealEstate,
    shortDescription,
    builderLogoRectangle
  } = builderData;

  try {
    const pool = await sql.connect(config);

    // Step 1: Update the Builders table
    await pool
      .request()
      .input('builderId', sql.Int, builderId)
      .input('fullName', sql.NVarChar, builderCompleteName)
      .input('nickName', sql.NVarChar, builderShortName)
      .input('builderLogo', sql.NVarChar, builderLogo)
      .input('yearsOfExperience', sql.Int, yearsInRealEstate)
      .input('shortDescription', sql.NVarChar, shortDescription)
      .input('builderLogoRectangle', sql.NVarChar, builderLogoRectangle)
      .query(`
        UPDATE Builders
        SET
          FullName = @fullName,
          NickName = @nickName,
          Builder_logo = @builderLogo,
          Years_of_experience = @yearsOfExperience,
          Short_Description = @shortDescription,
          Builder_logo_rectangle = @builderLogoRectangle,
          Builder_isVerified = 0,
          approvalStatus = 'Pending'
        WHERE Builder_ID = @builderId;
      `);

    // Step 2: Delete existing State and City data for the builder
    await pool
      .request()
      .input('builderIdForDeletion', sql.Int, builderId)
      .query(`
        DELETE FROM Builder_StateCity
        WHERE Builder_id = @builderIdForDeletion;
      `);

    // Step 3: Insert updated State and City data into Builder_StateCity table
    for (const { state, city } of citiesAndStates) {
      const request = pool.request(); // Create a new request for each insert
      await request
        .input('builderIdForStateCity', sql.Int, builderId) // Use a unique parameter name for each insert
        .input('state', sql.NVarChar, state)
        .input('city', sql.NVarChar, city)
        .query(`
          INSERT INTO Builder_StateCity (Builder_id, State_Name, City_Name)
          VALUES (@builderIdForStateCity, @state, @city);
        `);
    }

    return { success: true, message: 'Builder information updated successfully.' };
  } catch (err) {
    console.error('Error updating builder:', err.message);
    throw err;
  }
};





//Get Builder id and Names
export const getBuilders = async () => {
  try {
    const pool = await sql.connect(config); 

    const result = await pool.request().query(`
      SELECT Builder_id, FullName 
      FROM Builders where approvalStatus = 'Pending';
    `);

    return result.recordset;
  } catch (err) {
    console.error('Error fetching builders:', err.message);
    throw err;
  }
};


// Verify Builder by ID
export const verifyBuilderById = async (builderId) => {
  try {
    const pool = await sql.connect(config); 

    const result = await pool.request()
      .input('builderId', sql.Int, builderId)
      .query(`
        UPDATE Builders
        SET Builder_isVerified = 1, approvalStatus = 'Approved'
        WHERE Builder_id = @builderId;
      `);

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error('Error verifying builder by ID:', err.message);
    throw new Error('Error updating builder verification status');
  }
};


// Reject Builder by ID
export const rejectBuilderById = async (builderId) => {
  try {
    const pool = await sql.connect(config); 

    const result = await pool.request()
      .input('builderId', sql.Int, builderId)
      .query(`
        UPDATE Builders
        SET Builder_isVerified = 0, approvalStatus = 'Rejected'
        WHERE Builder_id = @builderId;
      `);

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error('Error rejecting builder by ID:', err.message);
    throw new Error('Error updating builder rejection status');
  }
};



// Get All Builders Information
export const getAllBuildersInfo = async () => {
  try {
    const pool = await sql.connect(config); 

    const result = await pool.request().query(`
SELECT 
  b.Builder_id, 
  bc.State_Name, 
  bc.City_Name, 
  b.FullName, 
  b.NickName, 
  b.Builder_logo, 
  b.Years_of_experience, 
  b.Short_Description, 
  b.Builder_isVerified, 
  b.Builder_logo_rectangle, 
  b.approvalStatus
FROM Builders b
LEFT JOIN Builder_StateCity bc ON b.Builder_id = bc.Builder_id;

    `);

    // Process the result to group state and city names into comma-separated lists
    const builders = [];
    result.recordset.forEach((record) => {
      let builder = builders.find(b => b.Builder_id === record.Builder_id);
      if (!builder) {
        builder = { ...record };
        builder.State_Name = [record.State_Name];
        builder.City_Name = [record.City_Name];
        builders.push(builder);
      } else {
        if (!builder.State_Name.includes(record.State_Name)) {
          builder.State_Name.push(record.State_Name);
        }
        if (!builder.City_Name.includes(record.City_Name)) {
          builder.City_Name.push(record.City_Name);
        }
      }
    });

    // Join the state and city arrays into comma-separated strings
    builders.forEach((builder) => {
      builder.State_Name = builder.State_Name.join(', ');
      builder.City_Name = builder.City_Name.join(', ');
    });

    return builders;
  } catch (err) {
    console.error('Error fetching all builders information:', err.message);
    throw new Error('Error fetching all builders information');
  }
};




// Get Verified Builders
export const getVerifiedBuilders = async () => {
  try {
    const pool = await sql.connect(config);

    // Query to fetch only verified builders
    const result = await pool.request().query(`
      SELECT Builder_id, FullName
      FROM Builders
      WHERE Builder_isVerified = 1;
    `);

    return result.recordset;
  } catch (err) {
    console.error('Error fetching verified builders:', err.message);
    throw new Error('Error fetching verified builders');
  }
};


// Get Builder Details by Builder_id (for Manage Page)
export const getBuilderById = async (builderId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('builderId', sql.Int, builderId)  // Using the input parameter for Builder_id
      .query(`
        SELECT 
          b.Builder_id,
          bc.State_Name,
          bc.City_Name,
          b.FullName,
          b.NickName,
          b.Builder_logo,
          b.Years_of_experience,
          b.Short_Description,
          b.Builder_isVerified,
          b.Builder_logo_rectangle,
          b.approvalStatus
        FROM Builders b
        JOIN Builder_StateCity bc ON b.Builder_id = bc.Builder_id
        WHERE b.Builder_id = @builderId
      `);

    // If builder is found, process the result to group state and city names
    if (result.recordset.length > 0) {
      const builder = result.recordset[0]; // Start with the first record
      let stateNames = [];
      let cityNames = [];

      // Iterate over the records to group the states and cities
      result.recordset.forEach((record) => {
        if (!stateNames.includes(record.State_Name)) {
          stateNames.push(record.State_Name);
        }
        if (!cityNames.includes(record.City_Name)) {
          cityNames.push(record.City_Name);
        }
      });

      // Update builder details with the comma-separated values
      builder.State_Name = stateNames.join(', ');
      builder.City_Name = cityNames.join(', ');

      return builder; // Return the formatted builder details
    } else {
      throw new Error('Builder not found');
    }
  } catch (err) {
    console.error('Error fetching builder details:', err.message);
    throw err;
  }
};


