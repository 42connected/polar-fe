import MentorDetailProps from '@/interfaces/mentor-detail/mentor-detail.interface';

export interface GetMentorsByCategoriesResponse {
  category: { id: string; name: string };
  mentorCount: number;
  mentors: Pick<
    MentorDetailProps,
    'id' | 'name' | 'intraId' | 'tags' | 'profileImage' | 'introduction'
  >[];
  keywords: string[];
}
