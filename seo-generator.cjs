const fs = require('fs');
const path = require('path');

const domain = 'https://app-showpay.in';
const publicDir = path.join(__dirname, 'public');
const socialImage = `${domain}/showpay-logo.png`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function writeIfChanged(filePath, content) {
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8') === content) {
    return false;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

const pages = [
  {
    filename: 'about-showpay.html',
    title: 'About ShowPay | App, Login and Payment Platform',
    description:
      'Learn about ShowPay, its secure account login, mobile-friendly web app and available payment and wallet features.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${domain}/about-showpay.html#webpage`,
      url: `${domain}/about-showpay.html`,
      name: 'About ShowPay',
      description:
        'Information about ShowPay account access, the web app and available payment features.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${domain}/#website`,
        url: `${domain}/`,
        name: 'ShowPay',
      },
      about: {
        '@type': 'Organization',
        '@id': `${domain}/#organization`,
        name: 'ShowPay',
        url: `${domain}/`,
        logo: socialImage,
      },
    },
    body: `
      <h1>About ShowPay</h1>
      <p>ShowPay provides mobile-friendly account access for viewing the payment and wallet features available to each user. The main <strong>ShowPay login</strong> is available on this domain.</p>
      <h2>Using the ShowPay app</h2>
      <p>The <strong>ShowPay app</strong> experience is delivered through a responsive web interface. After signing in, users can view the tools enabled for their account and follow the instructions shown in the dashboard.</p>
      <h2>Account access</h2>
      <p>Use the main login page and keep your password and MPIN private. If you cannot access your account, use the password-recovery option shown on the login screen.</p>
      <p>Read about <a href="/showpay-apk.html">ShowPay app and APK access</a>, visit <a href="/showpay-support.html">ShowPay support</a>, or continue to the <a href="/">ShowPay login</a>.</p>
    `,
  },
  {
    filename: 'showpay-apk.html',
    route: '/showpay-apk',
    title: 'ShowPay APK and App Access | ShowPay Login',
    description:
      'Find safe ShowPay app access information, sign in through the web login and avoid unverified ShowPay APK download sources.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${domain}/showpay-apk#webpage`,
      url: `${domain}/showpay-apk`,
      name: 'ShowPay APK and App Access',
      description:
        'Safe access information for the ShowPay app, web login and APK-related searches.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${domain}/#website`,
        url: `${domain}/`,
        name: 'ShowPay',
      },
    },
    body: `
      <h1>ShowPay App and APK Access</h1>
      <p>The <strong>ShowPay app</strong> can be accessed through the mobile-friendly web login on this domain. This page does not currently host a direct <strong>ShowPay APK</strong> file.</p>
      <h2>Using ShowPay on mobile</h2>
      <p>Open app-showpay.in in a current mobile browser and confirm the domain before signing in. Where supported, you can add the page to your phone's home screen for quicker access without installing a file from an unknown source.</p>
      <h2>Avoid unverified APK files</h2>
      <p>Do not install files from unknown websites or messages claiming to provide a Show Pay app download. Before opening any claimed ShowPay APK, verify that the platform has actually published it and review the requested permissions.</p>
      <h2>ShowPay login safety</h2>
      <ul>
        <li>Confirm the address bar shows app-showpay.in.</li>
        <li>Never share your password, OTP, MPIN or recovery code.</li>
        <li>Avoid saving credentials on a shared device.</li>
        <li>Use only support information shown by the platform.</li>
      </ul>
      <p>For account-access questions, visit <a href="/showpay-support.html">ShowPay support</a> or read the <a href="/showpay-usdt">ShowPay USDT guide</a>.</p>
    `,
  },
  {
    filename: 'showpay-support.html',
    title: 'ShowPay Support | Login and App Help',
    description:
      'Get ShowPay login and app help, including password recovery guidance, account-safety tips and USDT transaction checks.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${domain}/showpay-support.html#faq`,
      url: `${domain}/showpay-support.html`,
      name: 'ShowPay Support',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I recover my ShowPay login?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use the password-recovery option shown on the ShowPay login screen and never share your password or MPIN.',
          },
        },
        {
          '@type': 'Question',
          name: 'What should I check for a pending ShowPay USDT transaction?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Confirm the selected network, destination address and blockchain confirmations, then review the status shown in your dashboard.',
          },
        },
      ],
    },
    body: `
      <h1>ShowPay Support</h1>
      <p>Use these steps for common <strong>ShowPay login</strong>, app-access and transaction questions.</p>
      <h2>Frequently asked questions</h2>
      <h3>How do I recover my ShowPay login?</h3>
      <p>Use the password-recovery option shown on the ShowPay login screen. Never share your password or MPIN with another person.</p>
      <h3>What should I check for a pending ShowPay USDT transaction?</h3>
      <p>Confirm the selected network, destination address and blockchain confirmations, then review the status shown in your dashboard.</p>
      <p>For platform information, read <a href="/about-showpay.html">About ShowPay</a>. For safe web-app access, see the <a href="/showpay-apk.html">ShowPay app and APK guide</a>.</p>
    `,
  },
  {
    filename: 'showpay-usdt.html',
    route: '/showpay-usdt',
    title: 'ShowPay USDT Guide | Deposit and Withdrawal Checks',
    description:
      'Use this ShowPay USDT guide to verify networks, wallet addresses and transaction status before a deposit or withdrawal.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${domain}/showpay-usdt#howto`,
      url: `${domain}/showpay-usdt`,
      name: 'How to check a ShowPay USDT deposit',
      description:
        'Steps for checking network and address information before a ShowPay USDT transaction.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Sign in',
          text: 'Open the ShowPay login page and sign in to your account.',
        },
        {
          '@type': 'HowToStep',
          name: 'Verify the network and address',
          text: 'Open the available USDT option and carefully verify the displayed network and wallet address.',
        },
        {
          '@type': 'HowToStep',
          name: 'Review transaction status',
          text: 'After submitting a transaction, review its status and required blockchain confirmations.',
        },
      ],
    },
    body: `
      <h1>ShowPay USDT Guide</h1>
      <p>This guide explains the checks to make before using a USDT feature available in the <strong>ShowPay app</strong>. Confirm the exact network, wallet address, limits and transaction status inside your signed-in account.</p>
      <h2>Before a USDT deposit</h2>
      <ol>
        <li>Use the ShowPay login button above and sign in at app-showpay.in.</li>
        <li>Open the available USDT option and verify the network displayed in your account.</li>
        <li>Compare the complete wallet address and review the amount before sending funds.</li>
        <li>Keep the transaction ID so its status can be checked if processing is delayed.</li>
      </ol>
      <h2>Before a USDT withdrawal</h2>
      <p>Verify the recipient address, network, minimum amount and any fee shown in the dashboard. Blockchain transfers may be irreversible, so review every field before submitting.</p>
      <h2>Transaction status</h2>
      <p>Processing time can vary by network activity and required blockchain confirmations. Compare the transaction ID with the appropriate blockchain explorer and review the status shown in your dashboard before taking another action.</p>
      <p class="notice">Never send USDT using an address copied from an unverified message, and never share your password, OTP or MPIN when requesting help.</p>
      <p>For account-access or transaction questions, visit <a href="/showpay-support.html">ShowPay support</a>.</p>
    `,
  },
  {
    filename: 'showpay-guide.html',
    title: 'ShowPay Guides | Login, App, USDT and Password Help',
    description:
      'Browse practical ShowPay guides for account login, app access, deposits, USDT network checks and password recovery help.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${domain}/showpay-guide.html#webpage`,
      url: `${domain}/showpay-guide.html`,
      name: 'ShowPay Guides',
      description: 'A collection of ShowPay account, app, deposit, USDT and password-help guides.',
      about: {
        '@type': 'Organization',
        '@id': `${domain}/#organization`,
        name: 'ShowPay',
        alternateName: ['Showpay', 'Show pay'],
        url: `${domain}/`,
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          `${domain}/how-to-use-showpay.html`,
          `${domain}/how-to-deposit-showpay.html`,
          `${domain}/how-to-deposit-usdt-showpay.html`,
          `${domain}/showpay-password-help.html`,
        ].map((url, index) => ({ '@type': 'ListItem', position: index + 1, url })),
      },
    },
    body: `
      <h1>ShowPay Guides</h1>
      <p><strong>ShowPay</strong> is also searched as “Showpay” or “Show pay”. These guides use the consistent brand spelling ShowPay and provide direct, task-focused help without changing the login or dashboard workflow.</p>
      <h2>Account and app access</h2>
      <ul>
        <li><a href="/how-to-use-showpay.html">How to use ShowPay</a></li>
        <li><a href="/showpay-apk.html">ShowPay app and APK access</a></li>
        <li><a href="/showpay-password-help.html">ShowPay password and login recovery help</a></li>
      </ul>
      <h2>Deposit and USDT guides</h2>
      <ul>
        <li><a href="/how-to-deposit-showpay.html">How to deposit on ShowPay</a></li>
        <li><a href="/how-to-deposit-usdt-showpay.html">How to deposit USDT on ShowPay</a></li>
        <li><a href="/showpay-usdt.html">ShowPay USDT network and transaction checks</a></li>
      </ul>
      <p class="notice">Account features can differ. Use only the options and transaction details shown inside your signed-in account, and verify every address or payment instruction before proceeding.</p>
    `,
  },
  {
    filename: 'how-to-use-showpay.html',
    title: 'How to Use ShowPay | Login and Account Guide',
    description:
      'Learn how to use ShowPay safely: open the correct login URL, sign in, review available account tools and find support when needed.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${domain}/how-to-use-showpay.html#howto`,
      url: `${domain}/how-to-use-showpay.html`,
      name: 'How to use ShowPay',
      description: 'Steps for opening the ShowPay login, signing in and using the tools available to an account.',
      step: [
        { '@type': 'HowToStep', name: 'Open ShowPay', text: 'Open https://app-showpay.in/ and check the address before entering account details.' },
        { '@type': 'HowToStep', name: 'Sign in', text: 'Enter the phone number and password associated with your own ShowPay account.' },
        { '@type': 'HowToStep', name: 'Review available tools', text: 'After signing in, use only the account tools and instructions displayed in the dashboard.' },
        { '@type': 'HowToStep', name: 'Get help safely', text: 'Use the password recovery or support guidance when an option is unavailable or unclear.' },
      ],
    },
    body: `
      <h1>How to Use ShowPay</h1>
      <p>Use the main <a href="/">ShowPay login</a> at <strong>https://app-showpay.in/</strong>. Check the full address before entering a phone number, password or other account information.</p>
      <h2>1. Sign in to your account</h2>
      <p>Enter the phone number and password connected to your own account. Do not share a password, OTP or MPIN with another person.</p>
      <h2>2. Review the available dashboard tools</h2>
      <p>Features may differ by account. Follow the labels and instructions displayed after login rather than relying on an old screenshot or message from an unknown source.</p>
      <h2>3. Use account help when needed</h2>
      <p>If you cannot sign in, read the <a href="/showpay-password-help.html">ShowPay password help guide</a>. For app-access questions, use the <a href="/showpay-support.html">ShowPay support guide</a>.</p>
      <p class="notice">This guide explains navigation only. It does not request account credentials and does not replace instructions shown inside your account.</p>
    `,
  },
  {
    filename: 'how-to-deposit-showpay.html',
    title: 'How to Deposit on ShowPay | Account Deposit Guide',
    description:
      'Follow safe checks for a ShowPay deposit: sign in, use the available deposit option, verify displayed details and review transaction status.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${domain}/how-to-deposit-showpay.html#howto`,
      url: `${domain}/how-to-deposit-showpay.html`,
      name: 'How to deposit on ShowPay',
      description: 'General safety steps for using a deposit option displayed in a ShowPay account.',
      step: [
        { '@type': 'HowToStep', name: 'Sign in', text: 'Open the main ShowPay login and sign in to your own account.' },
        { '@type': 'HowToStep', name: 'Open the available deposit option', text: 'Use the Deposit option only if it is displayed and active in your dashboard.' },
        { '@type': 'HowToStep', name: 'Verify the instructions', text: 'Review the displayed method, amount, recipient or wallet details before confirming anything.' },
        { '@type': 'HowToStep', name: 'Review status', text: 'Check the transaction status shown in the account before attempting another deposit.' },
      ],
    },
    body: `
      <h1>How to Deposit on ShowPay</h1>
      <p>Sign in through the main <a href="/">ShowPay login</a>, then use a Deposit option only when it is available in your account dashboard.</p>
      <h2>Check the displayed deposit method</h2>
      <p>Deposit methods and availability can vary. Read the current instructions inside the account and verify the amount, recipient, wallet address or payment reference before taking action.</p>
      <h2>Confirm the transaction status</h2>
      <p>After following the displayed process, review the status in your account. Do not repeat a payment only because an external message says the first one failed.</p>
      <h2>For USDT deposits</h2>
      <p>Network selection and wallet-address matching require additional checks. Read <a href="/how-to-deposit-usdt-showpay.html">how to deposit USDT on ShowPay</a> before using a crypto deposit option.</p>
      <p class="notice">Never send funds to details copied from an unofficial page, chat or screenshot. Use the current details shown inside your signed-in account.</p>
    `,
  },
  {
    filename: 'how-to-deposit-usdt-showpay.html',
    title: 'How to Deposit USDT on ShowPay | Network Safety Guide',
    description:
      'Check the network, wallet address and confirmation status before making a USDT deposit using an option available in your ShowPay account.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${domain}/how-to-deposit-usdt-showpay.html#howto`,
      url: `${domain}/how-to-deposit-usdt-showpay.html`,
      name: 'How to deposit USDT on ShowPay',
      description: 'Safety checks for a USDT deposit option displayed in a ShowPay account.',
      step: [
        { '@type': 'HowToStep', name: 'Open the account deposit option', text: 'Sign in and open the USDT or crypto deposit option only if it is available in the dashboard.' },
        { '@type': 'HowToStep', name: 'Match the network', text: 'Use the same supported network on the sending wallet and the ShowPay deposit screen.' },
        { '@type': 'HowToStep', name: 'Verify the complete address', text: 'Compare the full destination wallet address before sending USDT.' },
        { '@type': 'HowToStep', name: 'Review confirmations and status', text: 'After sending, review blockchain confirmations and the transaction status shown in the account.' },
      ],
    },
    body: `
      <h1>How to Deposit USDT on ShowPay</h1>
      <p>Open a USDT deposit option only after signing in through <a href="/">app-showpay.in</a>. Availability, supported networks and addresses can change, so the live account screen is the source to verify.</p>
      <h2>Match the USDT network</h2>
      <p>The network selected in the sending wallet must match the network displayed for the deposit. A network mismatch can cause a permanent loss of funds.</p>
      <h2>Check the complete wallet address</h2>
      <p>Compare the beginning, middle and end of the destination address. Do not rely only on the first or last few characters, and do not use an address received through an unknown message.</p>
      <h2>Wait for confirmations</h2>
      <p>Processing time depends on network activity and required confirmations. Review the transaction status before attempting another transfer.</p>
      <p>For broader checks, read the <a href="/showpay-usdt.html">ShowPay USDT guide</a> or the <a href="/how-to-deposit-showpay.html">general ShowPay deposit guide</a>.</p>
      <p class="notice">This page does not display or provide a deposit address. Always use the current address shown inside your own account.</p>
    `,
  },
  {
    filename: 'showpay-password-help.html',
    title: 'ShowPay Password Help | Reset and Login Recovery',
    description:
      'Use safe ShowPay password recovery guidance, open the recovery option from the login page and protect your password, OTP and MPIN.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${domain}/showpay-password-help.html#faq`,
      url: `${domain}/showpay-password-help.html`,
      name: 'ShowPay Password Help',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I reset my ShowPay password?',
          acceptedAnswer: { '@type': 'Answer', text: 'Open the main ShowPay login page and use its Forget Password option, then follow the recovery instructions shown there.' },
        },
        {
          '@type': 'Question',
          name: 'Should I share my ShowPay OTP or MPIN for password recovery?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. Never share your password, OTP or MPIN with another person or an unverified support contact.' },
        },
      ],
    },
    body: `
      <h1>ShowPay Password Help</h1>
      <p>If you cannot sign in, open the main <a href="/">ShowPay login</a> and use the <strong>Forget Password</strong> option shown on that page. Follow only the recovery instructions opened from the login screen.</p>
      <h2>Protect your account during recovery</h2>
      <ul>
        <li>Never send your current password, OTP or MPIN to another person.</li>
        <li>Check the website address before entering recovery information.</li>
        <li>Create a password that is not reused on another website.</li>
        <li>After recovery, sign in again from the main app-showpay.in login.</li>
      </ul>
      <h2>If recovery is unavailable</h2>
      <p>Do not create repeated requests or trust an unknown contact claiming to reset the account manually. Review the <a href="/showpay-support.html">ShowPay support guide</a> for safe next steps.</p>
      <p class="notice">This guide never asks for or stores a password. Password recovery remains part of the existing ShowPay login workflow.</p>
    `,
  },
];

