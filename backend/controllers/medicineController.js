import Medicine from "../models/medicinemodel.js";


export const addMedicine = async (req, res) => {
    try {
        const { medicinePic, medicineName, noOfTabs, expiry, category, dosage } = req.body;
        const userId = req.user._id;
        if (!medicineName) {
            res.status(201).json({ error: "Name of the medicine is required" });
        }
        if (!expiry) {
            res.status(201).json({ error: "Expiry date of medicine is required" });
        }
        const newMedicine = await new Medicine({
            user: userId,
            medicinePic,
            medicineName,
            noOfTabs,
            expiry,
            category,
            dosage
        })

        await newMedicine.save();

        res.status(201).json(newMedicine);
    } catch (error) {
        console.error("Error in add medicine controller:", error);
        res.status(404).json({ error: "Internal server error" })
    }
}

export const getMedicine = async (req, res) => {
    try {
        const userId = req.user._id;
        const medicines = await Medicine.find({ user: userId })
        res.status(201).json(medicines)
    } catch (error) {
        console.error("Error in get medicine controller:", error);
        res.status(404).json({ error: "Internal server error" })
    }
}

export const deleteMedicine = async (req, res) => {
    try {
        const userId = req.user._id;
        const medicineId = req.params.medicineId;
        const medicine = await Medicine.findOneAndDelete({ user: userId, _id: medicineId });
        if (!medicine) {
            res.status(404).json({ message: "Medicine not found" });
        }
        res.status(201).json({ message: "Medicine Deleted Successfully" });

    } catch (error) {
        console.error("Error in delete medicine controller:", error);
        res.status(404).json({ error: "Internal server error" })
    }
} 

export const updateMedicine = async (req, res) => {
    try {
        const userId = req.user._id;
        const medicineId = req.params.medicineId;
        const { medicinePic, medicineName, noOfTabs, expiry, category, dosage } = req.body;

        const medicine = await Medicine.findOne({_id:medicineId,user:userId})
        
        if(!medicine){
            res.status(404).json({message:"Medicine not found"});
        }

        medicine.medicinePic = medicinePic||medicine.medicinePic;
        medicine.medicineName = medicineName||medicine.medicineName;
        medicine.noOfTabs = noOfTabs||medicine.noOfTabs;
        medicine.expiry = expiry||medicine.expiry;
        medicine.category = category||medicine.category;
        medicine.dosage = dosage||medicine.dosage;


        const updatedMedicine = await medicine.save();
        res.status(200).json(updatedMedicine);

        }catch(error){
            console.error("Error in update medicine controller:", error);
            res.status(404).json({ error: "Internal server error" })
        }
    }