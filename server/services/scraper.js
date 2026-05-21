import axios from 'axios';
import * as cheerio from 'cheerio';

export const scrapeWebsite = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const $ = cheerio.load(response.data);

    const title = $('title').text();

    const metaDescription = $('meta[name="description"]').attr('content');

    const headings = $('h1')
      .map((_, el) => $(el).text())
      .get();

    return {
      title,
      metaDescription,
      headings,
    };
  } catch (error) {
    console.error(error);

    return null;
  }
};