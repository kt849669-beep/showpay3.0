/* Public guide generation only. Account and admin modules are not modified. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const postcss = require('postcss');
const esbuild = require('esbuild');
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const origin = 'https://app-showpay.in';
const assetRoot = '/showpay-guide-assets/v20261012';
const changedDate = '2026-10-12';
const title = 'ShowPay App Guide | Login, App Download & USDT to INR';
const description = 'Explore ShowPay login, registration, app and APK download information, app screenshots and a USDT to INR calculator. Read the Show Pay guide at app-showpay.in.';
const keywords = 'ShowPay, Showpay, showpay, SHOWPAY, Show Pay, show pay, ShowPay login, showpay usdt to inr, ShowPay app download, ShowPay APK download, ShowPay official website, ShowPay registration, ShowPay INR tasks, ShowPay USDT calculator';
const routes = {
  '/homes': 'homes.html',
  '/privacy-policy.html': 'privacy-policy.html',
  '/terms.html': 'terms.html',
};
// Existing guides keep their distinct content, self-canonical URLs and sitemap entries.
const existingRoutes = {
  '/about-showpay.html': 'about-showpay.html',
  '/showpay-apk': 'showpay-apk.html',
  '/showpay-usdt': 'showpay-usdt.html',
  '/showpay-guide.html': 'showpay-guide.html',
  '/homepages': 'homepages.html',
  '/showpay-password-help.html': 'showpay-password-help.html',
  '/showpay-support.html': 'showpay-support.html',
  '/how-to-use-showpay.html': 'how-to-use-showpay.html',
  '/how-to-deposit-showpay.html': 'how-to-deposit-showpay.html',
  '/how-to-deposit-usdt-showpay.html': 'how-to-deposit-usdt-showpay.html',
};
const canonicalFor = route => route;
const write = (filename, value) => {
  fs.mkdirSync(path.dirname(filename), {recursive:true});
  if (!fs.existsSync(filename) || fs.readFileSync(filename, 'utf8') !== value) fs.writeFileSync(filename, value);
};
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;');
const plain = value => value.replace(/<[^>]*>/g,' ').replaceAll('&amp;','&').replace(/\s+/g,' ').trim();
const source = filename => fs.readFileSync(path.join(root, 'seo', filename), 'utf8');

function buildAssets() {
  const styles = postcss.parse(source('reference.css').replaceAll('.hero-copy h1', '.hero-copy :is(h1,h2)'));
  styles.walkRules(rule => {
    if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
    rule.selectors = rule.selectors.map(selector => {
      if (/^(?:\:root|html|body)(?=[\s.:#[]|$)/.test(selector)) return selector.replace(/^(?:\:root|html|body)/, '.showpay-guide');
      if (/^\.(?:js|motion-ready|sp-hero-ready)(?=[\s.:#[]|$)/.test(selector)) return '.showpay-guide' + selector;
      return '.showpay-guide ' + selector;
    });
  });
  const isolation = `.showpay-guide *{margin:revert;padding:revert;font-family:inherit}.showpay-guide{display:flow-root;isolation:isolate}.showpay-guide--embedded{margin-top:50vh;margin-top:50svh}.showpay-guide--embedded:not(.is-in-view) .mobile-actions,.showpay-guide--embedded:not(.is-in-view) .telegram-float{display:none}.showpay-guide :is(section,div)[id]{scroll-margin-top:110px}`;
  const additions = `.showpay-guide .resource-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:20px}.showpay-guide .resource-card{padding:24px;border:1px solid var(--line);border-radius:16px;background:#fff}.showpay-guide .resource-card h3{font-size:20px;margin-bottom:12px}.showpay-guide .resource-card p{font-size:15px;margin-bottom:12px}.showpay-guide .resource-card a{color:var(--blue);text-decoration:underline;text-underline-offset:3px}.showpay-guide .resource-links{display:flex;flex-wrap:wrap;gap:16px;margin-top:24px}.showpay-guide .hero-actions{flex-wrap:wrap}.showpay-guide .guide-content{display:block}.showpay-guide-page{margin:0}`;
  const css = esbuild.transformSync(isolation + styles.toString() + additions + '.showpay-guide.showpay-guide--embedded{margin-top:50vh;margin-top:50svh}', {loader:'css',minify:true}).code;
  const js = esbuild.transformSync(source('guide.js'), {loader:'js',minify:true,target:'es2020'}).code;
  const files = {};
  for (const [extension, value] of [['css',css],['js',js]]) {
    const hash = crypto.createHash('sha256').update(value).digest('hex').slice(0,12);
    const file = `${assetRoot}/guide.${hash}.${extension}`;
    write(path.join(publicDir,file), value);
    files[extension] = file;
  }
  return files;
}

const resources = `<section class="section" id="showpay-resources" aria-labelledby="showpay-resource-title"><div class="container">
  <div class="section-heading"><div><p class="eyebrow">SHOWPAY LINKS &amp; ANSWERS</p><h2 id="showpay-resource-title">ShowPay login, app download<br><em>and USDT to INR.</em></h2></div><p>ShowPay, also written Showpay or Show Pay: app access, screenshots and useful places to continue reading.</p></div>
  <div class="resource-grid">
    <article class="resource-card"><h3>ShowPay login &amp; registration</h3><p>Use the ShowPay login at app-showpay.in. New users can open the registration link with invite code 1eashowpb2dp.</p><a href="https://app-showpay.in/">ShowPay Login</a> · <a href="https://app-web.showpayweb.com/regist?code=1eashowpb2dp" rel="sponsored nofollow noopener" target="_blank">Register</a></article>
    <article class="resource-card"><h3>ShowPay app &amp; APK download</h3><p>Looking for a ShowPay app download or ShowPay APK download? The download button opens the supplied registration page. This guide does not host an APK file.</p><a href="https://app-web.showpayweb.com/regist?code=1eashowpb2dp" rel="sponsored nofollow noopener" target="_blank">Open app access</a></article>
    <article class="resource-card"><h3>ShowPay USDT to INR</h3><p>Use the screenshot-rate calculator for an estimate. The displayed ₹108.12 example is not a live market quote; check the current rate and fees in your account.</p><a href="#calculator">Open the USDT calculator</a></article>
    <article class="resource-card"><h3>YouTube walkthrough</h3><p>Creation TPM: Showpay App A to Z All Process, covering deposit and withdrawal. This is a third-party video.</p><a href="https://www.youtube.com/watch?v=Rl8mR5YT2E4" target="_blank" rel="noopener noreferrer">Watch on YouTube</a></article>
    <article class="resource-card"><h3>Instagram &amp; Facebook</h3><p>View the existing linked Instagram post or search Facebook for ShowPay discussions. These links are not verified official account-support channels.</p><a href="https://www.instagram.com/p/DYfki7GTcSa/" target="_blank" rel="noopener noreferrer">Instagram post</a> · <a href="https://www.facebook.com/search/top?q=ShowPay" target="_blank" rel="noopener noreferrer">Search Facebook</a></article>
    <article class="resource-card"><h3>Find ShowPay on Google</h3><p>Search for ShowPay information, this website or app screenshots. A search result alone does not establish that a site is the ShowPay official website.</p><a href="https://www.google.com/search?q=ShowPay+app" target="_blank" rel="noopener noreferrer">Google Search</a> · <a href="https://www.google.com/search?udm=2&amp;q=ShowPay+app" target="_blank" rel="noopener noreferrer">Google Images</a></article>
  </div><nav class="resource-links" aria-label="ShowPay page links"><a href="/homes">ShowPay Homes</a><a href="https://app-showpay.in/">Login</a><a href="/privacy-policy.html">Privacy notice</a><a href="/terms.html">Website terms</a><a href="https://www.google.com/search?q=site%3Aapp-showpay.in" target="_blank" rel="noopener noreferrer">Find this site on Google</a></nav>
</div></section>`;

function guideBody(embedded = false) {
  let html = source('homes.html.template').replace('</main>', resources + '\n</main>');
  if (embedded) {
    html = html.replace('<main id="guide-main">','<div class="guide-content" id="guide-main">').replace('</main>','</div>');
    html = html.replace(/<h1\b/g,'<h2').replaceAll('</h1>','</h2>');
    html = html.replace(/<img\b[^>]*>/g, tag => tag.replace(/ loading="[^"]*"| fetchpriority="[^"]*"| decoding="[^"]*"/g,'').replace('<img ', '<img loading="lazy" decoding="async" '));
  }
  return `<div class="showpay-guide${embedded ? ' showpay-guide--embedded' : ''}" id="showpay-guide">\n${html}\n</div>`;
}

function schema(canonical, pageTitle, pageDescription) {
  const images = ['home','tasks','account'].map((name) => ({'@type':'ImageObject','@id':`${origin}/homes#image-${name}`,contentUrl:`${origin}${assetRoot}/images/showpay-${name}.webp`,caption:`ShowPay ${name} app screenshot`,width:738,height:1599}));
  const graph = [
    {'@type':'WebSite','@id':`${origin}/#website`,url:origin+'/',name:'ShowPay',alternateName:['Showpay','Show Pay','showpay'],inLanguage:'en-IN',image:`${origin}${assetRoot}/android-chrome-512x512.png`},
    {'@type':'WebPage','@id':`${origin}${canonical}#webpage`,url:origin+canonical,name:pageTitle,description:pageDescription,inLanguage:'en-IN',dateModified:changedDate,isPartOf:{'@id':`${origin}/#website`},primaryImageOfPage:{'@id':`${origin}/homes#image-home`}},
    ...images,
  ];
  if (canonical === '/homes' || canonical === '/') {
    const questions = [...source('homes.html.template').matchAll(/<details\b[^>]*>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)].map(([,q,a])=>({'@type':'Question',name:plain(q),acceptedAnswer:{'@type':'Answer',text:plain(a)}}));
    graph.push({'@type':'FAQPage','@id':`${origin}${canonical}#faq`,mainEntity:questions});
  }
  return `<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph})}</script>`;
}

function metadata(canonical, pageTitle = title, pageDescription = description) {
  return `<title>${escape(pageTitle)}</title>
<meta name="description" content="${escape(pageDescription)}">
<meta name="keywords" content="${escape(keywords)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${origin}${canonical}">
<link rel="icon" href="${assetRoot}/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="${assetRoot}/apple-touch-icon.png">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<meta property="og:site_name" content="ShowPay"><meta property="og:type" content="website"><meta property="og:locale" content="en_IN">
<meta property="og:title" content="${escape(pageTitle)}"><meta property="og:description" content="${escape(pageDescription)}"><meta property="og:url" content="${origin}${canonical}">
<meta property="og:image" content="${origin}${assetRoot}/android-chrome-512x512.png"><meta property="og:image:alt" content="ShowPay app logo"><meta property="og:image:width" content="512"><meta property="og:image:height" content="512">
<meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escape(pageTitle)}"><meta name="twitter:description" content="${escape(pageDescription)}"><meta name="twitter:image" content="${origin}${assetRoot}/android-chrome-512x512.png">
${schema(canonical,pageTitle,pageDescription)}`;
}

function sitemap() {
  const pages = ['/', ...Object.keys(existingRoutes), ...Object.keys(routes)];
  const previouslyUpdated = new Set(['/showpay-guide.html','/showpay-password-help.html','/showpay-support.html','/how-to-use-showpay.html','/how-to-deposit-showpay.html','/how-to-deposit-usdt-showpay.html']);
  const images = ['home','tasks','account'];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${pages.map(route=>`  <url><loc>${origin}${route}</loc>${route==='/' || route in routes ? `<lastmod>${changedDate}</lastmod>` : previouslyUpdated.has(route) ? '<lastmod>2026-10-11</lastmod>' : ''}${route==='/homes'?images.map(name=>`<image:image><image:loc>${origin}${assetRoot}/images/showpay-${name}.webp</image:loc></image:image>`).join(''):''}</url>`).join('\n')}\n</urlset>\n`;
}

function generate() {
  const files = buildAssets();
  for (const [route, filename] of Object.entries(routes)) {
    let body = guideBody();
    let pageTitle = title, pageDescription = description;
    if (route === '/privacy-policy.html' || route === '/terms.html') {
      const legal = route === '/terms.html' ? 'terms' : 'privacy';
      body = `<div class="showpay-guide" id="showpay-guide">${source(legal+'.html.template')}</div>`;
      pageTitle = legal==='terms' ? 'Website Terms | ShowPay Guide' : 'Privacy Notice | ShowPay Guide';
      pageDescription = legal==='terms' ? 'Read the terms for the ShowPay public guide, app screenshots, illustrative USDT calculator, registration links and third-party resources.' : 'Read the privacy notice for the ShowPay public guide, browser-based USDT calculator, external registration links and separate account services.';
    }
    const canonical = canonicalFor(route);
    const preload = canonical === '/homes' ? `<link rel="preload" as="image" href="${assetRoot}/images/showpay-tasks-360.webp" imagesrcset="${assetRoot}/images/showpay-tasks-360.webp 360w, ${assetRoot}/images/showpay-tasks-540.webp 540w, ${assetRoot}/images/showpay-tasks.webp 738w" imagesizes="(max-width:390px) 160px, (max-width:1000px) 178px, 194px">` : '';
    write(path.join(publicDir,filename),`<!doctype html>\n<html lang="en-IN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#23235b">${metadata(canonical,pageTitle,pageDescription)}<link rel="stylesheet" href="${files.css}">${preload}<script defer src="${files.js}"></script><style>body{margin:0}</style></head><body class="showpay-guide-page">${body}</body></html>\n`);
  }
  for (const filename of ['index.html','user-app/pages/login.html']) {
    let html = fs.readFileSync(path.join(root,filename),'utf8');
    const start='<!-- SHOWPAY GUIDE START -->', end='<!-- SHOWPAY GUIDE END -->';
    if (!html.includes(start)) html=html.replace(/    <section class="login-seo-content"[\s\S]*?    <\/section>\s*    <\/main>/,`    ${start}\n    ${end}\n    </main>`);
    if (!html.includes(start)) throw new Error('Login guide insertion point missing: '+filename);
    html=html.replace(new RegExp(start+'[\\s\\S]*?'+end),`${start}\n${guideBody(true)}\n${end}`);
    html=html.replace(/<title>[\s\S]*?<\/title>/,'')
      .replace(/<meta\b[^>]*(?:name="(?:description|keywords|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,'')
      .replace(/<link\b[^>]*rel="(?:canonical|icon|apple-touch-icon|sitemap)"[^>]*>/g,'')
      .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g,'')
      .replace(/<!-- SHOWPAY SEO HEAD START -->[\s\S]*?<!-- SHOWPAY SEO HEAD END -->/g,'');
    const loginTitle='ShowPay Login | ShowPay App & Secure Account Access';
    const loginDescription='Use ShowPay login at app-showpay.in, then explore the Show Pay app guide, registration, app and APK download information, screenshots and USDT to INR calculator.';
    html=html.replace('</head>',`<!-- SHOWPAY SEO HEAD START -->\n${metadata('/',loginTitle,loginDescription)}<link rel="stylesheet" href="${files.css}"><script defer src="${files.js}"></script>\n<!-- SHOWPAY SEO HEAD END -->\n</head>`);
    if (!html.includes('class="homes-link"')) html=html.replace(/(<a href="https:\/\/app-web.showpayweb.com\/regist\?code=1eashowpb2dp">Register<\/a>)/, '$1 <span aria-hidden="true"> · </span><a class="homes-link" href="/homes">Homes</a>');
    write(path.join(root,filename),html.replace(/[ \t]+$/gm,'').replace(/\n{3,}/g,'\n\n'));
  }
  write(path.join(publicDir,'sitemap.xml'),sitemap());
  write(path.join(publicDir,'_headers'),`${assetRoot}/*\n  Cache-Control: public, max-age=31536000, immutable\n  X-Content-Type-Options: nosniff\n`);
  console.log('ShowPay /homes and content below login generated; existing public guides preserved.');
}

module.exports={generate,routes,existingRoutes,canonicalFor,sitemap,changedDate,assetRoot};
if(require.main===module) generate();
