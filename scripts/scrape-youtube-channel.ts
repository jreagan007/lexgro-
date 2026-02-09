/**
 * Scrape LEXGRO YouTube channel for all video data
 * Uses Firecrawl to get video titles and IDs
 */
import 'dotenv/config';
import { FirecrawlClient } from '@mendable/firecrawl-js';
import * as fs from 'fs';

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const YOUTUBE_CHANNEL = 'https://www.youtube.com/@LEXGRO/videos';
const OUTPUT_FILE = 'scripts/research/output/youtube-channel-videos.json';

async function scrapeYouTubeChannel() {
  if (!FIRECRAWL_API_KEY) {
    console.error('FIRECRAWL_API_KEY not found in environment');
    process.exit(1);
  }

  const firecrawl = new FirecrawlClient({ apiKey: FIRECRAWL_API_KEY });

  console.log('Scraping YouTube channel:', YOUTUBE_CHANNEL);

  try {
    // Scrape the videos page
    const result = await firecrawl.scrape(YOUTUBE_CHANNEL, {
      formats: ['markdown', 'html'],
    });

    if (result.success) {
      console.log('Scrape successful!');

      // Save raw result
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
      console.log('Raw data saved to:', OUTPUT_FILE);

      // Also save markdown for easy reading
      if (result.markdown) {
        fs.writeFileSync(
          'scripts/research/output/youtube-channel-videos.md',
          result.markdown
        );
        console.log('Markdown saved to: scripts/research/output/youtube-channel-videos.md');
      }

      // Try to extract video IDs from the HTML
      if (result.html) {
        const videoIdPattern = /watch\?v=([a-zA-Z0-9_-]{11})/g;
        const matches = result.html.matchAll(videoIdPattern);
        const videoIds = [...new Set([...matches].map(m => m[1]))];

        console.log('\nFound', videoIds.length, 'unique video IDs:');
        videoIds.forEach(id => console.log(`  - https://youtube.com/watch?v=${id}`));

        // Save video IDs
        fs.writeFileSync(
          'scripts/research/output/youtube-video-ids.json',
          JSON.stringify(videoIds, null, 2)
        );
      }

    } else {
      console.error('Scrape failed:', result);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

scrapeYouTubeChannel();
