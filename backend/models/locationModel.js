import sql from 'mssql';
import config from '../config/dbconfig.js';

// Add State
export const addState = async (stateName) => {
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('StateName', sql.NVarChar, stateName)
      .query(`
        INSERT INTO States (name)
        VALUES (@StateName);
      `);

    return { message: 'State added successfully' };
  } catch (err) {
    throw new Error('Failed to add state');
  }
};

// Add City
export const addCity = async (cityName, stateId) => {
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('CityName', sql.NVarChar, cityName)
      .input('StateId', sql.Int, stateId)
      .query(`
        INSERT INTO Cities (name, state_id)
        VALUES (@CityName, @StateId);
      `);

    return { message: 'City added successfully' };
  } catch (err) {
    throw new Error('Failed to add city');
  }
};

// Add Locality
export const addLocality = async (localityName, cityId) => {
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('LocalityName', sql.NVarChar, localityName)
      .input('CityId', sql.Int, cityId)
      .query(`
        INSERT INTO Localities (name, city_id)
        VALUES (@LocalityName, @CityId);
      `);

    return { message: 'Locality added successfully' };
  } catch (err) {
    throw new Error('Failed to add locality');
  }
};

// Add SubLocality
export const addSubLocality = async (subLocalityName, localityId) => {
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('SubLocalityName', sql.NVarChar, subLocalityName)
      .input('LocalityId', sql.Int, localityId)
      .query(`
        INSERT INTO SubLocalities (name, locality_id)
        VALUES (@SubLocalityName, @LocalityId);
      `);

    return { message: 'SubLocality added successfully' };
  } catch (err) {
    throw new Error('Failed to add sublocality');
  }
};

// Add Pincode
export const addPincode = async (pincode, localityId) => {
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('Pincode', sql.NVarChar, pincode)
      .input('LocalityId', sql.Int, localityId)
      .query(`
        INSERT INTO Pincodes (pincode, locality_id)
        VALUES (@Pincode, @LocalityId);
      `);

    return { message: 'Pincode added successfully' };
  } catch (err) {
    throw new Error('Failed to add pincode');
  }
};




// Get all States
export const getStates = async () => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .query('SELECT id, name FROM States');

    return result.recordset;  // Returns an array of states with id and name
  } catch (err) {
    throw new Error('Failed to fetch states');
  }
};

// Get all Cities
export const getCities = async () => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .query('SELECT id, name FROM Cities'); // Query to fetch id and name of all cities

    return result.recordset;  // Returns an array of cities with id and name
  } catch (err) {
    throw new Error('Failed to fetch cities');
  }
};

// Get all Localities
export const getLocalities = async () => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .query('SELECT id, name FROM Localities');  // Query to fetch id and name of all localities

    return result.recordset;  // Returns an array of localities with id and name
  } catch (err) {
    throw new Error('Failed to fetch localities');
  }
};





