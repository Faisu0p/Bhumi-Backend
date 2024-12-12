// dbconfig.js
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from a .env file

// Configuration object for SQL Server connection
const config = {
  user: process.env.DB_USER, // Database user from environment variable
  password: process.env.DB_PASSWORD, // Database password from environment variable
  server: process.env.DB_SERVER, // Database server from environment variable
  database: process.env.DB_NAME, // Database name from environment variable
  options: {
    encrypt: true, // Encrypt the connection
    trustServerCertificate: true, // Trust the server certificate (useful for local development)
  },
};

// Function to connect to the database
export async function connectToDatabase() {
  try {
    await sql.connect(config); // Connect using the config
    console.log('Connected to the database');
  } catch (err) {
    console.error('Database connection failed:', err); // Log error if connection fails
    process.exit(1); // Exit the process if the connection fails
  }
}

// Function to run SQL queries
export async function query(sqlQuery, params = []) {
  try {
    const pool = await sql.connect(config); // Establish a connection to the database
    const request = pool.request(); // Create a new request object

    // Loop through the parameters and add them to the request
    params.forEach((param, index) => {
      request.input(`param${index}`, param); // Input parameter (e.g., @param0, @param1, etc.)
    });

    const result = await request.query(sqlQuery); // Execute the SQL query
    return result.recordset; // Return the results of the query
  } catch (err) {
    console.error('Error executing query:', err); // Log error if query fails
    throw err; // Throw the error to be handled elsewhere
  }
}

export default config; // Export the config as the default export
