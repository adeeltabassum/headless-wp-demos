import type { EcommerceLegalContent } from "./content";

/** Sample legal pages for the ecommerce master template (wireframe copy). */
export const ecommerceLegalSample: EcommerceLegalContent = {
  lastUpdatedPrefix: "Last Updated:",
  pages: [
    {
      slug: "shipping-policy",
      title: "Shipping Policy",
      lastUpdated: "Date",
      sections: [
        {
          heading: "1. Order Processing",
          items: [
            "Orders are typically processed within 1–3 business days after payment confirmation.",
            "A valid email address is required so we can send order and shipping confirmations.",
          ],
        },
        {
          heading: "2. Shipping Options",
          items: [
            "Standard Shipping — 3–7 business days",
            "Expedited Shipping — 2–3 business days",
            "Express Shipping — 1–2 business days",
          ],
        },
        {
          heading: "3. Shipping Costs",
          items: [
            "Shipping costs are calculated at checkout based on package weight and destination address.",
            "Orders over $50 may qualify for free standard shipping where available.",
          ],
        },
        {
          heading: "4. Delivery Restrictions",
          items: [
            "We currently ship to valid U.S. residential or business addresses only.",
            "We do not ship to P.O. Boxes, APO/FPO addresses, Alaska, Hawaii, or U.S. Territories.",
          ],
        },
        {
          heading: "5. Tracking",
          items: [
            "Once your order ships, you will receive a tracking number by email so you can follow your package.",
          ],
        },
        {
          heading: "6. Lost, Delayed, or Damaged Packages",
          items: [
            "If your package is lost, delayed, or arrives damaged, contact our support team with your order number.",
            "Photo evidence may be required for damaged goods claims.",
          ],
        },
      ],
      metadata: {
        title: "Shipping Policy — Ecommerce Template",
        description: "Learn how orders are processed, shipped, and tracked.",
      },
    },
    {
      slug: "refund-policy",
      title: "Refund & Return",
      lastUpdated: "Date",
      intro:
        "We want you to be completely satisfied with your purchase. If you are not, you may request a return or refund.",
      sections: [
        {
          heading: "1. Return Window",
          items: [
            "Returns are accepted within 30 days of delivery.",
            "Items must be unused, in original packaging, and in resalable condition.",
          ],
        },
        {
          heading: "2. Non-Returnable Items",
          items: [
            "Personalized or custom products",
            "Gift cards",
            "Digital downloads",
            "Clearance or final-sale items",
          ],
        },
        {
          heading: "3. Return Process",
          listStyle: "ol",
          items: [
            "Contact hello@yourbrand.com with your order number.",
            "Receive return authorization and shipping instructions.",
            "Ship the item back using a trackable method.",
          ],
        },
        {
          heading: "4. Refunds",
          items: [
            "Approved refunds are typically processed within 7–10 business days.",
            "Refunds are issued to the original payment method.",
            "A receipt or order confirmation is required.",
            "Original shipping fees are non-refundable unless the item is defective or incorrect.",
          ],
        },
        {
          heading: "5. Exchanges",
          items: [
            "Defective or incorrect items may be exchanged. Contact support with photo evidence when applicable.",
          ],
        },
        {
          heading: "6. Return Shipping",
          items: [
            "Customers are responsible for return shipping costs unless the item is defective or we made an error.",
          ],
        },
      ],
      metadata: {
        title: "Refund & Return Policy — Ecommerce Template",
        description: "Return window, non-returnable items, refunds, and exchanges.",
      },
    },
    {
      slug: "terms",
      title: "Terms & Conditions",
      lastUpdated: "Date",
      intro:
        "Welcome to YourBrand. By using our website, you agree to these Terms & Conditions.",
      sections: [
        {
          heading: "1. General Use",
          items: [
            "This site is operated from the United States.",
            "We may update these terms at any time; continued use constitutes acceptance of changes.",
          ],
        },
        {
          heading: "2. Eligibility",
          items: [
            "You must be at least 18 years old to place an order.",
            "You agree to provide accurate account and checkout information.",
          ],
        },
        {
          heading: "3. Products & Pricing",
          items: [
            "Product availability is not guaranteed and may change without notice.",
            "All prices are listed in USD unless otherwise stated.",
            "We reserve the right to correct pricing errors and cancel affected orders.",
          ],
        },
        {
          heading: "4. Payments",
          items: [
            "We accept major payment methods such as Visa, MasterCard, American Express, and Discover where available.",
            "Payment processing is handled through secure third-party gateways.",
          ],
        },
        {
          heading: "5. Shipping & Delivery",
          items: [
            "Risk of loss transfers to you upon delivery to the carrier.",
            "We are not liable for carrier delays outside our reasonable control.",
          ],
        },
        {
          heading: "6. Intellectual Property",
          items: [
            "All site content, branding, and materials are owned by YourBrand or its licensors and may not be used without permission.",
          ],
        },
        {
          heading: "7. Limitation of Liability",
          items: [
            "To the fullest extent permitted by law, YourBrand is not liable for indirect, incidental, or consequential damages arising from use of the site or products.",
          ],
        },
        {
          heading: "8. Governing Law",
          items: [
            "These terms are governed by the laws of the United States and the State of California, without regard to conflict-of-law principles.",
          ],
        },
      ],
      metadata: {
        title: "Terms & Conditions — Ecommerce Template",
        description: "Terms governing use of the store and purchases.",
      },
    },
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      lastUpdated: "Date",
      intro:
        "YourBrand values your trust and is committed to safeguarding your personal information.",
      sections: [
        {
          heading: "1. Information We Collect",
          items: [
            "Personal details such as name, email, shipping address, and phone number",
            "Payment details collected via third-party processors (we do not store full card numbers)",
            "Account information if you create an account",
            "Technical data such as IP address, browser type, and cookies",
          ],
        },
        {
          heading: "2. How We Use Your Information",
          items: [
            "To process and fulfill orders",
            "To send order confirmations and shipping updates",
            "To communicate about your account, support requests, or promotions (where permitted)",
            "To improve site performance and customer experience",
          ],
        },
        {
          heading: "3. Sharing of Information",
          items: [
            "We share information with shipping carriers and payment partners as needed to fulfill orders.",
            "We do not sell or rent your personal information.",
          ],
        },
        {
          heading: "4. Cookies & Tracking",
          items: [
            "We use cookies and similar technologies to remember preferences and measure site performance.",
          ],
        },
        {
          heading: "5. Data Security",
          items: [
            "We use SSL encryption and work with PCI-compliant payment gateways to protect sensitive data.",
          ],
        },
        {
          heading: "6. Your Rights",
          items: [
            "You may request access to, correction of, or deletion of your personal data where applicable (including CCPA rights for California residents).",
            "Contact hello@yourbrand.com for privacy inquiries.",
          ],
        },
      ],
      metadata: {
        title: "Privacy Policy — Ecommerce Template",
        description: "How we collect, use, and protect your personal information.",
      },
    },
    {
      slug: "disclaimer",
      title: "Disclaimer",
      lastUpdated: "Date",
      intro:
        "Welcome to YourBrand. By using our website, you acknowledge and agree to the disclaimers outlined below.",
      sections: [
        {
          heading: "1. General Information",
          items: [
            "Site content is provided for general information purposes only.",
            "You are responsible for reviewing product details before purchase.",
            "We do not guarantee that all descriptions are complete or error-free.",
          ],
        },
        {
          heading: "2. Product Use Disclaimer",
          items: [
            "You agree to use products as intended and to read all labels and instructions.",
            "YourBrand is not liable for misuse or failure to follow product guidance.",
          ],
        },
        {
          heading: "3. Medical / Health Disclaimer",
          items: [
            "Products are not intended to diagnose, treat, cure, or prevent any disease unless expressly stated.",
            "Consult a qualified professional before use if you have health concerns.",
          ],
        },
        {
          heading: "4. External Links",
          items: [
            "Third-party links are provided for convenience only.",
            "We are not responsible for the content, accuracy, or policies of external sites.",
          ],
        },
        {
          heading: "5. Limitation of Liability",
          items: [
            "To the extent permitted by U.S. law, YourBrand disclaims liability for damages arising from site use or product purchase, limited to the purchase price of the product where applicable.",
          ],
        },
      ],
      metadata: {
        title: "Disclaimer — Ecommerce Template",
        description: "Important disclaimers regarding site content and product use.",
      },
    },
  ],
};

export function findLegalPage(
  legal: EcommerceLegalContent,
  slug: string
) {
  return legal.pages.find((p) => p.slug === slug) || null;
}
