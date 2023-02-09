import { Router } from "express";
import { AddCustomer, GetCustomer, ListCustomers, UpdateCustomer } from "../controllers/CustomersController.js";
import { CustomerFormatMiddleware } from "../middlewares/CustomersMiddleware.js";

const router = Router();

router.get('/customers',ListCustomers);
router.get('/customers/:id',GetCustomer);
router.post('/customers', CustomerFormatMiddleware, AddCustomer);
router.put('/customers/:id', CustomerFormatMiddleware, UpdateCustomer);

export default router;