import mongoose, { trusted } from 'mongoose';
const { Schema } = mongoose;

const medicineSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
},{
    timestamps: true
})

const Medicine = mongoose.model("newMedicine",medicineSchema);

export default Medicine;