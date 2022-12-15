import { axiosInstance } from '@/src/utils';
import { GetMentorsByCategoriesResponse } from '@/services/categories/types';

/**
 * Get Mentors via Category
 * @param {string} category
 * @param {string[]} keywords
 * return {Promise<GetCategoriesResponse>} Mentor List
 */
export const getMentorsByCategories = async (
  category?: string,
  keywords?: string[],
) => {
  const { data } = await axiosInstance.get<GetMentorsByCategoriesResponse>(
    `/categories/${category}`,
    {
      params: {
        keywords,
      },
    },
  );

  return data;
};
