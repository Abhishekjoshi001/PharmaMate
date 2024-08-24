import express from "express"
import auth from "../middleware/auth.js"
import { addMedicine, deleteMedicine, getMedicine, updateMedicine } from "../controllers/medicineController.js"

const router = express.Router()

router.get("/",auth,getMedicine)
router.post("/add",auth,addMedicine)
router.delete("/:medicineId",auth,deleteMedicine)
router.put("/:medicineId",auth,updateMedicine)


export default router;