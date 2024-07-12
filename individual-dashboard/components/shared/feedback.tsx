"use client";
import { useState } from "react";
import { createUserFeedback } from "@/lib/actions/feedback.action";

export const Feedback = () => {
  const [feedback, setFeedback] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleSubmit = async () => {
    console.log(data);
    await createUserFeedback(data);
  };

  return (
    <div className="flex flex-col items-end justify-end gap-5 fixed bottom-10 right-10">
      {feedback ? (
        <div className="flex flex-col gap-1">
          <textarea
            name="message"
            rows={4}
            cols={20}
            onChange={(e) => setData(e.target.value)}
            placeholder="write your feedback message here"
            className="p-1 rounded-xl"
          />
          <button
            onClick={handleSubmit}
            className="w-full h-10 text-white bg-purple-500 rounded-full"
          >
            submit
          </button>
        </div>
      ) : null}
      <div
        onClick={() => setFeedback((prev) => !prev)}
        className="w-14 h-14 text-4xl border border-purple-500 hover:border-white hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer rounded-full bg-purple-500 flex items-center justify-center"
      >
        💬
      </div>
    </div>
  );
};