const extendedContent = {
  'about-showpay.html': `
      <section class="content-section">
        <h2>What you can find on this website</h2>
        <p>app-showpay.in brings the ShowPay login and public help guides together on one domain. The public pages explain account access, mobile use, deposits, USDT checks, password recovery and support. Features shown after login can vary by account, so the signed-in dashboard remains the place to confirm current options.</p>
        <div class="info-grid">
          <article class="info-card"><span class="card-icon">01</span><h3>Account access</h3><p>Open the verified ShowPay login, enter your own account details and use the recovery link when required.</p></article>
          <article class="info-card"><span class="card-icon">02</span><h3>Mobile-friendly app</h3><p>Use ShowPay through a current mobile browser without relying on an unverified APK or download link.</p></article>
          <article class="info-card"><span class="card-icon">03</span><h3>Practical guides</h3><p>Review task-focused instructions before using deposit, USDT or account-help features.</p></article>
        </div>
      </section>
      <section class="content-section">
        <h2>How ShowPay information stays useful</h2>
        <p>These pages avoid displaying private account data, fixed wallet addresses or promises about transaction availability. Instead, they explain what to verify on the live account screen. This matters because networks, limits, fees and enabled services can change.</p>
        <ul class="check-list"><li>Confirm the domain before signing in.</li><li>Use only features visible inside your own dashboard.</li><li>Read current on-screen amounts, fees and status messages.</li><li>Never share a password, OTP, MPIN or recovery code.</li></ul>
      </section>`,
  'showpay-apk.html': `
      <section class="content-section">
        <h2>ShowPay app access: web app or APK?</h2>
        <p>The current verified access on this domain is the mobile-friendly web application. It adapts to a phone screen and does not require a separate installation. If an official downloadable Android package becomes available, its publisher, version and permissions should be confirmed before installation.</p>
        <div class="comparison"><div><strong>Mobile web access</strong><span>Open app-showpay.in in your browser</span></div><div><strong>Unknown APK file</strong><span>Avoid unless the source and publisher are verified</span></div></div>
      </section>
      <section class="content-section">
        <h2>Add ShowPay to your phone home screen</h2>
        <ol><li>Open the ShowPay login using a current mobile browser.</li><li>Confirm the address bar shows <strong>app-showpay.in</strong>.</li><li>Open the browser menu and choose the available “Add to Home screen” option.</li><li>Use the new shortcut to return to the same verified web address.</li></ol>
        <p>This shortcut does not install an unknown APK and can be removed like any other home-screen shortcut.</p>
      </section>
      <section class="content-section"><h2>Common ShowPay APK questions</h2><h3>Does this page provide an APK download?</h3><p>No. This page provides safe access guidance and a direct link to the ShowPay web login.</p><h3>What if a message sends me an APK?</h3><p>Do not install it only because it uses the ShowPay name. Verify the publisher and source first, and avoid files requesting unnecessary permissions.</p></section>`,
  'showpay-support.html': `
      <section class="content-section">
        <h2>Choose the right help path</h2>
        <div class="info-grid"><article class="info-card"><h3>Cannot sign in</h3><p>Check the phone number, password and website address, then use the recovery option from the login page.</p></article><article class="info-card"><h3>Deposit is pending</h3><p>Review the dashboard status, payment reference or blockchain transaction ID before trying again.</p></article><article class="info-card"><h3>USDT question</h3><p>Confirm the network, complete address and required confirmations using the current account screen.</p></article></div>
      </section>
      <section class="content-section"><h2>Information to keep ready</h2><p>For a clear account or transaction enquiry, keep non-secret details such as the approximate time, displayed status and transaction reference ready. Never include your password, OTP, MPIN, recovery code or full private credentials in a support message.</p><ul class="check-list"><li>Take note of the exact error or status text.</li><li>Confirm whether the issue occurs before or after login.</li><li>For blockchain transfers, keep the public transaction ID.</li><li>Avoid sending the same payment again until its status is clear.</li></ul></section>
      <section class="content-section"><h2>Account safety reminder</h2><p>A genuine help process should not require your current password or MPIN. If someone asks you to transfer funds to “unlock” support, stop and verify the request through the information available inside your account.</p><p>Keep screenshots limited to the part that shows the error and hide phone numbers, balances, wallet addresses or other private details before sharing them. Clear information helps explain the issue without exposing the account.</p></section>`,
  'showpay-usdt.html': `
      <section class="content-section">
        <h2>USDT network matching explained</h2>
        <p>USDT can exist on more than one blockchain network. The network selected in the sending wallet must match the network shown in the ShowPay deposit option. A correct-looking address does not make a network mismatch safe. Always compare the network name and the complete destination address before confirming a transfer.</p>
        <div class="process"><div><b>1</b><span><strong>Open your account</strong>Use the verified ShowPay login.</span></div><div><b>2</b><span><strong>Match details</strong>Check network, address, amount and fee.</span></div><div><b>3</b><span><strong>Track status</strong>Keep the transaction ID and review confirmations.</span></div></div>
      </section>
      <section class="content-section"><h2>If a ShowPay USDT transaction is pending</h2><p>First check whether the sending wallet shows a completed transaction and whether the blockchain explorer shows confirmations. Then compare that information with the status in your account. Network congestion can delay confirmations, so repeating the transfer may create a second transaction rather than fixing the first.</p><ul class="check-list"><li>Verify the public transaction ID.</li><li>Check the destination address and selected network.</li><li>Review the number of blockchain confirmations.</li><li>Keep account secrets out of any support request.</li></ul></section>
      <section class="content-section"><h2>Important USDT safety checks</h2><p>Blockchain transactions may be irreversible. Do not use a wallet address copied from an old screenshot or an unknown chat. If the details displayed in your current account differ from an earlier instruction, pause and verify before sending.</p></section>`,
  'showpay-guide.html': `
      <section class="content-section"><h2>Start with the task you want to complete</h2><div class="guide-grid"><a href="/how-to-use-showpay.html"><strong>Use ShowPay</strong><span>Login and dashboard basics</span></a><a href="/showpay-apk"><strong>App &amp; APK</strong><span>Safe mobile access</span></a><a href="/how-to-deposit-showpay.html"><strong>Deposit guide</strong><span>General payment checks</span></a><a href="/showpay-usdt"><strong>USDT guide</strong><span>Network and address checks</span></a><a href="/showpay-password-help.html"><strong>Password help</strong><span>Recovery and account safety</span></a><a href="/showpay-support.html"><strong>Support</strong><span>Common issue guidance</span></a></div></section>
      <section class="content-section"><h2>How to use these ShowPay guides</h2><p>Begin with the guide matching your task, then use the blue ShowPay Login button when you are ready to access your account. The guides do not collect personal information and do not replace current instructions displayed inside the dashboard.</p><p>Searches may spell the name as ShowPay, Showpay or Show pay. The pages use the consistent brand spelling while answering the same account, app, deposit, USDT and password-help questions in natural language.</p></section>
      <section class="content-section"><h2>Before taking account action</h2><ul class="check-list"><li>Confirm you are on app-showpay.in.</li><li>Read the complete current instruction.</li><li>Verify amounts, networks and destination details.</li><li>Do not share credentials with another person.</li><li>Check status before repeating a request or payment.</li></ul><p>Bookmark this guide hub if you regularly need help. Returning through one consistent page makes it easier to find the correct instructions and reduces the risk of following an outdated or unverified third-party link.</p></section>`,
  'how-to-use-showpay.html': `
      <section class="content-section"><h2>ShowPay first-time access checklist</h2><div class="process"><div><b>1</b><span><strong>Open</strong>Visit app-showpay.in directly.</span></div><div><b>2</b><span><strong>Login</strong>Use your own registered details.</span></div><div><b>3</b><span><strong>Review</strong>Check the tools enabled for your account.</span></div></div><p>On a shared phone, avoid saving the password and sign out when you finish. On your own device, keep the browser and operating system updated.</p></section>
      <section class="content-section"><h2>Understanding the account dashboard</h2><p>After login, read the labels and status shown in the dashboard before selecting a feature. Availability can differ between accounts and can change over time. An older screenshot, video or message may not reflect the current workflow.</p><p>When an action involves a payment, wallet address or verification step, review every field before continuing. If the screen is unclear or a feature is unavailable, use the relevant public guide instead of guessing.</p></section>
      <section class="content-section"><h2>Using ShowPay safely on mobile</h2><ul class="check-list"><li>Check the domain every time you open a saved link.</li><li>Do not enter credentials after following an unknown message.</li><li>Never share OTP, MPIN or recovery information.</li><li>Review account activity and status after completing an action.</li></ul></section>`,
  'how-to-deposit-showpay.html': `
      <section class="content-section"><h2>Step-by-step ShowPay deposit checks</h2><div class="process"><div><b>1</b><span><strong>Select</strong>Open the deposit option shown in your dashboard.</span></div><div><b>2</b><span><strong>Verify</strong>Read method, amount and destination details.</span></div><div><b>3</b><span><strong>Confirm</strong>Complete the action once and keep its reference.</span></div></div></section>
      <section class="content-section"><h2>Before confirming a deposit</h2><p>Check whether the displayed method has a minimum amount, processing fee, expiry time or required payment reference. Entering incomplete information can delay account credit. Use only the instructions currently visible in your account.</p><ul class="check-list"><li>Confirm the selected payment or deposit method.</li><li>Check the complete recipient or wallet information.</li><li>Review minimum, maximum and fee details.</li><li>Save the payment or transaction reference.</li></ul></section>
      <section class="content-section"><h2>If the deposit status does not update</h2><p>Do not immediately send another payment. Compare your payment confirmation with the dashboard status and allow for the processing time shown. For a crypto transfer, check the blockchain transaction ID and network confirmations. Use the support guidance with non-secret transaction information if the issue continues.</p></section>`,
  'how-to-deposit-usdt-showpay.html': `
      <section class="content-section"><h2>USDT deposit verification flow</h2><div class="process"><div><b>1</b><span><strong>Choose network</strong>Use a network supported by both sides.</span></div><div><b>2</b><span><strong>Copy carefully</strong>Compare the complete destination address.</span></div><div><b>3</b><span><strong>Track transfer</strong>Keep the public transaction ID.</span></div></div></section>
      <section class="content-section"><h2>Why the network matters</h2><p>A token with the same USDT name can be transferred on different networks. The sender and receiver must use the same supported network. Fees, processing time and required confirmations can also differ. Never choose a network only because it has the lowest fee unless the receiving screen explicitly supports it.</p></section>
      <section class="content-section"><h2>After sending USDT</h2><p>Use the transaction ID to check whether the blockchain has confirmed the transfer. A wallet showing “sent” does not always mean the receiving platform has completed its own confirmation process. Wait for the required confirmations and monitor the account status before trying another transfer.</p><ul class="check-list"><li>Sender and ShowPay network match.</li><li>Full wallet address matches.</li><li>Amount meets any displayed minimum.</li><li>Transaction ID is saved for status checks.</li></ul></section>`,
  'showpay-password-help.html': `
      <section class="content-section"><h2>Safe ShowPay password recovery steps</h2><div class="process"><div><b>1</b><span><strong>Start correctly</strong>Open recovery from the main login page.</span></div><div><b>2</b><span><strong>Verify</strong>Follow only the on-screen recovery process.</span></div><div><b>3</b><span><strong>Return</strong>Sign in again at app-showpay.in.</span></div></div></section>
      <section class="content-section"><h2>Create a stronger new password</h2><p>Use a password that is unique to ShowPay and difficult to guess. Avoid your name, phone number, birth date or a password already used on another website. Store it in a trusted password manager rather than sending it to yourself in an unprotected message.</p><ul class="check-list"><li>Use a long, unique password.</li><li>Do not share verification codes.</li><li>Check the website address during recovery.</li><li>Review the account after signing back in.</li></ul></section>
      <section class="content-section"><h2>Recovery messages to avoid</h2><p>Ignore anyone who asks for your current password, OTP, MPIN or a payment to unlock the account. Do not install remote-access software for password help. If the official recovery flow is unavailable, record the visible error and use the support guidance without disclosing secret credentials.</p></section>`,
};

