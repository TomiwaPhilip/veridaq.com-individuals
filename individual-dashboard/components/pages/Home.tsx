"use client"
import Image from "next/image"
import { Wallet, Card } from "../shared/shared"
import { cardData } from "@/constants/cards"
import { BaseFramerAnimation } from "../shared/Animations"

export default function HomePage() {
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
      <BaseFramerAnimation
        initialY={0}
        className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center mt-[40px]"
      >
        {cardData.map((card, index) => (
          <Card
            key={index} // Ensure each Card component has a unique key
            heading={card.heading}
            paragraph={card.paragraph}
            bgColor={card.bgColor}
            outlineColor={card.outlineColor}
          />
        ))}
      </BaseFramerAnimation>
    </main>
  )
}
