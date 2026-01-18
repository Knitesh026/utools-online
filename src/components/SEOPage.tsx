import React, { useEffect } from 'react';
import { organizationSchema, websiteSchema } from '@/lib/seoHelpers';

interface SEOPageProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  keywords?: string;
  children: React.ReactNode;
  schema?: any;
}

export const SEOPage: React.FC<SEOPageProps> = ({
  title,
  description,
  canonical,
  image,
  keywords,
  children,
  schema,
}) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description.substring(0, 160));

    // Update keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Update og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // Update og:description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description.substring(0, 160));

    // Update og:image
    if (image) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', image);
    }

    // Add schema markup
    if (schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (schemaScript) {
        schemaScript.remove();
      }
      const schemaElement = document.createElement('script');
      schemaElement.type = 'application/ld+json';
      schemaElement.innerHTML = JSON.stringify(schema);
      document.head.appendChild(schemaElement);
    }

    // Add organization schema to every page
    let orgSchemaScript = document.querySelector('script[data-org-schema="true"]');
    if (!orgSchemaScript) {
      const orgSchema = document.createElement('script');
      orgSchema.type = 'application/ld+json';
      orgSchema.setAttribute('data-org-schema', 'true');
      orgSchema.innerHTML = JSON.stringify(organizationSchema);
      document.head.appendChild(orgSchema);
    }

    // Add website schema to every page
    let websiteSchemaScript = document.querySelector('script[data-website-schema="true"]');
    if (!websiteSchemaScript) {
      const websiteSchemaElement = document.createElement('script');
      websiteSchemaElement.type = 'application/ld+json';
      websiteSchemaElement.setAttribute('data-website-schema', 'true');
      websiteSchemaElement.innerHTML = JSON.stringify(websiteSchema);
      document.head.appendChild(websiteSchemaElement);
    }

    return () => {
      // Cleanup if needed
    };
  }, [title, description, canonical, image, keywords, schema]);

  return <>{children}</>;
};

export default SEOPage;