const styles = `
      :root { color-scheme: light; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; --brand:#007bff; --brand-dark:#0056b3; --ink:#172033; --muted:#667085; --surface:#fff; --line:#e7edf5; }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; background: #f5f7fa; color: var(--ink); line-height: 1.72; }
      .site-header { position: sticky; top: 0; z-index: 20; background: rgba(255,255,255,.94); border-bottom: 1px solid var(--line); backdrop-filter: blur(12px); }
      .header-inner { width: min(920px, calc(100% - 32px)); min-height: 64px; margin: auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
      .brand { display: inline-flex; align-items: center; gap: 10px; color: var(--brand); font-size: 1.22rem; font-weight: 800; text-decoration: none; letter-spacing: -.02em; }
      .brand img { width: 34px; height: 34px; border-radius: 9px; object-fit: contain; }
      .top-login { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 18px; border-radius: 10px; background: var(--brand); color: #fff; font-weight: 750; text-decoration: none; }
      main { width: min(920px, calc(100% - 32px)); margin: 24px auto 40px; padding: clamp(22px, 5vw, 46px); background: var(--surface); border: 1px solid var(--line); border-radius: 22px; box-shadow: 0 14px 44px rgba(26, 80, 140, .08); }
      .eyebrow { display: inline-flex; margin-bottom: 6px; padding: 6px 11px; border-radius: 999px; background: #eaf4ff; color: var(--brand-dark); font-size: .76rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
      h1, h2, h3 { color: var(--ink); line-height: 1.24; letter-spacing: -.025em; }
      h1 { max-width: 720px; margin: 12px 0 16px; font-size: clamp(2rem, 7vw, 3.25rem); }
      h2 { margin-top: 0; font-size: clamp(1.38rem, 4vw, 1.8rem); }
      h3 { font-size: 1.05rem; }
      p { color: #3d485c; }
      a { color: var(--brand-dark); text-underline-offset: 3px; }
      li + li { margin-top: .55rem; }
      .cta { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; margin: .55rem 0 1.4rem; padding: 0 22px; border-radius: 12px; background: linear-gradient(135deg, #1e90ff, var(--brand)); color: #fff; font-weight: 800; text-decoration: none; box-shadow: 0 9px 20px rgba(0,123,255,.22); }
      .cta:hover, .cta:focus-visible, .top-login:hover, .top-login:focus-visible { background: var(--brand-dark); }
      .content-section { margin-top: 34px; padding-top: 30px; border-top: 1px solid var(--line); }
      .info-grid, .guide-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 18px; }
      .info-card, .guide-grid a { padding: 18px; border: 1px solid #dfeaf6; border-radius: 15px; background: #fbfdff; text-decoration: none; }
      .info-card h3 { margin: 10px 0 5px; }
      .info-card p { margin: 0; font-size: .94rem; }
      .card-icon { display: inline-flex; width: 34px; height: 34px; align-items: center; justify-content: center; border-radius: 9px; background: #eaf4ff; color: var(--brand); font-weight: 850; }
      .guide-grid { grid-template-columns: repeat(2, 1fr); }
      .guide-grid a { display: flex; flex-direction: column; transition: transform .18s ease, border-color .18s ease; }
      .guide-grid a:hover { transform: translateY(-2px); border-color: #8dc5ff; }
      .guide-grid span { color: var(--muted); font-size: .9rem; }
      .process { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 18px 0; }
      .process div { display: flex; gap: 12px; padding: 16px; border-radius: 14px; background: #f6faff; border: 1px solid #e2eefb; }
      .process b { flex: 0 0 30px; width: 30px; height: 30px; display: grid; place-items: center; border-radius: 50%; background: var(--brand); color: #fff; }
      .process span { display: flex; flex-direction: column; color: var(--muted); font-size: .88rem; line-height: 1.45; }
      .process strong { color: var(--ink); }
      .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 18px; }
      .comparison div { padding: 18px; border-radius: 14px; background: #f6faff; border: 1px solid #e2eefb; }
      .comparison span { display: block; margin-top: 4px; color: var(--muted); }
      .check-list { padding: 0; list-style: none; }
      .check-list li { position: relative; padding-left: 30px; }
      .check-list li::before { content: "✓"; position: absolute; left: 0; top: 1px; width: 21px; height: 21px; display: grid; place-items: center; border-radius: 50%; background: #e8f6ee; color: #138a48; font-size: .76rem; font-weight: 900; }
      .notice { margin-top: 1.5rem; padding: 15px 17px; border-left: 4px solid var(--brand); border-radius: 0 12px 12px 0; background: #f0f8ff; }
      .guide-nav { margin-top: 2.25rem; padding-top: 1.25rem; border-top: 1px solid #e5e7eb; }
      .guide-nav a + a { margin-left: 12px; }
      .site-footer { padding: 0 16px 32px; color: var(--muted); text-align: center; font-size: .86rem; }
      @media (max-width: 700px) { .info-grid, .process { grid-template-columns: 1fr; } .guide-grid, .comparison { grid-template-columns: 1fr; } }
      @media (max-width: 560px) { .header-inner { width: min(100% - 24px, 920px); } main { width: min(100% - 20px, 920px); margin: 10px auto 26px; padding: 22px 18px; border-radius: 16px; } .guide-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 12px; } .guide-nav a + a { margin-left: 0; } }
`;

