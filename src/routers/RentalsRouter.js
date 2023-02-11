import { Router } from "express";
import { AddRental, DeleteRental, FinishRental, ListRentals } from "../controllers/RentalsController.js";
import { RentalFormatMiddleware } from "../middlewares/RentalsMiddleware.js";

const router = Router();

router.get('/rentals',ListRentals);
router.post('/rentals',RentalFormatMiddleware,AddRental);
router.post('/rentals/:id/return',FinishRental);
router.delete('/rentals/:id',DeleteRental);

export default router;