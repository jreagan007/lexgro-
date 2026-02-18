// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.URL || 'https://lexgro.netlify.app',

  redirects: {
    // Service pages consolidation
    '/services/': '/how-we-work/',
    '/services/fractional-cmo/': '/how-we-work/',
    '/services/fractional-law-firm-cmo/': '/how-we-work/',

    // URL changes from Framer migration
    '/privacy-policy': '/privacy/',
    '/privacy-policy/': '/privacy/',

    // Blog consolidation (duplicate clusters → keeper posts)
    '/blog/how-bankruptcy-lawyers-can-generate-more-leads-with-smart-marketing/': '/blog/bankruptcy-lawyer-marketing-guide/',
    '/blog/marketing-for-bankruptcy-lawyers/': '/blog/bankruptcy-lawyer-marketing-guide/',
    '/blog/workers-comp-lawyer-marketing-strategies-that-actually-work/': '/blog/get-more-workers-comp-clients/',
    '/blog/dui-lawyer-marketing-tips/': '/blog/market-your-dui-law-practice/',
    '/blog/mastering-divorce-lawyer-marketing/': '/blog/divorce-lawyer-seo/',
    '/blog/personal-injury-lawyer-marketing-a-winning-strategy/': '/blog/personal-injury-lawyer-marketing/',
    '/blog/personal-injury-lawyer-marketing-tips/': '/blog/personal-injury-lawyer-marketing/',
    '/blog/how-a-fractional-cmo-can-transform/': '/blog/fractional-cmo-for-law-firms/',
    '/blog/how-cmos-help-law-firms-scale-with-digital-channels/': '/blog/fractional-cmo-for-law-firms/',
    '/blog/top-fractional-cmo-benefits/': '/blog/fractional-cmo-for-law-firms/',
    '/blog/law-firm-budgeting-101/': '/blog/law-firm-budgeting-for-growth/',
    '/blog/why-every-law-firm-needs-sales-training/': '/blog/law-firm-sales-training/',
    '/blog/understanding-fractional-cmo/': '/blog/fractional-cmo-for-law-firms/',

    // Vendor pages (redirect to main vendor page until subpages built)
    '/vendors/': '/services/vendor/',
    '/vendors/hire-a-trained-smi': '/services/vendor/',
    '/vendors/marketing-intake-training': '/services/vendor/',
    '/vendors/billboards': '/services/vendor/',
    '/vendors/media-buying': '/services/vendor/',
    '/vendors/hire-a-fractional-cfo': '/services/vendor/',
    '/vendors/hire-a-fractional-coo': '/services/vendor/',
    '/vendors/hire-a-fractional-cmo': '/services/vendor/',
    '/explore-vendors': '/services/vendor/',
    '/explore-vendors/': '/services/vendor/',
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
