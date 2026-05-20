export type Competitor = {
  name: string;
  website?: string;
  facebookPage?: string;
};

export function getCompetitorName(competitor: Competitor | string): string {
  return typeof competitor === 'string' ? competitor : competitor.name;
}
