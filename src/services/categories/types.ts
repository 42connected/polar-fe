import { Mentor } from '@/src/interfaces';

export interface GetMentorsByCategoriesResponse {
  category: { id: string; name: string };
  mentorCount: number;
  mentors: Pick<
    Mentor,
    'id' | 'name' | 'intraId' | 'tags' | 'profileImage' | 'introduction'
  >[];
  keywords: string[];
}
