import { Schema, model, models } from "mongoose";

const OrganizationSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  adminFirstName: {
    type: String,
  },
  adminLastName: {
    type: String,
  },
  streetAddress: {
    type: String,
    default: null,
  },
  city: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
  },
  image: {
    type: String,
  },
  onboarded: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  credentials: {
    type: String,
    default: null,
  },
  credentialsType: {  
    type: String,
    enum: ["nin", "cacDoc", "letter"],
  },
  registered: {
    type: String,
    enum: ["true", "false"],
    default: "false",
  },
});

const Organization =
  models.Organization || model("Organization", OrganizationSchema);

export default Organization;
