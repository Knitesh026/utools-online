import { Router } from 'express';

const router = Router();

// Get all tool routes from your data
const generateSitemap = () => {
  const baseUrl = 'https://utoolss.online';
  const routes = [
    { path: '/', changefreq: 'daily', priority: 1.0 },
    { path: '/tools', changefreq: 'weekly', priority: 0.9 },
    { path: '/about', changefreq: 'monthly', priority: 0.7 },
    { path: '/privacy-policy', changefreq: 'monthly', priority: 0.5 },
    { path: '/terms-of-service', changefreq: 'monthly', priority: 0.5 },
    { path: '/faq', changefreq: 'monthly', priority: 0.6 },
    // Tool pages - All tools with equal priority
    { path: '/age-calculator', changefreq: 'weekly', priority: 0.8 },
    { path: '/barcode-generator', changefreq: 'weekly', priority: 0.8 },
    { path: '/base64-converter', changefreq: 'weekly', priority: 0.8 },
    { path: '/bmi-calculator', changefreq: 'weekly', priority: 0.8 },
    { path: '/crop-image', changefreq: 'weekly', priority: 0.8 },
    { path: '/emi-calculator', changefreq: 'weekly', priority: 0.8 },
    { path: '/emi-calculator-advanced', changefreq: 'weekly', priority: 0.8 },
    { path: '/gif-maker', changefreq: 'weekly', priority: 0.8 },
    { path: '/gradient-generator', changefreq: 'weekly', priority: 0.8 },
    { path: '/gst-calculator', changefreq: 'weekly', priority: 0.8 },
    { path: '/hex-to-rgb', changefreq: 'weekly', priority: 0.8 },
    { path: '/html-color-codes', changefreq: 'weekly', priority: 0.8 },
    { path: '/image-compressor', changefreq: 'weekly', priority: 0.8 },
    { path: '/image-converter', changefreq: 'weekly', priority: 0.8 },
    { path: '/image-enhancer', changefreq: 'weekly', priority: 0.8 },
    { path: '/image-pixelator', changefreq: 'weekly', priority: 0.8 },
    { path: '/image-resizer', changefreq: 'weekly', priority: 0.8 },
    { path: '/image-sharpener', changefreq: 'weekly', priority: 0.8 },
    { path: '/image-to-base64', changefreq: 'weekly', priority: 0.8 },
    { path: '/image-to-pdf', changefreq: 'weekly', priority: 0.8 },
    { path: '/image-upscaler', changefreq: 'weekly', priority: 0.8 },
    { path: '/mortgage-calculator', changefreq: 'weekly', priority: 0.8 },
    { path: '/name-generator', changefreq: 'weekly', priority: 0.8 },
    { path: '/password-generator', changefreq: 'weekly', priority: 0.8 },
    { path: '/pdf-to-image', changefreq: 'weekly', priority: 0.8 },
    { path: '/ppp-calculator', changefreq: 'weekly', priority: 0.8 },
    { path: '/qr-code', changefreq: 'weekly', priority: 0.8 },
    { path: '/remove-background', changefreq: 'weekly', priority: 0.8 },
    { path: '/sip-calculator', changefreq: 'weekly', priority: 0.8 },
    { path: '/text-reverser', changefreq: 'weekly', priority: 0.8 },
    { path: '/unit-converter', changefreq: 'weekly', priority: 0.8 },
    { path: '/uuid-generator', changefreq: 'weekly', priority: 0.8 },
    { path: '/word-counter', changefreq: 'weekly', priority: 0.8 },
  ];

  const lastModDate = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${lastModDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

router.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.send(generateSitemap());
});

export default router;
