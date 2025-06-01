import { Request, Response } from "express";
import { validationResult } from "express-validator";
import slug from 'slug';
import User from "../models/User";
import { hashPassword } from "../utils/auth";


export const createAccount = async (req: Request, res: Response) => {

    // Error's handling
    let errors = validationResult(req);

    if(!errors.isEmpty()) {
        
        res.status(400).json({
            errors: errors.array()
        })
        return;

    }
    

    const { email, password } = req.body;
    const userExists = await User.findOne({email});
    if(userExists) {
        const error = new Error('The user with that email is already registered');

        res.status(409).json({
            error: error.message
        });
        return;
    }

    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({handle});
    if(handleExists) {
        const error = new Error('User\'s name is not available');

        res.status(409).json({
            error: error.message
        });
        return;
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;
    

    await user.save();

    res.status(201).send(`The user ${user.name} has been created`)
}