import arrow from "@/frontend/website/media/icons/arrow-up.svg";
import Image from "next/image";

export const ScrollTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className="tracking-wider cursor-pointer text-sm p-5 inline-flex items-center flex-col"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <Image src={arrow} className="w-10 h-auto" alt="scroll to top" />
      <span>ՎԵՐԱԴԱՌՆԱԼ</span>
    </button>
  );
};
