import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeCompetitor = async (scrapedData) => {
      console.log('AI ANALYSIS STARTED');

  console.log(scrapedData);
  try {
    const prompt = `
You are a marketing analyst for a real estate agency.

Analyze this competitor based on website data.

TITLE:
${scrapedData.title}

META DESCRIPTION:
${scrapedData.metaDescription}

HEADINGS:
${scrapedData.headings.join(', ')}

Return JSON with:
- communicationType
- positioning
- keyMessages
- insights

Keep answers concise and professional.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: {
        type: 'json_object',
      },
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error(error);

    return null;
  }
};