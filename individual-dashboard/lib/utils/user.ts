import { Schema, model, models } from "mongoose";
import { string } from "zod";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  firstname: {
    type: String,
    // required: [true, 'Firstname is required!'],
  },
  lastname: {
    type: String,
    // required: [true, 'Lastname is required!'],
  },
  middlename: {
    type: String,
  },
  street_address: {
    type: String,
  },
  professional_designation: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  nin: {
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
  loginType: {
    type: String,
    enum: ["email", "google", "linkedin"],
  },
  walletBalance: {
    type: String,
    default: "0.00",
  },
  hasAcessFee: {
    type: Boolean,
    default: false,
  },
  accessFeePaymentDate: {
    type: Date,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
