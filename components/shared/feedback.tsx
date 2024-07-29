"use client";

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.link/sb7ld1", "_blank");
  };

  return (
    <div className="fixed bottom-10 right-10">
      <div
        onClick={handleWhatsAppClick}
        className="w-14 h-14 text-4xl border border-[#38313a] hover:border-white hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer rounded-full bg-[#38313a] flex items-center justify-center"
      >
        <img src="/assets/icons/wa.png" alt="WhatsApp" width={50} height={50}/>
      </div>
    </div>
  );
};
