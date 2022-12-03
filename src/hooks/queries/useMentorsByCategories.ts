import { useQuery } from '@tanstack/react-query';
import { mentorKeys } from '@/src/utils';
import { getMentorsByCategories } from '@/src/services';

export const useMentorsByCategories = (
  category: string,
  keywords?: string[],
) => {
  return useQuery(mentorKeys.list(category, keywords), () =>
    getMentorsByCategories(category, keywords),
  );
};
