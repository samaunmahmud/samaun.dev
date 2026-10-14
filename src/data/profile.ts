import type { Profile } from './types.ts'

/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for the whole site.
 *  Every section reads from this object — to change what the site
 *  says, edit this file only. Search for "TODO" to find the gaps.
 * ─────────────────────────────────────────────────────────────
 */
export const profile: Profile = {
  name: 'Samaun Mahmud',
  shortName: 'Samaun',
  role: 'Full-stack Java developer',
  location: 'Uxbridge, London',
  timezone: 'Europe/London',
  greeting: 'Hello!',
  headline: { lead: "I’m", accent: 'Samaun', tail: 'Full-stack Java Developer' },
  // TODO: add a portrait (ideally a cut-out PNG with a transparent background) as public/me.png, then uncomment —
  // it replaces the terminal on the hero's orange circle
  // photo: '/me.png',
  tagline:
    'Computer Science (AI) student at Brunel University London. I build real-time, data-heavy applications with Spring Boot and React, with a particular interest in fintech.',
  about: [
    "I’m a second-year Computer Science (Artificial Intelligence) student at Brunel University London, on the four-year track with an industrial placement.",
    "Most of what I build sits where backend engineering meets finance: streaming market data over WebSockets, keeping trade ledgers consistent with transactions, and wiring third-party banking APIs into apps people can actually use.",
    "I learn by shipping. Every project here was deployed, broken, debugged and rebuilt — and the debugging stories are usually my favourite part. Outside my own projects I’m a Student Support Ambassador at Brunel, and I spend a lot of weekends at hackathons.",
  ],
  availability: 'Open to 12-month industrial placements from summer 2027',
  now: [
    // TODO: what are you building now? Meridian shipped as v1.0.0 in Oct 2026, so the old 'Building' line was stale
    { label: 'Just shipped', value: 'Meridian v1.0.0 — a paper-trading broker for stocks and crypto' },
    { label: 'Hacking', value: 'Multi-agent investment committee for Nebius × NVIDIA' },
    { label: 'Looking for', value: 'A 12-month placement in fintech or big tech' },
  ],
  email: 'samaunmahmud9@gmail.com',
  emailSubject: 'Placement enquiry',
  // TODO: optional — add a designed CV as public/cv.pdf, then uncomment. Until then the résumé buttons
  // open /resume, a printable page generated from this file.
  // cvUrl: '/cv.pdf',
  siteUrl: 'https://samaun-dev.vercel.app',
  sourceRepo: 'https://github.com/samaunmahmud/samaun.dev',
  hiddenRepos: ['CashMatrix', 'Pacific-E-Commerce-Marketplace', 'Expense-Tracker-*', 'Bear-Bull-Market'],

  socials: [
    {
      key: 'github',
      label: 'GitHub',
      handle: 'samaunmahmud',
      url: 'https://github.com/samaunmahmud',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      handle: 'samaun-mahmud',
      url: 'https://www.linkedin.com/in/samaun-mahmud',
    },
    // TODO: add your LeetCode username, then uncomment (hidden so there's no broken link)
    // {
    //   key: 'leetcode',
    //   label: 'LeetCode',
    //   handle: 'your-username',
    //   url: 'https://leetcode.com/u/your-username/',
    // },
    {
      key: 'email',
      label: 'Email',
      handle: 'samaunmahmud9@gmail.com',
      url: 'mailto:samaunmahmud9@gmail.com',
    },
  ],

  stats: [
    { value: '6', label: 'projects shipped or in build' },
    { value: '3', label: 'hackathons in 2026' },
    { value: 'Java', label: 'first language' },
  ],

  projects: [
    {
      slug: 'meridian',
      name: 'Meridian',
      tagline: 'Paper-trading app for stocks and crypto that behaves like a real broker',
      description:
        'A full paper-trading account that follows the rules of a real one: market, limit, stop-loss and trailing-stop orders that respect NYSE/Nasdaq hours, USD, EUR and GBP wallets, dividends, and live prices pushed over WebSockets. Built from 18 September to 11 October 2026 and released as v1.0.0.',
      highlights: [
        'About 830 market orders/s with 50 concurrent users (p99 ≈ 100 ms), every cash balance and holding consistent afterwards',
        'Found a lost-update race under MySQL’s default REPEATABLE READ (130 of 1,550 positions wrong while every request returned 200); fixed with row locks on every money path and READ COMMITTED, guarded by real-MySQL concurrency tests in CI',
        'A price update reaches 1,000 WebSocket clients in about 20 ms',
        '316 backend (JUnit) and 210 frontend (Vitest) tests; Docker Compose with nginx, health checks and backups',
      ],
      stack: ['Java', 'Spring Boot', 'React', 'MySQL', 'Flyway', 'WebSockets', 'Docker', 'Alpha Vantage'],
      status: 'complete',
      featured: true,
      repo: 'https://github.com/samaunmahmud/Meridian',
      image: '/projects/meridian.webp',
      imageSize: [1200, 750],
      imageDark: '/projects/meridian-dark.webp',
      accent: 'teal',
      art: 'candles',
      flow: [
        {
          id: 'data',
          label: 'Market data',
          tech: 'Alpha Vantage · Finnhub',
          detail:
            'A poller fetches quotes and exchange rates within a daily request budget. A closed stock market isn’t polled once its closing price is recorded, so nights and weekends cost nothing.',
        },
        {
          id: 'backend',
          label: 'Order engine',
          tech: 'Spring Boot · Java',
          detail:
            'Every new price runs the order engine: limit and stop orders fill only while the market is open, trailing stops ratchet up, and queued market orders fill at the first price after the open.',
        },
        {
          id: 'ledger',
          label: 'Ledger',
          tech: 'MySQL · Flyway',
          detail:
            'Every money path locks the account’s rows before reading a balance, under READ COMMITTED. Load tests end with invariant checks: cash equals deposits plus the ledger, holdings equal filled buys minus sells.',
          branchOf: 'backend',
        },
        {
          id: 'stream',
          label: 'Live stream',
          tech: 'WebSocket',
          detail: 'Prices, fills, rejections, triggered alerts and dividends are pushed to the browser over a WebSocket.',
        },
        {
          id: 'ui',
          label: 'Dashboard',
          tech: 'React',
          detail:
            'A Revolut-style React app for phone and desktop: live prices, trading, realised and unrealised P&L, and your time-weighted return against the S&P 500.',
        },
      ],
    },
    {
      slug: 'expense-tracker',
      name: 'Expense Tracker',
      tagline: 'Full-stack personal finance app with live bank connections',
      description:
        'Links real bank accounts through Plaid, pulls transactions, and tracks spending behind JWT-secured endpoints. Deployed with the API on Render and the frontend on Vercel.',
      highlights: [
        'Plaid integration for real bank account linking and transaction sync',
        'Tracked down silent 403s caused by a Spring WebFlux / MVC classpath clash',
        'Worked around Plaid client_user_id restrictions and a JSON serialisation recursion bug',
      ],
      stack: ['Spring Boot', 'React', 'PostgreSQL', 'Plaid API', 'JWT', 'Docker'],
      status: 'live',
      featured: true,
      repo: undefined, // TODO: repo URL
      demo: undefined, // TODO: live Vercel URL
      accent: 'sky',
      art: 'bars',
    },
    {
      slug: 'investment-committee',
      name: 'Zenith',
      tagline: 'An AI investment committee you can audit',
      description:
        'Three NVIDIA Nemotron analysts (fundamentals, technicals and risk) argue a stock from figures computed in Java; a Nemotron Ultra chair calls BUY, HOLD or SELL and records who disagreed. Every cited figure is checked, every call is scored against the S&P 500 and every cent is on the bill. Built for the Nebius × NVIDIA Global AI Hackathon.',
      highlights: [
        'LLMs interpret, code calculates: every figure an analyst cites must trace back to its fact sheet, or the reply is rejected and retried',
        'Nano / Super / Ultra models matched to each seat: a full committee costs $0.017–0.022, about 2–3x cheaper than Ultra alone, with exactly one Ultra call per decision',
        'Turning reasoning off for the narrow seats cut model time per session from about 50 s to 24 s',
        'SHA-256 decision receipts; 150 backend and 52 frontend tests, with CI and CodeQL on every push',
      ],
      stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'LLM agents', 'Nemotron', 'Nebius', 'Docker'],
      status: 'hackathon',
      repo: 'https://github.com/samaunmahmud/zenith',
      demo: 'https://zenith-h4ch.onrender.com',
      image: '/projects/investment-committee.webp',
      imageSize: [1200, 858],
      accent: 'violet',
      art: 'network',
    },
    {
      slug: 'pneumonia-classifier',
      name: 'Pneumonia Classifier',
      tagline: 'Chest X-ray CNN served behind a Java REST API',
      description:
        'A convolutional network trained in Deeplearning4j to flag pneumonia in chest X-rays, tuned for recall because a missed case costs far more than a false alarm.',
      highlights: [
        'Optimised for high recall rather than headline accuracy',
        'Custom EvaluateModel.java script to measure the model properly',
        'Model exposed through a Spring Boot REST endpoint',
      ],
      stack: ['Java', 'Deeplearning4j', 'CNN', 'Spring Boot'],
      status: 'live',
      accent: 'rose',
      art: 'scan',
    },
    {
      slug: 'pacific',
      name: 'Pacific',
      tagline: 'Multi-seller marketplace: one product page, however many stores sell it',
      description:
        'Independent shops sell through one store, Amazon-marketplace style: shoppers search one catalogue, fill one basket and check out once, even across several sellers. It grew out of Pacific Reviews, a JavaFX review app; its reviews, ratings and moderation live on inside the full marketplace.',
      highlights: [
        'One page per product, many sellers: offers compete for a buy box (in stock → new over used → lowest price)',
        'One basket and one Stripe payment, split into an order per seller, each with its own delivery and status',
        'Seller Central, plus an admin dashboard with per-seller commission, review moderation, returns and refunds',
        '181 backend tests and 17 end-to-end Puppeteer checks; Flyway migrations on MySQL',
      ],
      stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'MySQL', 'Stripe', 'JWT', 'Flyway'],
      status: 'complete',
      featured: true,
      repo: 'https://github.com/samaunmahmud/Pacific',
      image: '/projects/pacific.webp',
      imageSize: [1200, 650],
      imageDark: '/projects/pacific-dark.webp',
      accent: 'amber',
      art: 'stars',
    },
    {
      slug: 'cinescout',
      name: 'CineScout',
      tagline: 'Scout real filming locations from a script',
      description:
        'Paste a screenplay: CineScout reads each scene for the place it needs, finds real venues on the web, scores how well each one fits, works out the light, weather and logistics on the shoot day, and drafts the email to the owner. Then it plans the shoot: schedule, call sheet, budget and permits.',
      highlights: [
        'Scene → location requirements → real venues: IBM watsonx.ai reads the scene, Parallel web search finds candidates, directory pages are dropped and duplicates merged',
        'Moved fit scoring from the model into code: asked directly, the model rated nearly every venue 60; computed scores spread from 76 to 1',
        'Reactive WebFlux API with retries and circuit breakers around every external call; blocking JPA kept off the event loop',
        '840 backend tests (JUnit, WireMock, Testcontainers on real PostgreSQL) and 306 web tests; 133 endpoints, 30 Flyway migrations',
      ],
      stack: ['Java', 'Spring Boot', 'Spring WebFlux', 'PostgreSQL', 'Flyway', 'React', 'TypeScript', 'watsonx.ai', 'Parallel', 'Docker'],
      status: 'in-progress',
      repo: 'https://github.com/samaunmahmud/cinescout',
      demo: 'https://cinescout-4zjm.onrender.com',
      image: '/projects/cinescout.webp',
      imageSize: [1200, 750],
      accent: 'teal',
      art: 'map',
    },
  ],

  timeline: [
    {
      title: 'BSc Computer Science (Artificial Intelligence) with Work Placement',
      org: 'Brunel University London',
      period: '2025 — present', // TODO: check dates
      kind: 'education',
      points: ['Second year; placement year planned for 2027–28', 'Focus: software engineering, AI and machine learning'],
    },
    {
      title: 'Student Support Ambassador',
      org: 'Brunel University London',
      period: 'Current', // TODO: start date
      kind: 'role',
      points: ['Help new and current students find their way around university life and support services'],
    },
    {
      title: 'Nebius × NVIDIA Global AI Hackathon',
      org: 'Devpost',
      period: 'Autumn 2026',
      kind: 'hackathon',
      points: ['Built Zenith, a multi-agent AI investment committee on NVIDIA Nemotron models (Best Apps and Agents track)'],
    },
    {
      title: 'Agentic Cinema Hackathon',
      org: 'Google Cloud',
      period: 'Sep 2026',
      kind: 'hackathon',
      points: ['Built a film-production research agent on the Parallel track'],
    },
  ],

  // TODO: add a right-to-work / visa answer here if you want recruiters to see it
  faq: [
    {
      q: 'When could you start?',
      a: 'Summer 2027, for a 12-month industrial placement. It’s the placement year of my four-year Computer Science (AI) degree at Brunel University London.',
    },
    {
      q: 'What kind of role are you looking for?',
      a: 'A 12-month placement in fintech or big tech, ideally backend or full-stack Java work.',
    },
    {
      q: 'What’s your strongest stack?',
      a: 'Java is my first language. Most of my projects pair Spring Boot on the backend with React on the frontend, PostgreSQL or MySQL for data and Docker for running services.',
    },
    {
      q: 'Can I see your code?',
      a: 'Yes. My projects are on GitHub at @samaunmahmud, including the source for this site.',
    },
    {
      q: 'Where are you based?',
      a: 'Uxbridge, London, near Brunel’s campus.',
    },
  ],

  // TODO: prune anything here you wouldn't want to be quizzed on in an interview
  skills: [
    { name: 'Languages', items: ['Java', 'TypeScript', 'JavaScript', 'Python', 'SQL'] },
    { name: 'Backend', items: ['Spring Boot', 'Spring Security', 'REST', 'WebSockets', 'JPA / Hibernate', 'JWT'] },
    { name: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'HTML & CSS'] },
    { name: 'Data & ML', items: ['PostgreSQL', 'MySQL', 'Deeplearning4j', 'CNNs', 'LLM agents'] },
    { name: 'Tooling', items: ['Docker', 'Git & GitHub', 'CI/CD', 'JUnit / TDD', 'Render', 'Vercel'] },
  ],

}
