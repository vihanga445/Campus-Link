import mongoose from "mongoose";

const { Schema } = mongoose;

const ClubSchema = new Schema({
  clubName: {
    type: String,
    required: true,
  },
  clubCategory: {
    type: String,
    required: true,
    enum: ["Sports", "Academic", "Cultural", "Social", "Spiritual"],
  },
  applicantDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    studentID: { type: String, required: true },
    contactNo: { type: String, required: true },
    department: { type: String, required: true },
    faculty: { type: String, required: true },
    currentRole: { type: String, required: true },
  },
  facultyAdvisorDetails: {
    name: { type: String, required: true },
    facultyName: { type: String, required: true },
    advisorRole: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true },
  },
  clubPolicies: {
    type: String,
    required: true,
  },
  approvalLetter: {
    type: String,
    required: true,
  },
  termsAccepted: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Club = mongoose.model("Club", ClubSchema);
export default Club; // Use ES module export
