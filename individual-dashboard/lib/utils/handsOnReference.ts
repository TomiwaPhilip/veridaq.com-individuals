import { Schema, model, models } from "mongoose";

const HandsOnReferenceSchema = new Schema({
  orgId: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: [true, "Organization ID is required"],
  },
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  middleName: String,
  roleType: {
    type: String,
    required: [true, "Employee Type is required"],
  },
  subType: {
    type: String,
    required: [true, "Sub Type is required"],
  },
  identifier: {
    type: String,
    required: [true, "Identifier is required"],
  },
  projectTitle: {
    type: String,
    required: [true, "Project Title is required"],
  },
  image: {
    type: String,
  },
  workStartDate: {
    type: Date,
    required: [true, "Work Start Date is required"],
  },
  workEndDate: {
    type: Date,
    default: null,
  },
  role: {
    type: String,
    required: [true, "Department is required"],
  },
  notableAchievement: String,
  roleResponsibilities: {
    type: String,
    required: [true, "Role Responsilities is required"],
  },
  personalitySummary: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
  },
  issued: {
    type: Boolean,
    default: false,
    required: true,
  },
  dateIssued: {
    type: Date,
    default: Date.now,
  },
  dateRequested: {
    type: Date,
    default: Date.now,
  },
  badgeUrl: {
    type: String,
    default: null,
  },
  issuingAdminDetails: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
});

// Create and export the Mongoose model based on the schema
const HandsOnReference =
  models.HandsOnReference || model("HandsOnReference", HandsOnReferenceSchema);

export default HandsOnReference;
