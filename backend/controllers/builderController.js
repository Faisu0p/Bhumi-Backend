import { getAllBuilders, createBuilder, getBuildersName, verifyBuilder } from '../models/builderModel.js';

export const getBuilders = async (req, res) => {
  try {
    const builders = await getAllBuilders();
    res.status(200).json(builders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching builders', error });
  }
};


export const addBuilder = async (req, res) => {
  const builderData = req.body;
  try {
    const result = await createBuilder(builderData);
    if (result > 0) {
      res.status(201).json({ message: 'Builder added successfully' });
    } else {
      res.status(400).json({ message: 'Failed to add builder' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding builder', error });
  }
};

// Fetch builder names and IDs
export const getBuildersNames = async (req, res) => {
  try {
    const builders = await getBuildersName();
    res.status(200).json(builders); // Return the builders as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching builder names', error });
  }
};


// Verify a builder by their complete name
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
