import { createBuilder, getBuilders, 
  verifyBuilderById, getAllBuildersInfo, 
  getVerifiedBuilders, getBuilderById,
  rejectBuilderById, updateBuilder } from '../models/builderModel.js';

// Add New Builder or Create New Builder
export const addBuilder = async (req, res) => {
  const builderData = req.body;

  try {
    const {
      citiesAndStates, // Array of { state, city } pairs
      builderCompleteName,
      builderShortName,
      builderLogo,
      yearsInRealEstate,
      shortDescription,
      builderLogoRectangle
    } = builderData;

    if (
      !citiesAndStates || !Array.isArray(citiesAndStates) || citiesAndStates.length === 0 ||
      !builderCompleteName ||
      !builderShortName ||
      !builderLogo ||
      !yearsInRealEstate ||
      !shortDescription ||
      !builderLogoRectangle
    ) {
      return res.status(400).json({
        message: 'All fields are required: citiesAndStates (array of state-city), builderCompleteName, builderShortName, builderLogo, yearsInRealEstate, shortDescription, builderLogoRectangle',
      });
    }

    // Call the function to create the builder and insert related state-city data
    const result = await createBuilder({
      citiesAndStates, 
      builderCompleteName,
      builderShortName,
      builderLogo,
      yearsInRealEstate,
      shortDescription,
      builderLogoRectangle
    });

    if (result > 0) {
      res.status(201).json({ message: 'Builder added successfully' });
    } else {
      res.status(400).json({ message: 'Failed to add builder' });
    }
  } catch (error) {
    console.error('Error in addBuilder controller:', error.message);
    res.status(500).json({ message: 'Error adding builder', error: error.message });
  }
};


// Edit Existing Builder
export const editBuilder = async (req, res) => {
  const builderId = parseInt(req.params.id, 10); // Get builder ID from request parameters
  const builderData = req.body;

  try {
    const {
      citiesAndStates, // Array of { state, city } pairs
      builderCompleteName,
      builderShortName,
      builderLogo,
      yearsInRealEstate,
      shortDescription,
      builderLogoRectangle
    } = builderData;

    // Validate required fields
    if (
      !builderId || isNaN(builderId) ||
      !citiesAndStates || !Array.isArray(citiesAndStates) || citiesAndStates.length === 0 ||
      !builderCompleteName ||
      !builderShortName ||
      !builderLogo ||
      !yearsInRealEstate ||
      !shortDescription ||
      !builderLogoRectangle
    ) {
      return res.status(400).json({
        message: 'All fields are required: builderId, citiesAndStates (array of state-city), builderCompleteName, builderShortName, builderLogo, yearsInRealEstate, shortDescription, builderLogoRectangle',
      });
    }

    // Call the function to edit the builder and update related state-city data
    const result = await updateBuilder(builderId, {
      citiesAndStates,
      builderCompleteName,
      builderShortName,
      builderLogo,
      yearsInRealEstate,
      shortDescription,
      builderLogoRectangle
    });

    if (result.success) {
      res.status(200).json({ message: 'Builder updated successfully' });
    } else {
      res.status(400).json({ message: 'Failed to update builder' });
    }
  } catch (error) {
    console.error('Error in editBuilder controller:', error.message);
    res.status(500).json({ message: 'Error updating builder', error: error.message });
  }
};





//Get Builder id and Names
export const fetchBuilders = async (req, res) => {
  try {
    const builders = await getBuilders();

    if (!builders || builders.length === 0) {
      return res.status(404).json({ message: 'No builders found.' });
    }

    return res.status(200).json({
      message: 'Builders fetched successfully.',
      data: builders,
    });
  } catch (err) {
    console.error('Error fetching builders:', err.message);
    return res.status(500).json({
      message: 'An error occurred while fetching builders.',
      error: err.message,
    });
  }
};


// Controller to verify a builder by their ID
export const verifyBuilder = async (req, res) => {
  const { builderId } = req.body;

  if (!builderId) {
    return res.status(400).json({ message: 'Builder ID is required' });
  }

  try {
    const isVerified = await verifyBuilderById(builderId);

    if (isVerified) {
      return res.status(200).json({ message: 'Builder verified successfully.' });
    } else {
      return res.status(404).json({ message: 'Builder not found or already verified.' });
    }
  } catch (err) {
    console.error('Error verifying builder by ID:', err.message);
    return res.status(500).json({ message: 'An error occurred while verifying the builder by ID', error: err.message });
  }
};

// Controller to reject a builder by their ID
export const rejectBuilder = async (req, res) => {
  const { builderId } = req.body;

  if (!builderId) {
    return res.status(400).json({ message: 'Builder ID is required' });
  }

  try {
    const isRejected = await rejectBuilderById(builderId); // Call the reject function

    if (isRejected) {
      return res.status(200).json({ message: 'Builder rejected successfully.' });
    } else {
      return res.status(404).json({ message: 'Builder not found or already rejected.' });
    }
  } catch (err) {
    console.error('Error rejecting builder by ID:', err.message);
    return res.status(500).json({ message: 'An error occurred while rejecting the builder by ID', error: err.message });
  }
};



// Controller to fetch all builders' information
export const getAllBuildersDetails = async (req, res) => {
  try {
    const builders = await getAllBuildersInfo();

    if (builders.length === 0) {
      return res.status(404).json({ message: 'No builders found.' });
    }

    return res.status(200).json({
      message: 'Builders fetched successfully.',
      data: builders,
    });
  } catch (err) {
    console.error('Error fetching builders information:', err.message);
    return res.status(500).json({
      message: 'An error occurred while fetching builders information.',
      error: err.message,
    });
  }
};




// Controller to fetch only verified builders
export const fetchVerifiedBuilders = async (req, res) => {
  try {
    const verifiedBuilders = await getVerifiedBuilders();

    if (verifiedBuilders.length === 0) {
      return res.status(404).json({ message: 'No verified builders found.' });
    }

    return res.status(200).json({
      message: 'Verified builders fetched successfully.',
      data: verifiedBuilders,
    });
  } catch (err) {
    console.error('Error fetching verified builders:', err.message);
    return res.status(500).json({
      message: 'An error occurred while fetching verified builders.',
      error: err.message,
    });
  }
};



// Controller to handle fetching builder details by ID (for Manage page)
export const getBuilderDetails = async (req, res) => {
  const builderId = parseInt(req.params.id); // Get Builder_id from the URL parameter

  try {
    // Call the model function to get builder details
    const builderDetails = await getBuilderById(builderId);

    // Send the builder details as the response
    res.status(200).json(builderDetails);
  } catch (error) {
    // Handle error if any occurs during fetching the builder details
    console.error('Error in getBuilderDetails controller:', error.message);
    res.status(500).json({ error: error.message });
  }
};

