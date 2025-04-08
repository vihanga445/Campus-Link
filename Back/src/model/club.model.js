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
    enum: ["Sports", "Academic", "Cultural", "Social", "Spiritual", "Creative"],
  },
  clubEmail: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  clubDescription: {
    type: String,
    required: true,
  },
  clubTagline: {
    type: String,
    required: true,
  },
  clubHistory: {
    type: String,
    required: true,
  },
  clubCoverPhoto: {
    type: String,
    required: true,
  },
  clubBannerPhoto: {
    type: String,
    required: true,
  },
  clubKeyMembers: [
    {
      name: { type: String, required: true },
      role: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
  socialMediaLinks: {
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    linkedin: { type: String, required: false },
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
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Club = mongoose.model("Club", ClubSchema);
export default Club;
