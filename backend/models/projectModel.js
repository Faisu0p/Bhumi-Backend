import sql from 'mssql';
import config from '../config/dbconfig.js';

// Model to add project to the Projects table
export const addProject = async (projectDetails) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('ProjectName', sql.VarChar(100), projectDetails.projectName)
      .input('BuilderId', sql.Int, projectDetails.builderId)
      .input('LaunchDate', sql.Date, projectDetails.launchDate)
      .input('City', sql.VarChar(100), projectDetails.city)
      .input('Locality', sql.VarChar(100), projectDetails.locality)
      .input('Sublocality', sql.VarChar(100), projectDetails.sublocality)
      .input('CompanyName', sql.VarChar(100), projectDetails.companyName)
      .input('ShortCode', sql.VarChar(100), projectDetails.shortCode)
      .input('DeliveryStatus', sql.VarChar(50), projectDetails.deliveryStatus)
      .input('DeliveryDate', sql.Date, projectDetails.deliveryDate)
      .input('ReraNumber', sql.VarChar(100), projectDetails.reraNumber)
      .input('TotalTowers', sql.Int, projectDetails.totalTowers)
      .input('TotalResidentialUnits', sql.Int, projectDetails.totalResidentialUnits)
      .input('TotalCommercialUnits', sql.Int, projectDetails.totalCommercialUnits)
      .input('ProjectType', sql.VarChar(50), projectDetails.projectType)
      .input('SectorBriefing', sql.Text, projectDetails.sectorBriefing)
      .input('ProjectBriefing', sql.Text, projectDetails.projectBriefing)
      .input('ProjectIsVerified', sql.Bit, projectDetails.projectIsVerified) // New field
      .query(`
        INSERT INTO Projects
        (Project_Name, Builder_id, Launch_Date, City, Locality, Sublocality, Company_Name, Short_Code, 
        Delivery_Status, Delivery_Date, Rera_Number, Total_Towers, Total_Residential_Units, Total_Commercial_Units, 
        Project_Type, Sector_Briefing, Project_Briefing, Project_isVerified)
        VALUES 
        (@ProjectName, @BuilderId, @LaunchDate, @City, @Locality, @Sublocality, @CompanyName, @ShortCode, 
        @DeliveryStatus, @DeliveryDate, @ReraNumber, @TotalTowers, @TotalResidentialUnits, @TotalCommercialUnits, 
        @ProjectType, @SectorBriefing, @ProjectBriefing, @ProjectIsVerified);
        SELECT SCOPE_IDENTITY() AS Project_id;
      `);

    return { success: true, projectId: result.recordset[0].Project_id, message: 'Project added successfully!' };
  } catch (err) {
    console.error('Error adding project:', err.message);
    throw new Error('Error adding project');
  }
};

// Model to add phase to the Phases table
export const addPhase = async (phaseData) => {
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('Project_id', sql.Int, phaseData.Project_id)
      .input('Phase_Number', sql.Int, phaseData.Phase_Number)
      .input('Rera_Number', sql.VarChar(100), phaseData.Rera_Number)
      .input('Phase_Status', sql.VarChar(50), phaseData.Phase_Status)
      .input('Delivery_Date', sql.Date, phaseData.Delivery_Date)
      .input('Total_Towers', sql.Int, phaseData.Total_Towers)
      .input('Phase_Description', sql.Text, phaseData.Phase_Description) // New field
      .query(`
        INSERT INTO Phases
        (Project_id, Phase_Number, Rera_Number, Phase_Status, Delivery_Date, Total_Towers, Phase_Description)
        VALUES (@Project_id, @Phase_Number, @Rera_Number, @Phase_Status, @Delivery_Date, @Total_Towers, @Phase_Description);
      `);

    return { success: true, message: "Phase added successfully!" };
  } catch (err) {
    console.error('Error adding phase:', err.message);
    throw new Error('Error adding phase');
  }
};

// Model to add unit to the Units table
export const addUnit = async (phaseId, unit) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('Phase_id', sql.Int, phaseId)
      .input('UnitCategory', sql.VarChar(50), unit.unitCategory) // New field for unit category
      .input('UnitType', sql.VarChar(50), unit.unitType)
      .input('UnitSize', sql.Float, unit.unitSize)
      .input('UnitFurnishedStatus', sql.VarChar(50), unit.unitFurnishedStatus) // Furnished status field
      .query(`
        INSERT INTO Units
        (Phase_id, Unit_Category, Unit_Type, Unit_Size, Unit_Furnished_Status)
        VALUES (@Phase_id, @UnitCategory, @UnitType, @UnitSize, @UnitFurnishedStatus);
        SELECT SCOPE_IDENTITY() AS Unit_id;
      `);

    const unitId = result.recordset[0].Unit_id;

    // Insert unit details into Units_Details table
    for (const detail of unit.unitDetails) {
      await pool.request()
        .input('Unit_id', sql.Int, unitId)
        .input('UnitSize', sql.Float, detail.unitSize)
        .input('UnitFurnishedStatus', sql.VarChar(50), detail.unitFurnishedStatus) // Furnished status field
        .query(`
          INSERT INTO Units_Details
          (Unit_id, Unit_Size, Unit_Furnished_Status)
          VALUES (@Unit_id, @UnitSize, @UnitFurnishedStatus);
        `);
    }

    return { success: true, message: 'Unit and unit details added successfully!' };
  } catch (err) {
    console.error('Error adding unit:', err.message);
    throw new Error('Error adding unit');
  }
};

// Model to add unit details to the Units_Details table
export const addUnitDetail = async (unitId, unitDetail) => {
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('Unit_id', sql.Int, unitId)
      .input('UnitSize', sql.Float, unitDetail.unitSize)
      .input('UnitFurnishedStatus', sql.VarChar(50), unitDetail.unitFurnishedStatus) // Furnished status field
      .query(`
        INSERT INTO Units_Details
        (Unit_id, Unit_Size, Unit_Furnished_Status)
        VALUES (@Unit_id, @UnitSize, @UnitFurnishedStatus);
      `);

    return { success: true, message: 'Unit detail added successfully!' };
  } catch (err) {
    console.error('Error adding unit detail:', err.message);
    throw new Error('Error adding unit detail');
  }
};


// Model to get all projects from the database
// export const getAllProjects = async () => {
//   try {
//     const pool = await sql.connect(config);
//     const result = await pool.request().query(`
//       SELECT 
//         p.Project_Name, 
//         p.City, 
//         b.FullName AS BuilderName, 
//         p.Total_Towers, 
//         p.Company_Name, 
//         p.Project_Briefing
//       FROM 
//         Projects p
//       INNER JOIN 
//         Builders b ON p.Builder_id = b.Builder_id;
//     `);
    
//     if (result.recordset.length > 0) {
//       return { success: true, data: result.recordset };
//     } else {
//       return { success: false, message: 'No projects found' };
//     }
//   } catch (err) {
//     console.error('Error fetching all projects:', err.message);
//     throw new Error('Error fetching all projects');
//   }
// };
