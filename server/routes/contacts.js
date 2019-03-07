import { Router } from "express";
import ContactController from "../controllers/contacts";
const router = Router();

router.get("/", ContactController.contacts);
router.get("/:id", ContactController.contact);

export default router;
