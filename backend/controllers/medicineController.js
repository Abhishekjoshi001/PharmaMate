import Medicine from "../models/medicinemodel.js";

// Add Medicine
export const addMedicine = async (req, res) => {
    try {
        const {medicineName, noOfTabs, expiry, category, dosage } = req.body;
        const userId = req.user._id;

        // Validate required fields
        if (!medicineName) {
            return res.status(400).json({ error: "Name of the medicine is required" });
        }
        if (!expiry) {
            return res.status(400).json({ error: "Expiry date of medicine is required" });
        }
        const medicinePic = req.file ? req.file.buffer.toString('base64') : null;
        const newMedicine = new Medicine({
            user: userId,
            medicinePic,
            medicineName,
            noOfTabs,
            expiry,
            category,
            dosage,
        });

        await newMedicine.save();
        res.status(201).json(newMedicine); // Successfully created

    } catch (error) {
        console.error("Error in add medicine controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get Medicines
export const getMedicine = async (req, res) => {
    try {
        const userId = req.user._id;
        const medicines = await Medicine.find({ user: userId });
        res.status(200).json(medicines); // Successfully fetched medicines
    } catch (error) {
        console.error("Error in get medicine controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete Medicine
export const deleteMedicine = async (req, res) => {
    try {
        const userId = req.user._id;
        const medicineId = req.params.medicineId;
        const medicine = await Medicine.findOneAndDelete({ user: userId, _id: medicineId });

        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }

        res.status(200).json({ message: "Medicine Deleted Successfully" }); // Successfully deleted
    } catch (error) {
        console.error("Error in delete medicine controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update Medicine
export const updateMedicine = async (req, res) => {
    try {
        const userId = req.user._id;
        const medicineId = req.params.medicineId;
        const { medicinePic, medicineName, noOfTabs, expiry, category, dosage } = req.body;

        const medicine = await Medicine.findOne({ _id: medicineId, user: userId });

        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }

        // Update the medicine details
        medicine.medicinePic = medicinePic || medicine.medicinePic;
        medicine.medicineName = medicineName || medicine.medicineName;
        medicine.noOfTabs = noOfTabs || medicine.noOfTabs;
        medicine.expiry = expiry || medicine.expiry;
        medicine.category = category || medicine.category;
        medicine.dosage = dosage || medicine.dosage;

        const updatedMedicine = await medicine.save();
        res.status(200).json(updatedMedicine); // Successfully updated

    } catch (error) {
        console.error("Error in update medicine controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
