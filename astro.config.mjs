// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.URL || 'https://lexgro.netlify.app',

  redirects: {
    '/services/': '/how-we-work/',
    '/services/fractional-cmo/': '/how-we-work/',
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/api') && !page.includes('/preview')
    })
  ],

  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  },

  vite: {
    ssr: {
      noExternal: ['@chakra-ui/react', '@emotion/react', '@emotion/styled']
    },
    optimizeDeps: {
      include: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion']
    }
  }
});