const guideNavigation = `
      <nav class="guide-nav" aria-label="ShowPay guide navigation">
        <a href="/showpay-guide.html">All ShowPay guides</a>
        <a href="/about-showpay.html">About ShowPay</a>
        <a href="/showpay-support.html">Support</a>
        <a href="/">Login</a>
      </nav>`;

for (const page of pages) {
  const canonical = `${domain}${page.route ?? `/${page.filename}`}`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" type="image/png" href="/showpay-logo.png" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="ShowPay" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${socialImage}" />
    <meta property="og:image:alt" content="ShowPay logo" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${socialImage}" />
    <script type="application/ld+json">${JSON.stringify(page.schema)}</script>
    <style>${styles}</style>
  </head>
  <body>
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="/" aria-label="ShowPay home"><img src="/showpay-logo.png" width="34" height="34" alt="" /><span>ShowPay</span></a>
        <a class="top-login" href="/">Login</a>
      </div>
    </header>
    <main>
      <span class="eyebrow">ShowPay Help Center</span>
${page.body.trim()}
      <a class="cta" href="/">ShowPay Login</a>
${extendedContent[page.filename] ?? ''}
${guideNavigation}
    </main>
    <footer class="site-footer">ShowPay public help guides · Always verify the current information inside your account.</footer>
  </body>
</html>
`;

  writeIfChanged(path.join(publicDir, page.filename), html);
}

const robots = `User-agent: *
Disallow: /admin
Disallow: /admin-app/
Allow: /

Sitemap: ${domain}/sitemap.xml
`;

writeIfChanged(path.join(publicDir, 'robots.txt'), robots);
require('./generate-sitemap.cjs');

console.log('SEO pages, robots.txt and sitemap.xml generated successfully.');
