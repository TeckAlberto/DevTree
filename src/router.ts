import { Router } from "express";
import { body } from "express-validator";
import { createAccount } from "./handlers";

const router : Router = Router();

/** Register and Authentication **/ 
router.post('/auth/register', 
    body('handle')
        .notEmpty()
        .withMessage('the handle cannot be empty'),
    body('name')
        .notEmpty()
        .withMessage('the name cannot be empty'),
    body('email')
        .isEmail()
        .withMessage('E-mail not valid'),
    body('password')
        .isLength({min: 8, max: 16})
        .withMessage('the password cannot be empty'),
    createAccount);


export default router;