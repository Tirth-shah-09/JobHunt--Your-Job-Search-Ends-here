import express from 'express';
import {applyJob, getAppliedJobs,getApplicants,updateStatus} from '../controllers/application.controller.js';
import isAuthenticated  from '../middlewares/isAuthenticated.js';
import {deleteApplication} from '../controllers/application.controller.js';

export const applicationRouter=express.Router();

applicationRouter.post('/apply/:id',isAuthenticated,applyJob);
applicationRouter.get('/get',isAuthenticated,getAppliedJobs);
applicationRouter.get('/:id/applicants',isAuthenticated,getApplicants);
applicationRouter.post('/status/:id/update',isAuthenticated,updateStatus);
applicationRouter.delete('/delete/:id',isAuthenticated,deleteApplication)