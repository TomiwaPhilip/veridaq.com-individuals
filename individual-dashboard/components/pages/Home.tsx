"use client";
import { useState } from "react";
import Image from "next/image";
import { Wallet, Card } from "../shared/shared";
import { cardData } from "@/constants/cards";

export default function HomePage() {
  const [feedback, setFeedback] = useState(false);
  return (
    <main className="bg-[#E1D7E2] mt-[40px] pb-[5rem] lg:pb-[0rem] md:mt-[70x]">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 ">
        <div className="mr-auto md:w-[40%]">
          <p className="font-bold text-[28px] text-[#38313A]">
            {" "}
            Let&apos;s help you get started today!{" "}
          </p>
        </div>
        <Wallet />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center mt-[40px]">
        {cardData.map((card, index) => (
          <Card
            key={index} // Ensure each Card component has a unique key
            heading={card.heading}
            paragraph={card.paragraph}
            bgColor={card.bgColor}
            outlineColor={card.outlineColor}
          />
        ))}
      </div>
      <div className="flex flex-col items-end justify-end gap-5 fixed bottom-10 right-10">
        {feedback ? (
          <div className="flex flex-col gap-1">
            <textarea
              rows={4}
              cols={20}
              placeholder="write your feedback message here"
              className="p-1 rounded-xl"
            />
            <button className="w-full h-10 text-white bg-purple-500 rounded-full">
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
    </main>
  );
}
