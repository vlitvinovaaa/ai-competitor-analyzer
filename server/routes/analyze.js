import express from 'express';
import { scrapeWebsite } from '../services/scraper.js';
import { analyzeCompetitor } from '../services/ai.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { competitors } = req.body;

  const results = [];

  for (const competitor of competitors) {
    const scrapedData = await scrapeWebsite(competitor.website);

    if (!scrapedData) {
      continue;
    }

    const aiAnalysis = await analyzeCompetitor(scrapedData);

    results.push({
      name: competitor.name,
      scrapedData,
      aiAnalysis,
    });
  }

  res.json(results);
});

export default router;