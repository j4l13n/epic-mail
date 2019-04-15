import { Router } from "express";
import UserController from "../controllers/users";

const router = Router();

router.get("/", UserController.users);
router.get("/:id", UserController.singleUser);
router.get("/search", UserController.search);
export default router;
