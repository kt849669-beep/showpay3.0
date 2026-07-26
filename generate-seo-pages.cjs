const fs = require('fs');
const path = require('path');

const domain = 'https://app-showpay.in';

const pages = [
  {
    name: 'app.html',
    title: 'ShowPay App | Features, Access and User Guide',
    h1: 'ShowPay App',
    desc: 'Explore verified ShowPay app features, access options, account guidance, security information and official support.',
    content: `
      <section>
        <h2>Secure Digital Payments</h2>
        <p>The ShowPay app provides verified access to your digital assets and payment gateway functionality. Keep your funds secure with advanced authentication and real-time transaction monitoring.</p>
        <p>Access the <a href="/login">ShowPay Login</a> to manage your account.</p>
      </section>
    `,
    jsonld: `
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "ShowPay app",
      "operatingSystem": "ANDROID",
      "applicationCategory": "FinanceApplication",
      "description": "ShowPay payment gateway app for digital asset management."
    }
    `
  },
  {
    name: 'apk.html',
    title: 'ShowPay APK | Official Android Download Information',
    h1: 'ShowPay APK for Android',
    desc: 'Find verified ShowPay APK download information, Android requirements, installation guidance, version details and security precautions.',
    content: `
      <section>
        <h2>Official APK Information</h2>
        <p>Currently, an official direct APK download is unavailable. Please rely solely on official channels for updates to avoid malicious software.</p>
        <p>Always verify the SHA-256 checksum of any downloaded package. For account access, use the <a href="/login">ShowPay Login</a>.</p>
      </section>
    `
  },
  {
    name: 'usdt.html',
    title: 'ShowPay USDT | Deposit, Withdrawal and Transaction Guide',
    h1: 'ShowPay USDT Guide',
    desc: 'Learn how verified ShowPay USDT deposits, withdrawals, transaction status, network selection and security procedures work.',
    content: `
      <section>
        <h2>USDT Network Support</h2>
        <p>ShowPay supports USDT transactions on the TRC20 network. Please ensure you select the correct network before making a deposit. Sending funds on an unsupported network will result in permanent loss.</p>
        <h2>Transaction Process</h2>
        <p>Deposits require network confirmations before reflecting in your account. Withdrawals are processed securely after identity verification.</p>
      </section>
    `
  },
  {
    name: 'about.html',
    title: 'About ShowPay | Digital Payment Solutions',
    h1: 'About ShowPay',
    desc: 'Learn about ShowPay, a secure digital payment gateway designed to streamline your transactions.',
    content: `
      <section>
        <p>ShowPay is a payment gateway focused on providing seamless digital asset transactions, secure account management, and reliable infrastructure.</p>
      </section>
    `
  },
  {
    name: 'support.html',
    title: 'ShowPay Support | Contact and Help Center',
    h1: 'ShowPay Support',
    desc: 'Contact official ShowPay support. Get help with your account, login issues, USDT transactions, and app guidance.',
    content: `
      <section>
        <h2>Contact Us</h2>
        <p>If you experience any issues, please contact our official support channels via your account dashboard.</p>
        <p><strong>Warning:</strong> ShowPay staff will never ask for your password or private keys.</p>
      </section>
    `
  },
  {
    name: 'faq.html',
    title: 'ShowPay FAQ | Frequently Asked Questions',
    h1: 'Frequently Asked Questions',
    desc: 'Find answers to common questions about ShowPay login, app access, security, and USDT transactions.',
    content: `
      <section>
        <h3>How do I access my account?</h3>
        <p>You can securely access your account via the <a href="/login">ShowPay Login</a> page.</p>
        <h3>Which network is supported for USDT?</h3>
        <p>We primarily support the TRC20 network for USDT transactions.</p>
      </section>
    `,
    jsonld: `
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I access my account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can securely access your account via the official ShowPay Login page."
          }
        },
        {
          "@type": "Question",
          "name": "Which network is supported for USDT?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We primarily support the TRC20 network for USDT transactions."
          }
        }
      ]
    }
    `
  },
  {
    name: 'privacy-policy.html',
    title: 'ShowPay Privacy Policy | Data Protection and Security',
    h1: 'Privacy Policy',
    desc: 'Read the ShowPay privacy policy to understand how we protect your personal data, secure your transactions, and maintain your privacy.',
    content: `
      <section>
        <p>We are committed to protecting your privacy and ensuring the security of your personal data. We collect only necessary information to process transactions securely and comply with regulations.</p>
      </section>
    `
  },
  {
    name: 'terms.html',
    title: 'ShowPay Terms and Conditions',
    h1: 'Terms and Conditions',
    desc: 'Review the terms and conditions for using the ShowPay app, website, and payment gateway services.',
    content: `
      <section>
        <p>By using ShowPay, you agree to these terms. You are responsible for securing your account credentials and verifying transaction details.</p>
      </section>
    `
  },
  {
    name: 'risk-disclosure.html',
    title: 'ShowPay Risk Disclosure | Digital Asset Security',
    h1: 'Risk Disclosure',
    desc: 'Important risk disclosures regarding digital assets, USDT transactions, and account security on the ShowPay platform.',
    content: `
      <section>
        <p>Digital asset transactions carry inherent risks. Please be aware of market volatility, network fees, and the permanent nature of blockchain transfers.</p>
      </section>
    `
  },
  {
    name: 'security.html',
    title: 'ShowPay Security | Account Protection and Anti-Phishing',
    h1: 'Security Information',
    desc: 'Learn how to secure your ShowPay account, identify phishing attempts, and safely navigate the ShowPay app and login.',
    content: `
      <section>
        <h2>Anti-Phishing Guidance</h2>
        <p>Always verify that you are on the official domain: <strong>app-showpay.in</strong>.</p>
        <p>We will never ask you for your password outside of the official <a href="/login">ShowPay Login</a> page.</p>
      </section>
    `
  }
];

