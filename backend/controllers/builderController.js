import { createBuilder, getBuilders, verifyBuilderById, getAllBuildersInfo } from '../models/builderModel.js';

//Add New Builder or Create New Builder
export const addBuilder = async (req, res) => {
  const builderData = req.body;

  try {
    const {
      city,
      builderCompleteName,
      builderShortName,
      builderLogo,
      yearsInRealEstate,
      shortDescription,
    } = builderData;

    if (
      !city ||
      !builderCompleteName ||
      !builderShortName ||
      !builderLogo ||
      !yearsInRealEstate ||
      !shortDescription
    ) {
      return res.status(400).json({
        message: 'All fields are required: city, builderCompleteName, builderShortName, builderLogo, yearsInRealEstate, and shortDescription.',
      });
    }

    const result = await createBuilder({
      city,
      builderCompleteName,
      builderShortName,
      builderLogo,
      yearsInRealEstate,
      shortDescription,
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


