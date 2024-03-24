import { Card2 } from '../shared/shared';
import {cardData2} from "@/constants/cards"

export default function RequestVeridaq() {
    return (
        <main className="bg-[#E1D7E2] mt-[70px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center mt-[40px]">
            {cardData2.map((card, index) => (
            <Card2
                key={index} // Ensure each Card component has a unique key
                heading={card.heading}
                textColor={card.textColor}
                bgColor={card.bgColor}
                outlineColor={card.outlineColor}
            />
            ))}
        </div>
        </main>
    )
}