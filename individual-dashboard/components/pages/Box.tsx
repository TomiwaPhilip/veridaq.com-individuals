import MessageBox from "@/components/shared/messagebox";
import ChatBox from "@/components/shared/chatBox";

export default function Box() {
    return (
        <main className="mt-[30px]">
            <div className="">
                <p className="font-semibold text-[28px] text-[#38313A]">Veridaq Mails</p>
                <div className="rounded-lg bg-[#C3B8D8] flex h-screen gap-3 p-4">
                    <div className="">
                        <MessageBox />
                    </div>
                    <div className="">
                        <ChatBox />
                    </div>
                </div>
            </div>
            <div> 
                <p className="font-semibold text-[28px] text-[#38313A]">Veridaq Issue</p>
                <p className="text-[20px] text-[#38313A]">Issue Individual Reference/Recommendation Veridaq</p>
            </div>
        </main>
    )
}