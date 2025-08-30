import { useState } from "react";
import { IconButton } from "../ui/buttons/IconButton";
import BurgerMenuIcon from "@/frontend/website/media/icons/burger-dotted-menu.svg";
import CloseIcon from "@/frontend/website/media/icons/close-icon.svg";

import { useBiblePageAuthors } from "@/frontend/shared/contexts/bible-page-authors-context";

export const BibleAuthorsNav = () => {
  const { authors } = useBiblePageAuthors();

  const [openMenu, setOpenMenu] = useState(false);

  if (!authors.length) return null;

  return (
    <nav className="bg-gray-800 z-10 p-2 text-white sticky left-0 top-14 lg:top-[64px] 2xl:top-[110px]">
      <div className="hidden lg:flex items-center space-x-4 overflow-auto px-4">
        {authors.map((item) => (
          <h6
            key={item.label}
            onClick={item.onClick}
            className="cursor-pointer whitespace-nowrap text-white p-1 text-sm font-medium hover:text-primary"
          >
            {item.label}
          </h6>
        ))}
      </div>
      <div className="lg:hidden text-right text-white">
        <IconButton
          className="text-white mr-3.5"
          variant="text"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? (
            <CloseIcon className="fill-current" />
          ) : (
            <BurgerMenuIcon className="fill-current p-1" />
          )}
        </IconButton>
      </div>
      {openMenu && (
        <div className="lg:hidden flex flex-col gap-1">
          {authors.map((item) => (
            <h6
              key={item.label}
              onClick={() => {
                item.onClick();
                setOpenMenu(false);
              }}
              className="cursor-pointer whitespace-nowrap text-white p-1 text-sm font-medium hover:text-primary"
            >
              {item.label}
            </h6>
          ))}
        </div>
      )}
    </nav>
  );
};
