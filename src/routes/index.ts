import express, {Router,Request,Response, NextFunction} from 'express';

const router = Router();

router.get('/error-test',(req:Request,res:Response, next:NextFunction)=>{
    return next(new Error("Test error"));
})

router.get('/*', (req:Request,res:Response)=>{
    return res.status(200).json({
        message:'API route up!'
    });
})


export default router;
