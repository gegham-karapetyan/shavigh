import { WrongTextIcon } from "./WrongTextIcon";

export const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="bg-gray-900 min-h-[180px] pt-16 px-5">
        <div className="footer-container">
          <p className="max-w-[400px] text-gray-100 text-sm">
            <WrongTextIcon
              className="w-5 h-auto inline-block mr-1 -mt-1"
              fill="red"
            />
            Եթե գտել եք սխալ, նշեք տվյալ հատվածը և միաժամանակ սեղմեք{" "}
            <em>Ctrl+Enter</em>.
          </p>
        </div>
      </div>
      <div className="bg-gray-800 p-5">
        <div className="footer-container">
          <p className="text-sm text-gray-100">
            © 2016-2025 Հեղինակային իրավունքները պատկանում են shavigh.am-ին:
          </p>
        </div>
      </div>
    </footer>
  );
};
