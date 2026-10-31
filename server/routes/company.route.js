import express from 'express';
import {registerCompany,getCompany,getCompanyById,updateCompany} from '../controllers/company.controller.js';
import isAuthenticated  from '../middlewares/isAuthenticated.js';


export const companyRouter=express.Router();

companyRouter.post('/registercompany',isAuthenticated,registerCompany);
companyRouter.get('/getcompany',isAuthenticated,getCompany);
companyRouter.get('/get/:id',isAuthenticated,getCompanyById);
companyRouter.put('/update/:id',isAuthenticated,updateCompany);