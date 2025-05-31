import { Router } from "express";

const router : Router = Router();

/** Register and Authentication **/ 
router.post('/auth/register', (req, res) => {
    console.log('From Register');
})


export default router;