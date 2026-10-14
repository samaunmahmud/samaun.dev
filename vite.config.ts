import { execSync } from 'node:child_process'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { profile } from './src/data/profile.ts'
import { llmsTxt, personJsonLd } from './src/data/seo.ts'

/** Short commit hash shown in the footer. Vercel exposes it as an env var; locally we ask git. */
function commitHash() {
  const fromEnv = process.env.VERCEL_GIT_COMMIT_SHA
  if (fromEnv) return fromEnv.slice(0, 7)
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return 'dev'
  }
}

/** Generates the JSON-LD in index.html and /llms.txt from profile.ts, so neither can drift from the page. */
function siteMeta(): Plugin {
  return {
    name: 'site-meta',
    transformIndexHtml: {
      order: 'pre',
      handler: (html, ctx) =>
        ctx.path === '/index.html'
          ? html.replace('<!-- person-json-ld -->', `<script type="application/ld+json">${JSON.stringify(personJsonLd(profile)).replace(/</g, '\\u003c')}</script>`)
          : html,
    },
    configureServer(server) {
      server.middlewares.use('/llms.txt', (_req, res) => {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(llmsTxt(profile))
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llmsTxt(profile) })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
  // Pages: the portfolio, the printable résumé (served at /resume via cleanUrls in vercel.json) and the 404 Vercel serves for unknown URLs
  build: {
    rollupOptions: {
      input: { main: 'index.html', resume: 'resume.html', notFound: '404.html' },
    },
  },
  define: {
    __COMMIT__: JSON.stringify(commitHash()),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
})
