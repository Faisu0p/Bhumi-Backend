import sql from 'mssql';
import config from '../config/dbconfig.js';

// Get all States
export const getStates = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT id, name FROM States');
    return result.recordset;  // Returns an array of states with id and name
  } catch (err) {
    throw new Error('Failed to fetch states');
  }
};

// Get cities by state
export const getCitiesByState = async (stateId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('stateId', sql.Int, stateId)
      .query('SELECT id, name FROM Cities WHERE state_id = @stateId');
    return result.recordset;  // Returns an array of cities for the specific state
  } catch (err) {
    throw new Error('Failed to fetch cities');
  }
};

// Get localities by city
export const getLocalitiesByCity = async (cityId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('cityId', sql.Int, cityId)
      .query('SELECT id, name FROM Localities WHERE city_id = @cityId');
    return result.recordset;  // Returns an array of localities for the specific city
  } catch (err) {
    throw new Error('Failed to fetch localities');
  }
};

// Get sublocalities by locality
export const getSublocalitiesByLocality = async (localityId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('localityId', sql.Int, localityId)
      .query('SELECT id, name FROM Sublocalities WHERE locality_id = @localityId');
    return result.recordset;  // Returns an array of sublocalities for the specific locality
  } catch (err) {
    throw new Error('Failed to fetch sublocalities');
  }
};

// Get pincodes by locality
export const getPincodesByLocality = async (localityId) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('localityId', sql.Int, localityId) // Use the correct input parameter for localityId
      .query('SELECT id, pincode FROM Pincodes WHERE locality_id = @localityId'); // Query to get pincodes by locality
    return result.recordset;  // Returns an array of pincodes for the specific locality
  } catch (err) {
    throw new Error('Failed to fetch pincodes');
  }
};


