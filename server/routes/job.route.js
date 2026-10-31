import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {postJob,getAllJobs,getJobById,getAdminJobs,updateJob} from '../controllers/job.controller.js';

export const jobRouter=express.Router();

jobRouter.post('/postjob',isAuthenticated,postJob);
jobRouter.get('/getalljobs',isAuthenticated,getAllJobs);
jobRouter.get('/getjob/:id',isAuthenticated,getJobById);
jobRouter.get('/getadminjob',isAuthenticated,getAdminJobs);
jobRouter.post('/update/:id',isAuthenticated, updateJob);
