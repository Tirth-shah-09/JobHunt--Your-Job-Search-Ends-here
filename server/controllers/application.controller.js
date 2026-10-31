import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "JobId is required",
        success: false,
      });
    }
    //Check if the user has already applied for the job..,
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    //check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    //creating a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);

    await job.save();
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occured",
      success: false,
    });
  }
};

//particular user/student ne abhi tak konsi konsi job ke liye apply kiya hai ye dekhayga
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    console.log('This is our userId',userId);
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 }) // Sorts the main applications array
      .populate({
        path: "job", // Populates the job details
        populate: {
          path: "company", // Fixed: Removed the sort option from this single object path
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Application",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occured",
      success: false,
    });
  }
};

//admin jobId dega in req.params , aus job par kin kin logo ne apply kiya hai , vo dispaly hoga as an output
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    
    if (!job) {
      return res.status(400).json({
        message: "No job found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    console.log(error);
    return res.status(400).json({
      message: "An error occured",
      success: false,
    });
  }
};

//user , application ki id dega in req.params then hum aus application  ko update kr dege,..
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }
    //find the application using applicationId,
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Applciation not found",
        success: false,
      });
    }
    //updating the status of the application
    application.status = status.toLowerCase();
    await application.save();
    return res.status(201).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(error);
    return res.status(400).json({
      message: "An error occured",
      success: false,
    });
  }
};

export const deleteApplication=async(req,res)=>{
   const {id}=req.params;
   console.log("IN delete Application ROutes");
   try {
    const deletedItem = await Application.findByIdAndDelete(id);
    
    // If no item was found with that ID
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Success response
    res.status(200).json({ message: 'Item deleted successfully', data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
