import { useQuery } from '@tanstack/react-query';
import { getMentorDetails } from '@/src/services';
import { mentorKeys } from '@/utils/queryKeys';

// TODO need to change argument using reactQuery Context

export const useMentorById = (slackId: string) => {
  return useQuery(mentorKeys.detail(slackId), () => getMentorDetails(slackId), {
    select: response => {
      return {
        ...response,
        createdAt: new Date(response.createdAt),
        updatedAt: new Date(response.updatedAt),
      };
    },
    enabled: !!slackId,
  });
};
