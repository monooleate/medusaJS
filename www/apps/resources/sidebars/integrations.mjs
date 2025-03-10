/** @type {import('types').Sidebar.SidebarItem[]} */
export const integrationsSidebar = [
  {
    type: "link",
    path: "/integrations",
    title: "Overview",
  },
  {
    type: "separator",
  },
  {
    type: "category",
    title: "Auth",
    children: [
      {
        type: "ref",
        path: "/commerce-modules/auth/auth-providers/google",
        title: "Google",
      },
      {
        type: "ref",
        path: "/commerce-modules/auth/auth-providers/github",
        title: "GitHub",
      },
    ],
  },
  {
    type: "category",
    title: "CMS",
    children: [
      {
        type: "link",
        path: "/integrations/guides/sanity",
        title: "Sanity",
      },
    ],
  },
  {
    type: "category",
    title: "ERP",
    children: [
      {
        type: "ref",
        path: "/recipes/erp/odoo",
        title: "Odoo",
      },
    ],
  },
  {
    type: "category",
    title: "File",
    children: [
      {
        type: "ref",
        path: "/architectural-modules/file/s3",
        title: "AWS",
      },
    ],
  },
  {
    type: "category",
    title: "Fulfillment",
    children: [
      {
        type: "link",
        path: "/integrations/guides/shipstation",
        title: "ShipStation",
      },
    ],
  },
  {
    type: "category",
    title: "Notification",
    children: [
      {
        type: "link",
        path: "/integrations/guides/resend",
        title: "Resend",
      },
      {
        type: "ref",
        path: "/architectural-modules/notification/sendgrid",
        title: "SendGrid",
      },
    ],
  },
  {
    type: "category",
    title: "Payment",
    children: [
      {
        type: "ref",
        path: "/commerce-modules/payment/payment-provider/stripe",
        title: "Stripe",
      },
    ],
  },
]
