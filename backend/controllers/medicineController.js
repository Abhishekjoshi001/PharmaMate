import Medicine from "../models/medicinemodel.js";

export const addMedicine = async (req,res)=>{
    try {
        const {medicinePic,medicineName,noOfTabs,expiry,category,dosage} = req.body;
        if(!medicineName){
            res.status(201).json({error:"Name of the medicine is required"});
        }
        if(!expiry){
            res.status(201).json({error:"Expiry date of medicine is required"});
        }
        const newMedicine = await new Medicine({
            medincinePic,
            medicineName,
            noOfTabs,
            expiry,
            category,
            dosage
        })

        await newMedicine.save();
    } catch (error) {
        console.error("Error in medicine controller:", error);
        res.status(404).json({error:"Internal server error"})
    }
}