const template = (page) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>\${page.title}</title>
    <meta name="description" content="\${page.desc}">
    <link rel="canonical" href="\${domain}/\${page.name.replace('.html', '')}" />
    
    <meta property="og:title" content="\${page.title}" />
    <meta property="og:description" content="\${page.desc}" />
    <meta property="og:url" content="\${domain}/\${page.name.replace('.html', '')}" />
    <meta property="og:type" content="article" />
    
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="\${page.title}" />
    <meta name="twitter:description" content="\${page.desc}" />
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>
      body {
        font-family: 'Inter', sans-serif;
        background: #0f172a;
        color: #e2e8f0;
        margin: 0;
        padding: 0;
        line-height: 1.6;
      }
      header {
        background: #1e293b;
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid #334155;
      }
      header a {
        color: #3b82f6;
        text-decoration: none;
        font-weight: 600;
        font-size: 18px;
      }
      main {
        max-width: 800px;
        margin: 40px auto;
        padding: 0 20px;
      }
      h1 {
        color: #f8fafc;
        font-size: 32px;
        margin-bottom: 24px;
      }
      h2 {
        color: #e2e8f0;
        font-size: 24px;
        margin-top: 32px;
        margin-bottom: 16px;
      }
      p {
        margin-bottom: 16px;
        color: #94a3b8;
      }
      a {
        color: #3b82f6;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      nav.breadcrumb {
        margin-bottom: 20px;
        font-size: 14px;
        color: #64748b;
      }
      footer {
        text-align: center;
        padding: 40px 20px;
        margin-top: 60px;
        border-top: 1px solid #334155;
        color: #64748b;
        font-size: 14px;
      }
    </style>
    \${page.jsonld ? \`<script type="application/ld+json">\${page.jsonld}</script>\` : ''}
    <!-- Breadcrumb JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "\${domain}/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "\${page.h1}",
        "item": "\${domain}/\${page.name.replace('.html', '')}"
      }]
    }
    </script>
  </head>
  <body>
    <header>
      <a href="/">ShowPay</a>
    </header>
    <main>
      <nav class="breadcrumb">
        <a href="/">Home</a> &gt; <span>\${page.h1}</span>
      </nav>
      <h1>\${page.h1}</h1>
      \${page.content}
    </main>
    <footer>
      <p>&copy; 2024 ShowPay. <a href="/privacy-policy">Privacy</a> | <a href="/terms">Terms</a> | <a href="/support">Support</a></p>
    </footer>
  </body>
</html>`;

pages.forEach(p => {
  fs.writeFileSync(path.join(__dirname, p.name), template(p), 'utf8');
});

console.log('Successfully generated ' + pages.length + ' SEO pages.');
