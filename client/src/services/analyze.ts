export const analyzeCompetitors = async (competitors) => {
    const response = await fetch('http://localhost:3001/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        competitors,
      }),
    });
  
    return response.json();
  };