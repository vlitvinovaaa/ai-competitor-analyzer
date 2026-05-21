import { useMutation } from '@tanstack/react-query';
import { analyzeCompetitors } from '../services/analyze';

export const useAnalyzeCompetitors = () => {
  return useMutation({
    mutationFn: analyzeCompetitors,
  });
};