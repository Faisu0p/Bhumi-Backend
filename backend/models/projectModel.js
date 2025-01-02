import sql from 'mssql';
import config from '../config/dbconfig.js';

// Model to add a project, its phases, units, and unit details
export const addProjectWithPhasesAndUnits = async (projectData) => {
  const pool = await sql.connect(config);

  const transaction = new sql.Transaction(pool);

  try {
    // Start the transaction
    await transaction.begin();

    // Insert into Projects table
    const projectResult = await transaction.request()
    .input('projectName', sql.NVarChar(255), projectData.projectName)
    .input('builderId', sql.Int, projectData.builderId)
    .input('launchDate', sql.Date, projectData.launchDate)
    .input('city', sql.NVarChar(100), projectData.city)
    .input('locality', sql.NVarChar(100), projectData.locality)
    .input('sublocality', sql.NVarChar(100), projectData.sublocality)
    .input('companyName', sql.NVarChar(255), projectData.companyName)
    .input('shortCode', sql.NVarChar(50), projectData.shortCode)
    .input('deliveryStatus', sql.NVarChar(50), projectData.deliveryStatus)
    .input('deliveryDate', sql.Date, projectData.deliveryDate)
    .input('reraNumber', sql.NVarChar(50), projectData.reraNumber)
    .input('totalTowers', sql.Int, projectData.totalTowers)
    .input('totalResidentialUnits', sql.Int, projectData.totalResidentialUnits)
    .input('totalCommercialUnits', sql.Int, projectData.totalCommercialUnits)
    .input('projectType', sql.NVarChar(100), projectData.projectType)
    .input('sectorBriefing', sql.Text, projectData.sectorBriefing)
    .input('projectBriefing', sql.Text, projectData.projectBriefing)
    .input('projectIsVerified', sql.Bit, projectData.projectIsVerified)
    .input('projectMedia', sql.VarChar, projectData.projectMedia)
    .input('state', sql.VarChar, projectData.state)
    .input('completeAddress', sql.VarChar, projectData.completeAddress)
    .input('landmark', sql.VarChar, projectData.landmark)
    .input('pinCode', sql.VarChar, projectData.pinCode)
    
    .query(`
      INSERT INTO Projects (
        Project_Name,Builder_id,Launch_Date,City,Locality,Sublocality,
        Company_Name,Short_Code,Delivery_Status,Delivery_Date,Rera_Number,
        Total_Towers,Total_Residential_Units,Total_Commercial_Units,
        Project_Type,Sector_Briefing,Project_Briefing,Project_isVerified,Project_Media,
        State,Complete_Address,Landmark,Pin_Code
        )

      VALUES (
        @projectName,@builderId,@launchDate,@city,@locality,@sublocality,
        @companyName,@shortCode,@deliveryStatus,@deliveryDate,@reraNumber,
        @totalTowers,@totalResidentialUnits,@totalCommercialUnits,
        @projectType,@sectorBriefing,@projectBriefing,@projectIsVerified,
        @projectMedia,@state,@completeAddress,@landmark,@pinCode
        );

      SELECT SCOPE_IDENTITY() AS Project_id;
`);
    

    const projectId = projectResult.recordset[0].Project_id;

    // Insert into Amenities table
    if (projectData.amenities && projectData.amenities.length > 0) {
      for (const amenity of projectData.amenities) {
        await transaction.request()

          .input('Project_id', sql.Int, projectId)
          .input('waterSupply', sql.Bit, amenity.waterSupply ?? 0)
          .input('powerBackup', sql.Bit, amenity.powerBackup ?? 0)
          .input('adequateParkingCoveredUncovered', sql.Bit, amenity.adequateParkingCoveredUncovered ?? 0)
          .input('gatedSecurityWithCctvSurveillance', sql.Bit, amenity.gatedSecurityWithCctvSurveillance ?? 0)
          .input('highSpeedElevators', sql.Bit, amenity.highSpeedElevators ?? 0)
          .input('fireSafetySystems', sql.Bit, amenity.fireSafetySystems ?? 0)
          .input('landscapedGardensParks', sql.Bit, amenity.landscapedGardensParks ?? 0)
          .input('joggingAndCyclingTracks', sql.Bit, amenity.joggingAndCyclingTracks ?? 0)
          .input('indoorGamesRoom', sql.Bit, amenity.indoorGamesRoom ?? 0)
          .input('sportsFacilities', sql.Bit, amenity.sportsFacilities ?? 0)
          .input('multipurposeHallForEvents', sql.Bit, amenity.multipurposeHallForEvents ?? 0)
          .input('rainwaterHarvesting', sql.Bit, amenity.rainwaterHarvesting ?? 0)
          .input('solarPowerPanels', sql.Bit, amenity.solarPowerPanels ?? 0)
          .input('sewageTreatmentPlant', sql.Bit, amenity.sewageTreatmentPlant ?? 0)
          .input('organicWasteComposting', sql.Bit, amenity.organicWasteComposting ?? 0)
          .input('energyEfficientLightingInCommonAreas', sql.Bit, amenity.energyEfficientLightingInCommonAreas ?? 0)
          .input('videoDoorPhones', sql.Bit, amenity.videoDoorPhones ?? 0)
          .input('digitalSmartLocks', sql.Bit, amenity.digitalSmartLocks ?? 0)
          .input('wiFiConnectivityInCommonAreas', sql.Bit, amenity.wiFiConnectivityInCommonAreas ?? 0)
          .input('intercomFacility', sql.Bit, amenity.intercomFacility ?? 0)
          .input('earthquakeResistantDesign', sql.Bit, amenity.earthquakeResistantDesign ?? 0)
          .input('shoppingArcadeConvenienceStore', sql.Bit, amenity.shoppingArcadeConvenienceStore ?? 0)
          .input('pharmacyClinic', sql.Bit, amenity.pharmacyClinic ?? 0)
          .input('cafeteriaRestaurant', sql.Bit, amenity.cafeteriaRestaurant ?? 0)
          .input('visitorParking', sql.Bit, amenity.visitorParking ?? 0)
          .input('dedicatedServiceElevators', sql.Bit, amenity.dedicatedServiceElevators ?? 0)
          .input('infinityPool', sql.Bit, amenity.infinityPool ?? 0)
          .input('skyLoungeTerraceGarden', sql.Bit, amenity.skyLoungeTerraceGarden ?? 0)
          .input('privateTheaterMediaRoom', sql.Bit, amenity.privateTheaterMediaRoom ?? 0)
          .input('businessCenterCoWorkingSpaces', sql.Bit, amenity.businessCenterCoWorkingSpaces ?? 0)
          .input('petFriendlyZones', sql.Bit, amenity.petFriendlyZones ?? 0)
          .input('amphitheaterOpenAirSeating', sql.Bit, amenity.amphitheaterOpenAirSeating ?? 0)
          .input('templePrayerRoom', sql.Bit, amenity.templePrayerRoom ?? 0)
          .input('seniorCitizenArea', sql.Bit, amenity.seniorCitizenArea ?? 0)
          .input('communityLibrary', sql.Bit, amenity.communityLibrary ?? 0)
          .input('barbecuePicnicZones', sql.Bit, amenity.barbecuePicnicZones ?? 0)
          .input('spaAndSauna', sql.Bit, amenity.spaAndSauna ?? 0)
          .input('meditationYogaDeck', sql.Bit, amenity.meditationYogaDeck ?? 0)
          .input('openGymFitnessStationsInThePark', sql.Bit, amenity.openGymFitnessStationsInThePark ?? 0)
          .input('walkingReflexologyPath', sql.Bit, amenity.walkingReflexologyPath ?? 0)
          .input('healthCheckUpKiosk', sql.Bit, amenity.healthCheckUpKiosk ?? 0)
          .input('electricVehicleEvChargingStations', sql.Bit, amenity.electricVehicleEvChargingStations ?? 0)
          .input('smartHomeAutomationFeatures', sql.Bit, amenity.smartHomeAutomationFeatures ?? 0)
          .input('automatedParkingSystems', sql.Bit, amenity.automatedParkingSystems ?? 0)
          .input('smartWasteManagementSystem', sql.Bit, amenity.smartWasteManagementSystem ?? 0)
          .input('appBasedVisitorManagementSystem', sql.Bit, amenity.appBasedVisitorManagementSystem ?? 0)
          .input('exclusivePrivatePoolsForPenthouses', sql.Bit, amenity.exclusivePrivatePoolsForPenthouses ?? 0)
          .input('helipad', sql.Bit, amenity.helipad ?? 0)
          .input('wineCellarOrTastingLounge', sql.Bit, amenity.wineCellarOrTastingLounge ?? 0)
          .input('golfSimulatorPuttingGreen', sql.Bit, amenity.golfSimulatorPuttingGreen ?? 0)
          .input('servicedApartmentsForGuests', sql.Bit, amenity.servicedApartmentsForGuests ?? 0)
          .input('dedicatedWorkFromHomeCabins', sql.Bit, amenity.dedicatedWorkFromHomeCabins ?? 0)
          .input('soundproofStudyPodsForStudents', sql.Bit, amenity.soundproofStudyPodsForStudents ?? 0)
          .input('conferenceRoomsWithAvFacilities', sql.Bit, amenity.conferenceRoomsWithAvFacilities ?? 0)
          .input('elearningZoneForKids', sql.Bit, amenity.elearningZoneForKids ?? 0)
          .input('artAndCraftStudioForHobbies', sql.Bit, amenity.artAndCraftStudioForHobbies ?? 0)
          .input('cricketNets', sql.Bit, amenity.cricketNets ?? 0)
          .input('skatingRink', sql.Bit, amenity.skatingRink ?? 0)
          .input('futsalCourt', sql.Bit, amenity.futsalCourt ?? 0)
          .input('archeryRange', sql.Bit, amenity.archeryRange ?? 0)
          .input('outdoorAdventureActivities', sql.Bit, amenity.outdoorAdventureActivities ?? 0)
          .input('artGalleryOrExhibitionHall', sql.Bit, amenity.artGalleryOrExhibitionHall ?? 0)
          .input('culturalAmphitheater', sql.Bit, amenity.culturalAmphitheater ?? 0)
          .input('danceAndMusicStudios', sql.Bit, amenity.danceAndMusicStudios ?? 0)
          .input('cookingClassZoneOrOpenKitchen', sql.Bit, amenity.cookingClassZoneOrOpenKitchen ?? 0)
          .input('eventPlazaForFestivals', sql.Bit, amenity.eventPlazaForFestivals ?? 0)
          .input('skywalkOrObservationDeck', sql.Bit, amenity.skywalkOrObservationDeck ?? 0)
          .input('waterfrontWithBoatingFacilities', sql.Bit, amenity.waterfrontWithBoatingFacilities ?? 0)
          .input('privateCabanasOrGazebos', sql.Bit, amenity.privateCabanasOrGazebos ?? 0)
          .input('luxuryConciergeServices', sql.Bit, amenity.luxuryConciergeServices ?? 0)
          .input('rooftopSolarObservatory', sql.Bit, amenity.rooftopSolarObservatory ?? 0)
          .input('emergencyPanicButtonsInCommonAreas', sql.Bit, amenity.emergencyPanicButtonsInCommonAreas ?? 0)
          .input('physicallyDisabledFriendlyPathwaysAndFacilities', sql.Bit, amenity.physicallyDisabledFriendlyPathwaysAndFacilities ?? 0)
          .input('dedicatedSpaceForAmbulanceParking', sql.Bit, amenity.dedicatedSpaceForAmbulanceParking ?? 0)
          .input('dedicatedDeliveryLockersForEcommerceParcels', sql.Bit, amenity.dedicatedDeliveryLockersForEcommerceParcels ?? 0)
          .input('droneDeliveryLandingZones', sql.Bit, amenity.droneDeliveryLandingZones ?? 0)
            

          .query(`
            INSERT INTO Amenities (
              Project_id, Water_Supply, Power_Backup, Adequate_Parking_Covered_Uncovered, 
              Gated_Security_with_CCTV_Surveillance, High_speed_Elevators, Fire_Safety_Systems, 
              Landscaped_Gardens_Parks, Jogging_and_Cycling_Tracks, Indoor_Games_Room, Sports_Facilities, 
              Multipurpose_Hall_for_Events, Rainwater_Harvesting, Solar_Power_Panels, Sewage_Treatment_Plant, 
              Organic_Waste_Composting, Energy_efficient_Lighting_in_Common_Areas, Video_Door_Phones, 
              Digital_Smart_Locks, Wi_Fi_Connectivity_in_Common_Areas, Intercom_Facility, Earthquake_resistant_Design, 
              Shopping_Arcade_Convenience_Store, Pharmacy_Clinic, Cafeteria_Restaurant, Visitor_Parking, 
              Dedicated_Service_Elevators, Infinity_Pool, Sky_Lounge_Terrace_Garden, Private_Theater_Media_Room, 
              Business_Center_Co_working_Spaces, Pet_friendly_Zones, Amphitheater_Open_air_Seating, Temple_Prayer_Room, 
              Senior_Citizen_Area, Community_Library, Barbecue_Picnic_Zones, Spa_and_Sauna, Meditation_Yoga_Deck, 
              Open_Gym_Fitness_Stations_in_the_Park, Walking_Reflexology_Path, Health_Check_up_Kiosk, 
              Electric_Vehicle_EV_Charging_Stations, Smart_Home_Automation_Features, Automated_Parking_Systems, 
              Smart_Waste_Management_System, App_based_Visitor_Management_System, Exclusive_Private_Pools_for_Penthouses, 
              Helipad, Wine_Cellar_or_Tasting_Lounge, Golf_Simulator_Putting_Green, Serviced_Apartments_for_Guests, 
              Dedicated_Work_from_Home_Cabins, Soundproof_Study_Pods_for_Students, Conference_Rooms_with_AV_Facilities, 
              E_learning_Zone_for_Kids, Art_and_Craft_Studio_for_Hobbies, Cricket_Nets, Skating_Rink, Futsal_Court, 
              Archery_Range, Outdoor_Adventure_Activities, Art_Gallery_or_Exhibition_Hall, Cultural_Amphitheater, 
              Dance_and_Music_Studios, Cooking_Class_Zone_or_Open_Kitchen, Event_Plaza_for_Festivals, 
              Skywalk_or_Observation_Deck, Waterfront_with_Boating_Facilities, Private_Cabanas_or_Gazebos, 
              Luxury_Concierge_Services, Rooftop_Solar_Observatory, Emergency_Panic_Buttons_in_Common_Areas, 
              Physically_Disabled_friendly_Pathways_and_Facilities, Dedicated_Space_for_Ambulance_Parking, 
              Dedicated_Delivery_Lockers_for_E_commerce_Parcels, Drone_Delivery_Landing_Zones
            ) 
            VALUES (
              @Project_id, @waterSupply, @powerBackup, @adequateParkingCoveredUncovered, 
              @gatedSecurityWithCctvSurveillance, @highSpeedElevators, @fireSafetySystems, 
              @landscapedGardensParks, @joggingAndCyclingTracks, @indoorGamesRoom, @sportsFacilities, 
              @multipurposeHallForEvents, @rainwaterHarvesting, @solarPowerPanels, @sewageTreatmentPlant, 
              @organicWasteComposting, @energyEfficientLightingInCommonAreas, @videoDoorPhones, 
              @digitalSmartLocks, @wiFiConnectivityInCommonAreas, @intercomFacility, @earthquakeResistantDesign, 
              @shoppingArcadeConvenienceStore, @pharmacyClinic, @cafeteriaRestaurant, @visitorParking, 
              @dedicatedServiceElevators, @infinityPool, @skyLoungeTerraceGarden, @privateTheaterMediaRoom, 
              @businessCenterCoworkingSpaces, @petFriendlyZones, @amphitheaterOpenAirSeating, @templePrayerRoom, 
              @seniorCitizenArea, @communityLibrary, @barbecuePicnicZones, @spaAndSauna, @meditationYogaDeck, 
              @openGymFitnessStationsInThePark, @walkingReflexologyPath, @healthCheckUpKiosk, 
              @electricVehicleEvChargingStations, @smartHomeAutomationFeatures, @automatedParkingSystems, 
              @smartWasteManagementSystem, @appBasedVisitorManagementSystem, @exclusivePrivatePoolsForPenthouses, 
              @helipad, @wineCellarOrTastingLounge, @golfSimulatorPuttingGreen, @servicedApartmentsForGuests, 
              @dedicatedWorkFromHomeCabins, @soundproofStudyPodsForStudents, @conferenceRoomsWithAvFacilities, 
              @elearningZoneForKids, @artAndCraftStudioForHobbies, @cricketNets, @skatingRink, @futsalCourt, 
              @archeryRange, @outdoorAdventureActivities, @artGalleryOrExhibitionHall, @culturalAmphitheater, 
              @danceAndMusicStudios, @cookingClassZoneOrOpenKitchen, @eventPlazaForFestivals, 
              @skywalkOrObservationDeck, @waterfrontWithBoatingFacilities, @privateCabanasOrGazebos, 
              @luxuryConciergeServices, @rooftopSolarObservatory, @emergencyPanicButtonsInCommonAreas, 
              @physicallyDisabledFriendlyPathwaysAndFacilities, @dedicatedSpaceForAmbulanceParking, 
              @dedicatedDeliveryLockersForEcommerceParcels, @droneDeliveryLandingZones
            );
          `);
          
      }
    }

    // Insert into Phases table
    for (const phase of projectData.phases) {
      const phaseResult = await transaction.request()

        .input('Project_id', sql.Int, projectId)
        .input('phaseNumber', sql.Int, phase.phaseNumber)
        .input('reraNumber', sql.NVarChar(50), phase.reraNumber)
        .input('phaseStatus', sql.NVarChar(50), phase.phaseStatus)
        .input('deliveryDate', sql.Date, phase.deliveryDate)
        .input('totalTowers', sql.Int, phase.totalTowers)
        .input('phaseDescription', sql.Text, phase.phaseDescription)
        .input('startDate', sql.Date, phase.startDate)
        
        .query(`
          INSERT INTO Phases (
            Project_id, Phase_Number, Rera_Number, Phase_Status, Delivery_Date, 
            Total_Towers, Phase_Description, Start_Date
          )
          VALUES (
            @Project_id, @phaseNumber, @reraNumber, @phaseStatus, @deliveryDate, 
            @totalTowers, @phaseDescription, @startDate
          );
          SELECT SCOPE_IDENTITY() AS Phase_id;
        `);
      

      const phaseId = phaseResult.recordset[0].Phase_id;

      // Insert into Units table for this phase
      for (const unit of phase.units) {
        const unitResult = await transaction.request()

          .input('Phase_id', sql.Int, phaseId)
          .input('unitCategory', sql.NVarChar(50), unit.unitCategory)
          .input('unitType', sql.NVarChar(50), unit.unitType)
          .input('superArea', sql.Decimal, unit.superArea)
          .input('unitFurnishedStatus', sql.NVarChar(50), unit.unitFurnishedStatus)
          .input('unitFriendlyName', sql.NVarChar(255), unit.unitFriendlyName)
          .input('buildUpArea', sql.Decimal, unit.buildUpArea)
          .input('carpetArea', sql.Decimal, unit.carpetArea)
          .input('unitLayout', sql.NVarChar, unit.unitLayout)
          
          .query(`
            INSERT INTO Units (
              Phase_id, Unit_Category, Unit_Type, Super_Area, Unit_Furnished_Status, 
              Unit_Friendly_Name, Build_Up_Area, Carpet_Area, Unit_Layout
            )
            VALUES (
              @Phase_id, @unitCategory, @unitType, @superArea, @unitFurnishedStatus, 
              @unitFriendlyName, @buildUpArea, @carpetArea, @unitLayout
            );
            SELECT SCOPE_IDENTITY() AS Unit_id;
          `);
        

        const unitId = unitResult.recordset[0].Unit_id;

        // Insert into Unit_Details table for this unit
        for (const detail of unit.unitDetails
          
        ) {
          await transaction.request()

            .input('Unit_id', sql.Int, unitId)
            .input('unitSize', sql.Decimal, detail.unitSize)  
            .input('unitFurnishedStatus', sql.NVarChar(50), detail.unitFurnishedStatus) 
            .input('spaceType', sql.VarChar(255), detail.spaceType)
            .input('unitLength', sql.Decimal, detail.unitLength)
            .input('unitBredth', sql.Decimal, detail.unitBredth)
            
            .query(`
              INSERT INTO Units_Details (Unit_id, Unit_Size, 
              Unit_Furnished_Status, Space_Type, Unit_Length, Unit_Bredth)
              VALUES (@Unit_id, @unitSize, 
              @unitFurnishedStatus, @spaceType, @unitLength, @unitBredth);
            `);
            
        }
      }
    }

    // Commit the transaction
    await transaction.commit();

    return { success: true, projectId, message: 'Project, phases, units, and details added successfully!' };
  } catch (error) {
    // Rollback the transaction on error
    await transaction.rollback();
    console.error('Error adding project:', error.message);
    throw new Error('Error adding project and related data');
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

// Verify Project by ID
export const verifyProjectById = async (projectId) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('projectId', sql.Int, projectId)
      .query(`
        UPDATE Projects
        SET Project_isVerified = 1
        WHERE Project_id = @projectId;
      `);

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error('Error verifying project by ID:', err.message);
    throw new Error('Error updating project verification status');
  }
};


// Get Project ID and Names
export const getProjects = async () => {
  try {
    const pool = await sql.connect(config); 

    const result = await pool.request().query(`
      SELECT Project_id, Project_Name
      FROM Projects;
    `);

    return result.recordset;
  } catch (err) {
    console.error('Error fetching projects:', err.message);
    throw err;
  }
};


