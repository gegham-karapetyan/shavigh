export const ScrollTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className="tracking-wider text-sm p-5 inline-flex items-center flex-col"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <span>↑</span>
      <span>ՎԵՐԱԴԱՌՆԱԼ</span>
    </button>
  );
};
