import  express  from "express";
import { loginUser, myProfile } from "../controllers/user.js";
const router=express.Router();
import {isAuth} from "../middleware/isAuth.js";

router.post("/login",loginUser);
router.get("/me",isAuth,myProfile);

export default router;