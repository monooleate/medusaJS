import { MenuItem, NavigationItem } from "types"
import { navDropdownItems } from ".."

type Options = {
  basePath: string
}

export function getNavDropdownItems({ basePath }: Options): NavigationItem[] {
  return navDropdownItems.map((item) => {
    const newItem = {
      ...item,
    }

    if (newItem.type === "link") {
      newItem.link = `${basePath}${newItem.link}`
    } else {
      newItem.children = normalizeMenuItems({
        basePath,
        items: newItem.children,
      })
    }

    return newItem
  })
}

export function normalizeMenuItems({
  basePath,
  items,
}: {
  basePath: string
  items: MenuItem[]
}): MenuItem[] {
  return items.map((item) => {
    if (item.type !== "link" && item.type !== "sub-menu") {
      return item
    }

    if (item.type === "link") {
      return {
        ...item,
        link: `${basePath}${item.link}`,
      }
    }

    return {
      ...item,
      items: normalizeMenuItems({
        basePath,
        items: item.items,
      }),
    }
  })
}
