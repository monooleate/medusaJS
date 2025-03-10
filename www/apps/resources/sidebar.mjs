import { apiKeySidebar } from "./sidebars/api-key.mjs"
import { architecturalModulesSidebar } from "./sidebars/architectural-modules.mjs"
import { authSidebar } from "./sidebars/auth.mjs"
import { cartSidebar } from "./sidebars/cart.mjs"
import { currencySidebar } from "./sidebars/currency.mjs"
import { customerSidebar } from "./sidebars/customer.mjs"
import { fulfillmentSidebar } from "./sidebars/fulfillment.mjs"
import { integrationsSidebar } from "./sidebars/integrations.mjs"
import { pluginsSidebar } from "./sidebars/plugins.mjs"
import { inventorySidebar } from "./sidebars/inventory.mjs"
import { orderSidebar } from "./sidebars/order-module.mjs"
import { paymentSidebar } from "./sidebars/payment.mjs"
import { pricingSidebar } from "./sidebars/pricing.mjs"
import { productSidebar } from "./sidebars/product.mjs"
import { promotionSidebar } from "./sidebars/promotion.mjs"
import { recipesSidebar } from "./sidebars/recipes.mjs"
import { referencesSidebar } from "./sidebars/references.mjs"
import { regionSidebar } from "./sidebars/region.mjs"
import { salesChannelSidebar } from "./sidebars/sales-channel.mjs"
import { toolsSidebar } from "./sidebars/tools.mjs"
import { stockLocationSidebar } from "./sidebars/stock-location.mjs"
import { storeSidebar } from "./sidebars/store.mjs"
import { storefrontDevelopmentSidebar } from "./sidebars/storefront.mjs"
import { taxSidebar } from "./sidebars/tax.mjs"
import { troubleshootingSidebar } from "./sidebars/troubleshooting.mjs"
import { userSidebar } from "./sidebars/user.mjs"
import { examplesSidebar } from "./sidebars/examples.mjs"
import { howToTutorialsSidebar } from "./sidebars/how-to-tutorials.mjs"

/** @type {import("types").Sidebar.RawSidebar[]} */
export const sidebar = [
  {
    sidebar_id: "resources",
    title: "Development Resources",
    items: [
      {
        type: "link",
        path: "/",
        title: "Overview",
      },
      ...examplesSidebar,
      {
        type: "separator",
      },
      {
        type: "link",
        path: "/commerce-modules",
        title: "Commerce Modules",
        hideChildren: true,
        sort_sidebar: "alphabetize",
        children: [
          ...apiKeySidebar,
          ...authSidebar,
          ...cartSidebar,
          ...currencySidebar,
          ...customerSidebar,
          ...fulfillmentSidebar,
          ...inventorySidebar,
          ...orderSidebar,
          ...paymentSidebar,
          ...pricingSidebar,
          ...productSidebar,
          ...promotionSidebar,
          ...regionSidebar,
          ...salesChannelSidebar,
          ...stockLocationSidebar,
          ...storeSidebar,
          ...taxSidebar,
          ...userSidebar,
        ],
      },
      ...architecturalModulesSidebar,
      ...pluginsSidebar,
      {
        type: "separator",
      },
      {
        type: "category",
        title: "General",
        children: [...troubleshootingSidebar],
      },
      {
        type: "category",
        title: "Admin",
        children: [
          {
            type: "link",
            path: "/admin-widget-injection-zones",
            title: "Admin Widget Injection Zones",
          },
        ],
      },
      {
        type: "category",
        title: "Lists",
        children: [
          {
            type: "link",
            path: "/medusa-container-resources",
            title: "Container Dependencies",
          },
          {
            type: "link",
            path: "/events-reference",
            title: "Events List",
          },
        ],
      },
      {
        type: "category",
        title: "References",
        children: referencesSidebar,
      },
    ],
  },
  {
    sidebar_id: "recipes",
    title: "Recipes",
    items: recipesSidebar,
  },
  {
    sidebar_id: "how-to-tutorials",
    title: "How-To & Tutorials",
    items: howToTutorialsSidebar,
  },
  {
    sidebar_id: "integrations",
    title: "Integrations",
    items: integrationsSidebar,
  },
  {
    sidebar_id: "storefront-development",
    title: "Storefront Development",
    items: storefrontDevelopmentSidebar,
  },
  {
    sidebar_id: "tools",
    title: "Tools",
    items: toolsSidebar,
  },
]
