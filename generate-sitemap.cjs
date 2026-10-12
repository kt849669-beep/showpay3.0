const fs = require('node:fs');
const path = require('node:path');
const {sitemap} = require('./scripts/build-showpay-guide.cjs');
fs.writeFileSync(path.join(__dirname, 'public/sitemap.xml'), sitemap());
console.log('Canonical ShowPay page and image sitemap generated.');
