"use client";

import { useState, ChangeEvent } from "react";
import { createUserFeedback } from "@/lib/actions/feedback.action";
import { BlackButton } from "./buttons";

interface FeedbackData {
  message: string;
}

export const Feedback = () => {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState<boolean>(false);
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    message: "",
  });
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackData({ ...feedbackData, message: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log("Feedback Data:", feedbackData);
      const response = await createUserFeedback(feedbackData);
      if (response.message) setFeedbackMessage(response.message);
      setLoading(false);
      // Optionally, clear the textarea after successful submission
      setFeedbackData({ message: "" });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      setFeedbackMessage(
        "There was an error sending feedback. Please try again!",
      );
    }
  };

  return (
    <div className="flex flex-col items-end justify-end gap-5 fixed bottom-10 right-10">
      {isFeedbackVisible && (
        <div className="flex flex-col gap-1">
          <textarea
            name="message"
            rows={8}
            cols={30}
            onChange={handleChange}
            value={feedbackData.message}
            placeholder="Write your feedback message here."
            className="p-3 rounded-xl border border-gray-300"
          />
          <BlackButton
            name="Submit"
            type="submit"
            loading={loading}
            disabled={loading}
            onClick={handleSubmit}
          />
          {feedbackMessage && (
            <div className="mt-2 p-3 rounded-xl bg-gray-100 border border-gray-300 w-[30vw]">
              {feedbackMessage}
            </div>
          )}
        </div>
      )}
      <div
        onClick={() => setIsFeedbackVisible((prev) => !prev)}
        className="w-14 h-14 text-4xl border border-[#38313a] hover:border-white hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer rounded-full bg-[#38313a] flex items-center justify-center"
      >
        💬
      </div>
    </div>
  );
};
