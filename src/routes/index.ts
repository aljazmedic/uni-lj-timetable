import express, {Router,Request,Response, NextFunction} from 'express';

const router = Router();

router.get('/*', (req:Request,res:Response)=>{
    return res.status(200).json({
        message:'API route up!'
    });
})


export default router;
