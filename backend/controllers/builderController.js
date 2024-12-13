import { getAllBuilders, createBuilder, getBuildersName, verifyBuilder } from '../models/builderModel.js';

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

export const getBuilders = async (req, res) => {
  try {
    const builders = await getAllBuilders();
    res.status(200).json(builders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching builders', error });
  }
};

export const getBuildersNames = async (req, res) => {
  try {
    const builders = await getBuildersName();
    res.status(200).json(builders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching builder names', error });
  }
};

export const verifyBuilderByName = async (req, res) => {
  const { builderCompleteName } = req.body;
  try {
    const result = await verifyBuilder(builderCompleteName);
    if (result) {
      res.status(200).json({ message: 'Builder verified successfully' });
    } else {
      res.status(400).json({ message: 'Failed to verify builder' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying builder', error });
  }
};
