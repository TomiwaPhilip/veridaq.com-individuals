import { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema({
  message: {
    type: String,
    required: true, // Added required for message, as it makes sense for feedback
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = models.Feedback || model("Feedback", FeedbackSchema);

export default Feedback;
