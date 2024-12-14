import sql from 'mssql';
import config from '../config/dbconfig.js';

// Model to add project to the ProjectDetails table
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
      .query(`
        INSERT INTO Projects
        (Project_Name, Builder_id, Launch_Date, City, Locality, Sublocality, Company_Name, Short_Code, 
        Delivery_Status, Delivery_Date, Rera_Number, Total_Towers, Total_Residential_Units, Total_Commercial_Units, Project_Type, Sector_Briefing, Project_Briefing)
        VALUES (@ProjectName, @BuilderId, @LaunchDate, @City, @Locality, @Sublocality, @CompanyName, @ShortCode, 
        @DeliveryStatus, @DeliveryDate, @ReraNumber, @TotalTowers, @TotalResidentialUnits, @TotalCommercialUnits, @ProjectType, @SectorBriefing, @ProjectBriefing);
      `);

    return { success: true, message: 'Project added successfully!' };
  } catch (err) {
    console.error('Error adding project:', err.message);
    throw new Error('Error adding project');
  }
};


// Model to add phase to the Phases table
export const addPhase = async (phaseData) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('Project_id', sql.Int, phaseData.Project_id)
      .input('Phase_Number', sql.Int, phaseData.Phase_Number)
      .input('Rera_Number', sql.VarChar(100), phaseData.Rera_Number)
      .input('Phase_Status', sql.VarChar(50), phaseData.Phase_Status)
      .input('Delivery_Date', sql.Date, phaseData.Delivery_Date)
      .input('Total_Towers', sql.Int, phaseData.Total_Towers)
      .query(`
        INSERT INTO Phases (Project_id, Phase_Number, Rera_Number, Phase_Status, Delivery_Date, Total_Towers)
        VALUES (@Project_id, @Phase_Number, @Rera_Number, @Phase_Status, @Delivery_Date, @Total_Towers);
      `);

    return { success: true, message: "Phase added successfully!" };
  } catch (err) {
    console.error('Error adding phase:', err.message);
    throw new Error('Error adding phase');
  }
};


// Model to add residential unit to the ResidentialUnits table
export const addResidentialUnit = async (projectId, unit) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('Project_id', sql.Int, projectId)
      .input('UnitType', sql.VarChar(50), unit.unitType)
      .input('Size', sql.Float, unit.size)
      .input('Layout', sql.VarChar(50), unit.layout)
      .input('Facing', sql.VarChar(50), unit.facing)
      .input('Bedrooms', sql.Int, unit.bedrooms)
      .input('Bathrooms', sql.Int, unit.bathrooms)
      .input('Balconies', sql.Int, unit.balconies)
      .input('StudyRoom', sql.Bit, unit.studyRoom)
      .input('ServantRoom', sql.Bit, unit.servantRoom)
      .input('PoojaRoom', sql.Bit, unit.poojaRoom)
      .input('FullyFurnished', sql.Bit, unit.fullyFurnished)
      .input('SemiFurnished', sql.Bit, unit.semiFurnished)
      .input('Unfurnished', sql.Bit, unit.unfurnished)
      .query(`
        INSERT INTO Residential_Units (Project_id, Unit_Type, Size, Layout, Facing, Bedrooms, Bathrooms, Balconies, 
                                      Study_Room, Servant_Room, Pooja_Room, Fully_Furnished, Semi_Furnished, Unfurnished)
        VALUES (@Project_id, @UnitType, @Size, @Layout, @Facing, @Bedrooms, @Bathrooms, @Balconies, 
                @StudyRoom, @ServantRoom, @PoojaRoom, @FullyFurnished, @SemiFurnished, @Unfurnished);
      `);

    return { success: true, message: 'Residential Unit added successfully!' };
  } catch (err) {
    console.error('Error adding residential unit:', err.message);
    throw new Error('Error adding residential unit');
  }
};



// Model to add commercial unit to the CommercialUnits table
export const addCommercialUnit = async (projectId, unit) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('Project_id', sql.Int, projectId)
      .input('UnitType', sql.VarChar(50), unit.unitType)
      .input('Size', sql.Float, unit.size)
      .input('Layout', sql.VarChar(50), unit.layout)
      .input('FloorArea', sql.Float, unit.floorArea)
      .input('Facing', sql.VarChar(50), unit.facing)
      .input('ParkingSpaces', sql.Int, unit.parkingSpaces)
      .input('IsRenovated', sql.Bit, unit.isRenovated)
      .input('CommercialFurnishings', sql.Bit, unit.commercialFurnishings)
      .query(`
        INSERT INTO Commercial_Units (Project_id, Unit_Type, Size, Layout, Floor_Area, Facing, Parking_Spaces, Is_Renovated, Commercial_Furnishings)
        VALUES (@Project_id, @UnitType, @Size, @Layout, @FloorArea, @Facing, @ParkingSpaces, @IsRenovated, @CommercialFurnishings);
      `);

    return { success: true, message: 'Commercial Unit added successfully!' };
  } catch (err) {
    console.error('Error adding commercial unit:', err.message);
    throw new Error('Error adding commercial unit');
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
        b.FullName, 
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

