import {
  NavbarMenuGroupItemModel,
  NavbarMenuItemType,
} from "./NavbarMenuItems";

export const findAllNestedLinks = (
  item: NavbarMenuGroupItemModel,
  links: string[] = []
) => {
  //   if (!item.items) return;

  item.items.forEach((subItem) => {
    if (subItem.type === NavbarMenuItemType.SINGLE) {
      links.push(subItem.link);
    } else if (subItem.type === "group") {
      findAllNestedLinks(subItem, links);
    }
  });
  return links;
};
