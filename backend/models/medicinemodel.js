import mongoose, { trusted } from 'mongoose';
const { Schema } = mongoose;

const medicineSchema = new Schema({
    medicinePic:{
        type:String,
        default:""
    },
    medicineName:{
        type:String,
        required:true
    },
    noOfTabs:{
        type:Number
    },
    expiry:{
        type:Date,
        required:true
    },
    category:{
        type:String
    },
    dosage:{
        type:String
    }
})

const Medicine = mongoose.model("newMedicine",medicineSchema);

export default Medicine;