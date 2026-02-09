const { writeFile } = require('fs-extra');
const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
const path = require('path');

// === CONFIGURAÇÕES ===
const siteUrl = ''; 
const hoje = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

// ==== GERAR SITEMAP.XML ====
async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: siteUrl });

  sitemap.write({ url: '/', changefreq: 'monthly', priority: 1.0 });

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  await writeFile(path.join(__dirname, 'sitemap.xml'), xml);
  console.log('✅ sitemap.xml gerado');
}

// ==== GERAR ROBOTS.TXT ====
async function generateRobots() {
  const robotsContent = `
User-agent: *
Disallow:

Sitemap: ${siteUrl}/sitemap.xml
  `.trim();

  await writeFile(path.join(__dirname, 'robots.txt'), robotsContent);
  console.log('✅ robots.txt gerado');
}


// ==== EXECUÇÃO ====
(async () => {
  await generateSitemap();
  await generateRobots();
})();
