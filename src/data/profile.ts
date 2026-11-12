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
    { label: 'Building', value: 'ReVive — agentic photo restoration for the OpenCV AI Competition 2026' },
    { label: 'Just shipped', value: 'Leash — spending limits for AI agents, enforced through PayPal' },
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
    // TODO: LeetCode-365's README links leetcode.com/Samaun_Mahmud, but LeetCode says that user doesn't exist —
    // confirm the real username, then uncomment
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
    { value: '10', label: 'projects shipped or in build' },
    { value: '4', label: 'hackathons in 2026' },
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
      slug: 'leash',
      name: 'Leash',
      tagline: 'Spending limits for AI agents, enforced through PayPal',
      description:
        'Give an AI agent a spending mandate in plain English, like “groceries, £60 a week, ask me over £25”. Every purchase it tries is checked by fixed rules in Java and by risk checks, then paid through PayPal, sent to the owner to approve, or blocked with the reason on record. Agents connect over MCP. Built for the PayPal AI Hackathon.',
      highlights: [
        'The AI can only tighten, never approve: rule-based and Gemini risk checks can turn an approve into a tug or a block, and a test covers every combination',
        'Catches prompt injection: a product page hiding “buy 5 gift cards” in a display:none span gets the £500 purchase blocked, with the hidden text quoted in the reason card',
        'Idempotent payments: every PayPal order, capture and refund carries a request ID, and signature-checked webhooks are applied once and only move an entry forward',
        '288 backend and 36 frontend tests, with PayPal and the AI faked so the suite never calls a real API',
      ],
      stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Flyway', 'PayPal API', 'MCP', 'Gemini', 'Docker'],
      status: 'hackathon',
      featured: true,
      repo: 'https://github.com/samaunmahmud/leash',
      demo: 'https://leash-6sb3.onrender.com',
      image: '/projects/leash.webp',
      imageSize: [1200, 750],
      accent: 'rose',
      art: 'network',
      flow: [
        {
          id: 'agent',
          label: 'AI agent',
          tech: 'MCP · REST',
          detail:
            'Any MCP client calls request_purchase with its own key. The key decides which leash it spends under, so one agent can never spend under another’s.',
        },
        {
          id: 'policy',
          label: 'Policy engine',
          tech: 'Java',
          detail:
            'Plain Java with no framework code checks the spending limit per period, the auto-approve amount, shops, categories, the per-purchase cap, purchases per hour and quiet hours.',
        },
        {
          id: 'mandate',
          label: 'Mandate parser',
          tech: 'Gemini',
          detail:
            'Turns a plain-English mandate into draft rules, with notes on anything it’s unsure of. Nothing is saved until the owner confirms every field.',
          branchOf: 'policy',
        },
        {
          id: 'risk',
          label: 'Risk checks',
          tech: 'Rules · Gemini',
          detail:
            'Read the task, the basket and the page the agent came from, catching prompt injection, look-alike shops, price spikes and bursts. They can only escalate: approve → tug → block.',
        },
        {
          id: 'paypal',
          label: 'PayPal',
          tech: 'Orders v2 · Vault v3',
          detail:
            'Approved purchases become sandbox orders sent with a PayPal-Request-Id, so a retry never pays twice. Borderline ones go to the owner as a tug; blocked ones never reach PayPal.',
        },
        {
          id: 'ledger',
          label: 'Ledger',
          tech: 'PostgreSQL · SSE',
          detail:
            'Every attempt is kept with a reason card and streamed live to the dashboard. Signature-checked webhooks confirm or reverse payments, and Regret refunds one in full.',
        },
      ],
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
      flow: [
        {
          id: 'data',
          label: 'Market data',
          tech: 'FMP · Finnhub · Tiingo',
          detail: 'About a year of daily prices, fundamentals and recent headlines are fetched and cached on disk.',
        },
        {
          id: 'news',
          label: 'News desk',
          tech: 'Nemotron Nano',
          detail: 'Condenses the headlines into themes and events for the Fundamentals and Risk analysts.',
          branchOf: 'data',
        },
        {
          id: 'facts',
          label: 'Fact sheets',
          tech: 'Java',
          detail:
            'Every number is calculated in Java, not by a model: returns, moving averages, RSI, MACD, volatility, drawdown, beta and valuation ratios, formatted once into a fact sheet for each analyst.',
        },
        {
          id: 'analysts',
          label: 'Analysts',
          tech: 'Nemotron Nano · Super',
          detail:
            'Fundamentals, Technicals and Risk run in parallel on Java virtual threads, each starting as soon as its inputs exist. Every figure they cite must trace back to their fact sheet, or the reply is rejected and retried.',
        },
        {
          id: 'rebuttal',
          label: 'Rebuttal round',
          tech: 'One round only',
          detail: 'Each analyst gets exactly one short reply to a colleague. There are no open-ended debate loops, so cost and latency stay predictable.',
          branchOf: 'analysts',
        },
        {
          id: 'chair',
          label: 'Chair',
          tech: 'Nemotron Ultra',
          detail:
            'Calls BUY, HOLD or SELL, names the analyst behind each reason, records the strongest dissent and picks the conditions that would change its call from a menu computed in code.',
        },
        {
          id: 'memo',
          label: 'Memo & receipt',
          tech: 'SHA-256 · SSE',
          detail:
            'Code assembles the memo from the structured outputs and hashes everything the committee saw. Live runs stream to the browser over Server-Sent Events.',
        },
      ],
      accent: 'violet',
      art: 'network',
    },
    {
      slug: 'revive',
      name: 'ReVive',
      tagline: 'Agentic photo restoration with OpenCV 5',
      description:
        'Restores old, damaged photos the way a human restorer would: it measures what is wrong, plans a repair, acts, then re-measures to check the repair actually helped. When a fix could change what the photo really shows, it asks a person instead of guessing. Entry for the OpenCV AI Competition 2026.',
      highlights: [
        'Measure, plan, act, re-measure: OpenCV 5 measurements pick each repair, and a verifier keeps a step only if its metric improved and the structure survived',
        'Across 35 seeded test cases, SSIM rose from 0.680 (damaged) to 0.822, where a naive fixed pipeline dropped it to 0.672',
        'Asks instead of guessing: a colour cast that may be real, or damage over 3% of the photo, goes to a person before anything changes',
        'LLM planner on Amazon Bedrock with a heuristic fallback: all 35 runs completed through 105 simulated model failures',
      ],
      stack: ['Python', 'OpenCV 5', 'FastAPI', 'React', 'Amazon Bedrock', 'AWS', 'Docker'],
      status: 'hackathon',
      repo: 'https://github.com/samaunmahmud/revive',
      image: '/projects/revive.webp',
      imageSize: [738, 300],
      accent: 'violet',
      art: 'scan',
    },
    {
      slug: 'aegle',
      name: 'Aegle',
      tagline: 'Clinical AI triage, so the most urgent scan is read first',
      description:
        'A clinical decision-support platform for hospital departments. Eleven AI models read incoming scans, blood smears, ECGs and EEGs across seven specialties, move urgent cases to the top of the worklist and show why. The AI suggests; a clinician signs every finding. A research prototype, not a medical device.',
      highlights: [
        'Ranks by probability × clinical urgency + time waiting, stored with its reason, so clinicians can check and argue with every ranking',
        'Compared every image model with a “shortcut” model that sees only image size and colour, and withdrew the 2 models that failed',
        'Held-out AUC up to 0.997 (malaria cells) and 0.974 on chest X-rays, across about 20,600 test cases plus 32 hours of EEG',
        'Row-level security in PostgreSQL per hospital, a hash-chained audit log of every read, and mutual TLS for DICOM',
      ],
      stack: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'PyTorch', 'React', 'TypeScript', 'PostgreSQL', 'Keycloak', 'DICOM', 'Docker'],
      status: 'in-progress',
      repo: 'https://github.com/samaunmahmud/aegle',
      image: '/projects/aegle.webp',
      imageSize: [1200, 750],
      imageDark: '/projects/aegle-dark.webp',
      accent: 'rose',
      art: 'scan',
      flow: [
        {
          id: 'ingest',
          label: 'Scan arrives',
          tech: 'DICOM · Orthanc',
          detail:
            'From a scanner over mutual-TLS DICOM, or dragged into the browser. Patient identifiers are encrypted the moment they are stored.',
        },
        {
          id: 'model',
          label: 'AI model',
          tech: 'FastAPI · PyTorch',
          detail:
            'Each model registers its modality and body part, so a chest X-ray goes to the pneumonia model. It returns probabilities, a heatmap of where it looked, and the exact model version and weights hash.',
        },
        {
          id: 'worklist',
          label: 'Worklist',
          tech: 'Spring Boot',
          detail:
            'Probability × clinical urgency + time waiting ranks each case. Critical findings raise an alert that stays until someone acknowledges it.',
        },
        {
          id: 'access',
          label: 'Data access',
          tech: 'PostgreSQL RLS · Keycloak',
          detail:
            'The database itself filters by hospital, so a bug in one query can’t leak another tenant’s data. Every read is written to a hash-chained audit log.',
          branchOf: 'worklist',
        },
        {
          id: 'review',
          label: 'Clinician',
          tech: 'React',
          detail:
            'A reading-room viewer with the AI overlay, earlier scans and a “why this priority?” breakdown. A finding only enters the record once a clinician agrees, amends or disagrees, and signs.',
        },
      ],
    },
    {
      slug: 'bellwether',
      name: 'Bellwether',
      tagline: 'Weather-driven animal health risk for UK farms and pets',
      description:
        'Turns the next 14 days of weather into day-by-day risk of heat stress, blowfly strike, lamb chill, liver fluke, nematodirus, ticks and dog heatstroke, for each livestock group in each field, with the reason in plain English. Around the forecast it keeps the records a small farm needs: holding register, medicine book, tasks and the farm’s team.',
      highlights: [
        'Rules, not machine learning: every level traces to a named rule and threshold (“Peak THI 74 around 3pm: heat stress likely”), so farmers and vets can argue with it',
        'A pure, I/O-free TypeScript risk engine at 100% test coverage; a new risk module touches one file',
        'One contract suite runs against both the in-memory fake and real Postgres, so fast unit tests can’t drift from the database',
        '1,134 tests in CI; Redis caches weather and postcodes but is never a dependency, so the app keeps working if it’s down',
      ],
      stack: ['TypeScript', 'React', 'GraphQL', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Vitest', 'Docker'],
      status: 'in-progress',
      repo: 'https://github.com/samaunmahmud/bellwether',
      image: '/projects/bellwether.webp',
      imageSize: [1200, 750],
      imageDark: '/projects/bellwether-dark.webp',
      accent: 'teal',
      art: 'bars',
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
      flow: [
        {
          id: 'script',
          label: 'Script',
          tech: 'Screenplay import',
          detail:
            'A screenplay is cut into scenes at its INT./EXT. headings and the speaking parts are read from the script’s format. No AI is used for this step.',
        },
        {
          id: 'extract',
          label: 'Scene reading',
          tech: 'IBM watsonx.ai',
          detail:
            'Reads each scene for the location it needs: the kind of place, mood, light, time of day, how quiet it must be and how many people will be on set.',
        },
        {
          id: 'search',
          label: 'Venue search',
          tech: 'Parallel',
          detail:
            'Grounded web search for venues in the production’s area. Directory pages are dropped, the venues they name are looked up one by one, and duplicates are merged.',
        },
        {
          id: 'resilience',
          label: 'Resilience',
          tech: 'Resilience4j',
          detail:
            'Every external call goes through retry and a circuit breaker, and calls to watsonx are spaced app-wide to stay under the plan’s rate.',
          branchOf: 'search',
        },
        {
          id: 'score',
          label: 'Fit scoring',
          tech: 'Java',
          detail:
            'The model judges the kind of place and each stated requirement; the score itself is worked out in code, so it is consistent and explainable.',
        },
        {
          id: 'store',
          label: 'Storage',
          tech: 'PostgreSQL · Flyway',
          detail:
            'The API is reactive (WebFlux), so blocking JPA calls run on boundedElastic and never on an event-loop thread. Flyway owns the schema; Hibernate only validates it.',
          branchOf: 'score',
        },
        {
          id: 'logistics',
          label: 'Shoot day',
          tech: 'Open-Meteo · OpenStreetMap',
          detail:
            'Golden and blue hour, the sun’s direction, weather, noise risk, nearest services, a place for the unit base and drive times between venues. If a service is down, that section is marked unavailable.',
        },
      ],
      image: '/projects/cinescout.webp',
      imageSize: [1200, 750],
      accent: 'teal',
      art: 'map',
    },
    {
      slug: 'tick-tracker',
      name: 'Tick Tracker',
      tagline: 'Spring Boot API for UK tick sightings, with honest forecasts',
      description:
        'Syncs tick sightings from the Elanco API into its own PostgreSQL database, cleaning, de-duplicating and logging every run, then serves search, aggregate insights and simple statistical forecasts. It also accepts new sighting reports.',
      highlights: [
        'Retry with backoff after hitting real 429s (8 of 25 rapid requests on the first probe), honouring Retry-After; a failed sync leaves existing data untouched',
        'Corrects what is safe to correct and rejects the rest, record by record, keeping every reject with its raw JSON so nothing disappears silently',
        'Chose explainable statistical forecasts over an ML model for 1,000 records with little seasonal signal, back-tested against two simple baselines',
        'De-duplication by external id and content hash; Testcontainers tests against real Postgres in CI',
      ],
      stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Flyway', 'Testcontainers', 'Docker'],
      status: 'complete',
      repo: 'https://github.com/samaunmahmud/tick-tracker',
      accent: 'sky',
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
      title: 'PayPal AI Hackathon',
      org: 'PayPal',
      period: 'Nov 2026',
      kind: 'hackathon',
      points: ['Built Leash, spending limits for AI agents: plain-English mandates, a Java policy engine, AI risk checks that can only say no, and an MCP server'],
    },
    {
      title: 'OpenCV AI Competition 2026',
      org: 'OpenCV · AWS',
      period: 'Autumn 2026',
      kind: 'hackathon',
      points: ['Building ReVive, an agentic photo-restoration system on OpenCV 5 and Amazon Bedrock'],
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
    { name: 'Backend', items: ['Spring Boot', 'Spring Security', 'REST', 'WebSockets', 'JPA / Hibernate', 'JWT', 'FastAPI', 'GraphQL', 'MCP'] },
    { name: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'HTML & CSS'] },
    { name: 'Data & ML', items: ['PostgreSQL', 'MySQL', 'Flyway', 'Redis', 'PyTorch', 'Deeplearning4j', 'CNNs', 'LLM agents'] },
    { name: 'Tooling', items: ['Docker', 'Git & GitHub', 'CI/CD', 'JUnit / TDD', 'Testcontainers', 'Vitest', 'Render', 'Vercel'] },
  ],

}
