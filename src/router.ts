import { Router } from "express";
import { body } from "express-validator";
import { createAccount, login } from "./handlers";
import { handleInputErrors } from "./middleware/validation";

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
        .withMessage('the password should be at least of 8 characters'),
    handleInputErrors,
    createAccount);


router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('E-mail not valid'),
    body('password')
        .notEmpty()
        .withMessage('the password is required'),
    handleInputErrors,
    login);


export default router;