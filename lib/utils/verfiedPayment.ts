import {Schema, models, model} from "mongoose";

// Define the verification token schema
const VerifiedPaymentSchema = new Schema({
  ref: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});


// Create the VerifiedPayment model
const VerifiedPayment = models.VerifiedPayment || model("VerifiedPayment", VerifiedPaymentSchema);

export default VerifiedPayment;
