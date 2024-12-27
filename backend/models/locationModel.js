import sql from 'mssql';
import config from '../config/dbconfig.js';

// Add a New State
export const addState = async (stateName) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('StateName', sql.NVarChar, stateName)
      .query(`
        INSERT INTO States (name)
        OUTPUT INSERTED.id
        VALUES (@StateName);
      `);

    // Correctly returning the inserted stateId in the format frontend expects
    const stateId = result.recordset[0].id;
    return { message: 'State added successfully', stateId };
  } catch (err) {
    console.error('Error adding state:', err.message);
    throw new Error('Failed to add state');
  }
};

// Add a New City
export const addCity = async (cityName, stateId) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('CityName', sql.NVarChar, cityName)
      .input('StateId', sql.Int, stateId)
      .query(`
        INSERT INTO Cities (name, state_id)
        OUTPUT INSERTED.id
        VALUES (@CityName, @StateId);
      `);

    // Returning cityId in the format frontend expects
    const cityId = result.recordset[0].id;
    return { message: 'City added successfully', cityId };
  } catch (err) {
    console.error('Error adding city:', err.message);
    throw new Error('Failed to add city');
  }
};

// Add a New Locality
export const addLocality = async (localityName, cityId) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('LocalityName', sql.NVarChar, localityName)
      .input('CityId', sql.Int, cityId)
      .query(`
        INSERT INTO Localities (name, city_id)
        OUTPUT INSERTED.id
        VALUES (@LocalityName, @CityId);
      `);

    // Returning localityId in the format frontend expects
    const localityId = result.recordset[0].id;
    return { message: 'Locality added successfully', localityId };
  } catch (err) {
    console.error('Error adding locality:', err.message);
    throw new Error('Failed to add locality');
  }
};

// Add a New SubLocality
export const addSublocality = async (sublocalityName, localityId) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('SublocalityName', sql.NVarChar, sublocalityName)
      .input('LocalityId', sql.Int, localityId)
      .query(`
        INSERT INTO Sublocalities (name, locality_id)
        OUTPUT INSERTED.id
        VALUES (@SublocalityName, @LocalityId);
      `);

    // Returning sublocalityId in the format frontend expects
    const sublocalityId = result.recordset[0].id;
    return { message: 'Sublocality added successfully', sublocalityId };
  } catch (err) {
    console.error('Error adding sublocality:', err.message);
    throw new Error('Failed to add sublocality');
  }
};

// Add a New Pincode
export const addPincode = async (pincode, localityId) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('Pincode', sql.NVarChar, pincode)
      .input('LocalityId', sql.Int, localityId)
      .query(`
        INSERT INTO Pincodes (pincode, locality_id)
        OUTPUT INSERTED.id
        VALUES (@Pincode, @LocalityId);
      `);

    // Returning pincodeId in the format frontend expects
    const pincodeId = result.recordset[0].id;
    return { message: 'Pincode added successfully', pincodeId };
  } catch (err) {
    console.error('Error adding pincode:', err.message);
    throw new Error('Failed to add pincode');
  }
};


// Fetch All States
export const getStates = async () => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .query('SELECT id, name FROM States ORDER BY name');

    return result.recordset;
  } catch (err) {
    console.error('Error fetching states:', err.message);
    throw new Error('Failed to fetch states');
  }
};

// Fetch Cities by State
export const getCitiesByState = async (stateId) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('StateId', sql.Int, stateId)
      .query('SELECT id, name FROM Cities WHERE state_id = @StateId ORDER BY name');

    return result.recordset;
  } catch (err) {
    console.error('Error fetching cities:', err.message);
    throw new Error('Failed to fetch cities');
  }
};

// Fetch Localities by City
export const getLocalitiesByCity = async (cityId) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('CityId', sql.Int, cityId)
      .query('SELECT id, name FROM Localities WHERE city_id = @CityId ORDER BY name');

    return result.recordset;
  } catch (err) {
    console.error('Error fetching localities:', err.message);
    throw new Error('Failed to fetch localities');
  }
};

// Fetch Sublocalities by Locality
export const getSublocalitiesByLocality = async (localityId) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('LocalityId', sql.Int, localityId)
      .query('SELECT id, name FROM Sublocalities WHERE locality_id = @LocalityId ORDER BY name');

    return result.recordset;
  } catch (err) {
    console.error('Error fetching sublocalities:', err.message);
    throw new Error('Failed to fetch sublocalities');
  }
};

// Fetch Pincodes by Locality
export const getPincodesByLocality = async (localityId) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('LocalityId', sql.Int, localityId)
      .query('SELECT id, pincode FROM Pincodes WHERE locality_id = @LocalityId ORDER BY pincode');

    return result.recordset;
  } catch (err) {
    console.error('Error fetching pincodes:', err.message);
    throw new Error('Failed to fetch pincodes');
  }
};