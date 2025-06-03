import { Request, Response } from "express";
import slug from 'slug';
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";


export const createAccount = async (req: Request, res: Response) => {

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



export const login = async (req: Request, res: Response) => {

    // Validate if the user exists
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) {
        const error = new Error('The user does not exist');

        res.status(404).json({
            error: error.message
        });
        return;
    }

    //Verify if the password is correct
    const isPasswordCorrect = await checkPassword(password, user.password);
    if(!isPasswordCorrect) {
        const error = new Error('The password is incorrect');
        res.status(401).json({error: error.message});
        return;
    }

    res.send('Authenticated');
    
}