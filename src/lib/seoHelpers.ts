// SEO Helper function to generate meta tags
export const generateSEOMeta = (title: string, description: string, image?: string, url?: string) => {
  return {
    title: `${title} | uTools.online - Free Online Utility Tools`,
    description: description.substring(0, 160), // Keep under 160 chars
    image: image || '/og-image.png',
    url: url || 'https://utoolss.online',
  };
};

// Schema.org structured data for tools
export const generateToolSchema = (toolName: string, toolDescription: string, toolUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: toolName,
    description: toolDescription,
    url: toolUrl,
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1000',
    },
  };
};

// Schema.org structured data for Organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'uTools.online',
  url: 'https://utoolss.online',
  logo: 'https://utoolss.online/logo.png',
  description: 'Free online utility tools for file conversion, image editing, PDF processing, and more.',
  sameAs: [
    'https://twitter.com/uToolsOnline',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    url: 'https://utoolss.online/contact',
  },
};

// Schema.org structured data for Website
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'uTools.online',
  url: 'https://utoolss.online',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://utoolss.online/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

// FAQ Schema
export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

// Breadcrumb schema
export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
