export const mentorKeys = {
  all: ['mentors'] as const,
  lists: () => [...mentorKeys.all, 'lists'] as const,
  list: (category?: string, keywords?: string[]) =>
    [...mentorKeys.lists(), category, ...(keywords ?? [])] as const,
  details: () => [...mentorKeys.all, 'detail'] as const,
  detail: (slackId: string) => [...mentorKeys.details(), slackId],
};

export const categoryKeys = {
  all: ['categories'] as const,
  detail: (category: string) => [...categoryKeys.all, category],
};
