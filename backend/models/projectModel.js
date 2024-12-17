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
      .input('ProjectIsVerified', sql.Bit, projectDetails.projectIsVerified)
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
      .input('Start_Date', sql.Date, phaseData.Start_Date)
      .input('Delivery_Date', sql.Date, phaseData.Delivery_Date)
      .input('Total_Towers', sql.Int, phaseData.Total_Towers)
      .input('Phase_Description', sql.Text, phaseData.Phase_Description)
      .query(`
        INSERT INTO Phases
        (Project_id, Phase_Number, Rera_Number, Phase_Status, Start_Date, Delivery_Date, Total_Towers, Phase_Description)
        VALUES (@Project_id, @Phase_Number, @Rera_Number, @Phase_Status, @Start_Date, @Delivery_Date, @Total_Towers, @Phase_Description);
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

    // Insert unit into Units table
    const result = await pool.request()
      .input('Phase_id', sql.Int, phaseId)
      .input('UnitCategory', sql.VarChar(50), unit.unitCategory) 
      .input('UnitType', sql.VarChar(50), unit.unitType)
      .input('Super_Area', sql.Float, unit.super_area)
      .input('UnitFurnishedStatus', sql.VarChar(50), unit.furnished) // Furnished status for the unit
      .input('UnitFriendlyName', sql.VarChar(50), unit.Friendly_name)
      .input('BuildUpArea', sql.Float, unit.build_area)
      .input('CarpetArea', sql.Float, unit.carpet_area)
      .input('UnitLayout', sql.VarChar(200), unit.layout)
      .query(`
        INSERT INTO Units
        (Phase_id, Unit_Category, Unit_Type, Super_Area, Unit_Furnished_Status, Unit_Friendly_Name, Build_Up_Area, Carpet_Area, Unit_Layout)
        VALUES (@Phase_id, @UnitCategory, @UnitType, @Super_Area, @UnitFurnishedStatus, @UnitFriendlyName, @BuildUpArea, @CarpetArea, @UnitLayout);
        SELECT SCOPE_IDENTITY() AS Unit_id;
      `);

    const unitId = result.recordset[0].Unit_id;

    // Ensure unitDetails is an array before iterating over it
    if (Array.isArray(unit.unitDetails) && unit.unitDetails.length > 0) {
      // Insert unit details into Units_Details table
      for (const detail of unit.unitDetails) {
        await pool.request()
          .input('Unit_id', sql.Int, unitId)
          .input('Unit_Size', sql.Float, detail.spaceArea) // This is the Unit_Size for the space in the unit
          .input('UnitFurnishedStatus', sql.VarChar(50), detail.furnished_status) // Furnished status for the space in the unit
          .input('Space_Type', sql.VarChar(50), detail.spaceType) // Space type (e.g., bedroom, living room)
          .query(`
            INSERT INTO Units_Details
            (Unit_id, Unit_Size, Unit_Furnished_Status, Space_Type)
            VALUES (@Unit_id, @Unit_Size, @UnitFurnishedStatus, @Space_Type);
          `);
      }
    }

    return { success: true, unitId, message: 'Unit and unit details added successfully!' };
  } catch (err) {
    console.error('Error adding unit:', err.message);
    throw new Error('Error adding unit');
  }
};



// Model to add amenities to the Amenities table
export const addAmenities = async (projectId, amenities) => {
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('Project_id', sql.Int, projectId)
      .input('Swimming_Pool', sql.Bit, amenities["Swimming_Pool"] ? 1 : 0)
      .input('Gymnasium', sql.Bit, amenities["Gymnasium"] ? 1 : 0)
      .input('Clubhouse', sql.Bit, amenities["Clubhouse"] ? 1 : 0)
      .input('Children_Play_Area', sql.Bit, amenities["Children_Play_Area"] ? 1 : 0)
      .input('Parking', sql.Bit, amenities["Parking"] ? 1 : 0)
      .input('Security_Guards', sql.Bit, amenities["Security_Guards"] ? 1 : 0)
      .input('CCTV_Surveillance', sql.Bit, amenities["CCTV_Surveillance"] ? 1 : 0)
      .input('Power_Backup', sql.Bit, amenities["Power_Backup"] ? 1 : 0)
      .input('Water_Supply', sql.Bit, amenities["Water_Supply"] ? 1 : 0)
      .input('Elevator', sql.Bit, amenities["Elevator"] ? 1 : 0)
      
      .query(`
        INSERT INTO Amenities
        (Project_id, Swimming_Pool, Gymnasium, Clubhouse, Children_Play_Area, Parking, 
        Security_Guards, CCTV_Surveillance, Power_Backup, Water_Supply, Elevator)
        VALUES 
        (@Project_id, @Swimming_Pool, @Gymnasium, @Clubhouse, @Children_Play_Area, @Parking, 
        @Security_Guards, @CCTV_Surveillance, @Power_Backup, @Water_Supply, @Elevator);
      `);

    return { success: true, message: 'Amenities added successfully!' };
  } catch (err) {
    console.error('Error adding amenities:', err.message);
    throw new Error('Error adding amenities');
  }
};




// Model to get all projects from the database
 export const getAllProjects = async () => {
   try {
     const pool = await sql.connect(config);
     const result = await pool.request().query(`
       SELECT 
         p.Project_Name, 
         p.City, 
         b.FullName AS BuilderName, 
         p.Total_Towers, 
         p.Company_Name, 
         p.Project_Briefing
       FROM 
         Projects p
       INNER JOIN 
         Builders b ON p.Builder_id = b.Builder_id;
     `);
  
     if (result.recordset.length > 0) {
       return { success: true, data: result.recordset };
     } else {
       return { success: false, message: 'No projects found' };
     }
   } catch (err) {
     console.error('Error fetching all projects:', err.message);
     throw new Error('Error fetching all projects');
   }
 };
