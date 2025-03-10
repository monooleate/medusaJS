/** @type {import('types').Sidebar.SidebarItem[]} */
export const howToTutorialsSidebar = [
  {
    type: "link",
    // TODO add page
    path: "/how-to-tutorials",
    title: "Overview",
  },
  {
    type: "link",
    path: "/examples",
    title: "Example Snippets",
  },
  {
    type: "separator",
  },
  {
    type: "category",
    title: "How-To Guides",
    children: [
      {
        type: "sub-category",
        title: "Server",
        autogenerate_tags: "howTo+server",
        autogenerate_as_ref: true,
        sort_sidebar: "alphabetize",
      },
      {
        type: "sub-category",
        title: "Admin",
        autogenerate_tags: "howTo+admin",
        autogenerate_as_ref: true,
        sort_sidebar: "alphabetize",
        children: [
          {
            type: "link",
            path: "/admin-components",
            title: "Overview",
          },
          {
            type: "separator",
          },
          {
            type: "category",
            title: "Layouts",
            autogenerate_path: "/admin-components/layouts",
          },
          {
            type: "category",
            title: "Components",
            autogenerate_path: "/admin-components/components",
          },
        ],
      },
    ],
  },
  {
    type: "category",
    title: "Tutorials",
    children: [
      {
        type: "link",
        title: "Custom Item Pricing",
        path: "/examples/guides/custom-item-price",
      },
      {
        type: "link",
        title: "Wishlist",
        path: "/plugins/guides/wishlist",
        description: "Learn how to build a wishlist plugin.",
      },
      {
        type: "sub-category",
        title: "Extend Modules",
        autogenerate_tags: "tutorial+extendModule",
        autogenerate_as_ref: true,
        sort_sidebar: "alphabetize",
      },
    ],
  },
  {
    type: "category",
    title: "Deployment",
    children: [
      {
        type: "link",
        path: "/deployment",
        title: "Overview",
      },
      {
        type: "separator",
      },
      {
        type: "link",
        title: "Medusa Cloud",
        path: "https://medusajs.com/pricing",
      },
      {
        type: "separator",
      },
      {
        type: "category",
        title: "Self-Hosting",
        children: [
          {
            type: "link",
            path: "https://docs.medusajs.com/learn/deployment/general",
            title: "General",
          },
          {
            type: "link",
            path: "/deployment/medusa-application/railway",
            title: "Railway",
          },
        ],
      },
      {
        type: "category",
        title: "Next.js Starter",
        autogenerate_path: "/deployment/storefront",
      },
    ],
  },
]
