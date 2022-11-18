import { axiosInstance } from '@/src/utils';
import { GetMentorDetailResponse } from '@/services/mentors/types';

/**
 * Get mentors details
 * @param {string} slackId - Slack ID of the mentors
 * @return {Promise<GetMentorDetailResponse>} - Promise that resolves to a mentors object
 * @example
 * getMentorDetails('m-engeng').then((mentors) => {
 *  console.log(mentors);
 *  //{
 *  //  "id": "e624cd78-02a0-41dd-808f-5ec01a31f0dc",
 *  //  "intraId": "m-engeng",
 *  //  "slackId": "닉네임레디스",
 *  //  "name": "레디스테스트테스트2",
 *  //  "email": "autoba9687@gmail.com",
 *  //  "company": "asdf",
 *  //  "duty": "duty",
 *  //  "profileImage": "https://ca.slack-edge.com/T039P7U66-U03DU1UN0P3-gc9a7b67d9c4-512",
 *  //  "availableTime": "[[{\"startHour\":0,\"startMinute\":0,\"endHour\":8,\"endMinute\":0},{\"startHour\":12,\"startMinute\":0,\"endHour\":23,\"endMinute\":0}],[{\"startHour\":11,\"startMinute\":0,\"endHour\":13,\"endMinute\":0}],[],[],[],[],[]]",
 *  //  "introduction": "이렇게 띄어쓰기가\n됩\n니\n다\n\n테스트2!\n테스트!\n\n\n\n\n그런데 이렇게 길게도 가능!",
 *  //  "tags": [
 *  //    "ㄹㄷㄹㄷㅈ"
 *  //  ],
 *  //  "isActive": true,
 *  //  "markdownContent": "# 정경호 멘토\n\n전문분야: AWS, Typescript, 백엔드\n\n## 정경호\n\nSlack : engeng\n\n자기소개\n\n- 대기업을 다니다 스타트업에 매료되어 10년 정도 스타트업 업계에 있습니다. 변화가 많고 빠른 업계라서 이벤트가 많아 아직도 재밌게 일을 하고 있습니다.\n- 창업 후 망해본 경험 다수 보유: 안전하게 시작하고, 안전하게? 망하는 방법 이야기 해줄 수 있습니다.\n- 문제를 찾고 IT 기술로 검증할 수 있도록 기술과 관련된 초기 단계부터 서비스 운영까지 가이드 가능합니다.\n\n주요분야\n\n- Typescript, Javascript Backend 개발\n- Spring Boot, Kotlin\n- Android Native\n- AWS, GCP\n- 서비스 개발, 운영, 확장에 필요한 모든 Backend, Android, Frontend 에 대한 기술 일체\n\n대외활동\n\n- 해커톤 커뮤니티 위드캠프(With Camp) 설립 및 운영 (2016~2020)\n- 드로이드 나이츠, Google Developer Group 발표 활동\n- 정주영창업대회 수상\n\n주요경력\n\n- 2011~2012: 삼성전자 프린터 사업부 영상처리 랩\n- 2012~: 3번 창업 및 스타트업 근무\n- 2019~2021: 스타트업 남의집 프로젝트 외주 백엔드 개발\n    - v0.1~v4.0 Spring Boot + Kotlin\n    - Test Coverage 90%\n- 2020~2021: AI 스타트업 아틀라스랩스 백엔드 개발\n- 2021~2022: NFT 가치평가 스타트업 NFTBank 서비스팀 리더\n\nCadet에게\n\n- 실패를 많이 해본 개발자, 창업자 입니다. 아직은 성공한 경험이 없지만, 제 주위엔 많아요. 하지만 그 성공한 사람들도 실패를 많이 해봤죠. 저의 성공은 “아직\" 오지 않았다라고 생각합니다.\n- 개발자가 스타트업 업계에서 창업을 하고 망하고 개발자로서, 리더로서 일하며 어떻게 성장하는지 말씀드릴 수 있을것 같아요.\n\n\n\n![ex_screenshot](./Users/joohyunkang/Downloads/ZklKfna5T3.jpeg)\n",
 *  //  "createdAt": "2022-09-18T05:29:48.644Z",
 *  //  "updatedAt": "2022-11-07T09:59:00.384Z"
 *  //}
 *  }
 */
export const getMentorDetails = async (slackId: string) => {
  const { data } = await axiosInstance.get<GetMentorDetailResponse>(
    `/mentors/${slackId}`,
  );

  return data;
};
