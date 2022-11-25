import styled from 'styled-components';
import { useState } from 'react';
import { MentoringListModalBox } from '@/components/v2/common/modal/ModalBox';
import theme from '@/styles/themeV2';
import StatusButton from '@/components/v2/common/StatusButton';
import DetailModal from '@/components/v2/common/modal/DetailModal';

interface MentoringProps {
  mentee: string;
  status: '확정' | '완료' | '취소' | '대기중';
  report: '작성 완료' | '작성 불가' | '작성 필요' | '작성중' | '수정 기간';
  askDate: string;
  meetDate: string;
  text: string;
}

function MentoringListModal(props: MentoringProps) {
  const { mentee, status, report, askDate, meetDate, text } = props;
  const [extendModalOpen, setExtendModalOpen] = useState(false);
  return (
    <>
      {extendModalOpen && (
        <DetailModal
          status={status}
          XButtonFunc={() => setExtendModalOpen(false)}
          meetDate={meetDate}
          mentee={mentee}
          report={report}
          text={text}
        />
      )}
      <MentoringListModalBox>
        <MentoringListContainer>
          <MentorListTitle>
            <Mentee>
              <MenteeName>{mentee}</MenteeName>
              <MenteeOthers>외 10명</MenteeOthers>
            </Mentee>
            <Status>
              <span style={{ paddingRight: '0.2rem' }}>상태 |</span>
              <div style={{ width: '5rem' }}>
                <StatusButton status={status} />
              </div>
            </Status>
            <Status>
              <span style={{ paddingRight: '0.2rem' }}>보고서 |</span>
              <div style={{ width: '5rem' }}>
                <StatusButton status={report} />
              </div>
            </Status>
          </MentorListTitle>
          <MentoringInfoRow color={theme.colors.polarBlue}>
            요청 | {askDate}
          </MentoringInfoRow>
          <MentoringInfoRow color={theme.colors.darkGray}>
            만남 | {meetDate}
          </MentoringInfoRow>
          <ModalBody>
            <ModalBodyText>{text}</ModalBodyText>
          </ModalBody>
          <ModalExtendRow>
            <ModalExtendButton
              onClick={() => {
                setExtendModalOpen(true);
              }}
            >{`전체보기 >`}</ModalExtendButton>
          </ModalExtendRow>
        </MentoringListContainer>
      </MentoringListModalBox>
    </>
  );
}

function MentorPage() {
  return (
    <div>
      <Container>
        <MentorTitle>멘토링</MentorTitle>
        <MentoringList>
          <MentoringListModal
            mentee="jokang"
            status="완료"
            report="작성 필요"
            askDate="2022.07.14(목)"
            meetDate="2022.08.01 (월) 15:00 (1시간 00분)"
            text="lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque"
          />
          <MentoringListModal
            mentee="jokang"
            status="완료"
            report="작성 필요"
            askDate="2022.07.14(목)"
            meetDate="2022.08.01 (월) 15:00 (1시간 00분)"
            text="lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque"
          />
          <MentoringListModal
            mentee="jokang"
            status="완료"
            report="작성 필요"
            askDate="2022.07.14(목)"
            meetDate="2022.08.01 (월) 15:00 (1시간 00분)"
            text="lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque"
          />
          <MentoringListModal
            mentee="jokang"
            status="완료"
            report="작성 필요"
            askDate="2022.07.14(목)"
            meetDate="2022.08.01 (월) 15:00 (1시간 00분)"
            text="lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque"
          />
          <MentoringListModal
            mentee="longnickname"
            status="확정"
            report="작성 불가"
            askDate="2022.07.14(목)"
            meetDate="2022.08.01 (월) 15:00 (1시간 00분)"
            text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis, repudiandae accusamus natus eligendi modi nulla? Provident laboriosam inventore rerum. Debitis doloribus aspernatur, voluptates error aliquam enim unde. Aliquid ipsam suscipit placeat ea necessitatibus, nihil, unde repellendus adipisci neque omnis ratione dolorum aspernatur eligendi laudantium veniam aperiam ipsa porro odit corporis maiores sunt deleniti officia facere! Soluta ratione, quia reiciendis autem nihil ipsam qui possimus fuga repudiandae blanditiis, beatae inventore deserunt hic porro quae voluptas! Debitis, ut reiciendis ad voluptate est alias, qui deleniti sequi blanditiis consequatur maiores ex laudantium dolores, culpa iste voluptatem labore necessitatibus! Aperiam quasi facere adipisci fugiat."
          />
        </MentoringList>
      </Container>
    </div>
  );
}

export default MentorPage;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MentoringList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const MentorTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 13rem;
  font-family: ${theme.font.sebangGothic};
  font-size: ${theme.mobileFontSize.sizeLarge};
  background-color: ${theme.colors.backgroundGray};
`;

const MentoringListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const MentorListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
`;

const Mentee = styled.div`
  display: flex;
  width: 9rem;
`;

const MenteeName = styled.div`
  width: auto;
  max-width: 5.5rem;
  text-align: left;
  line-height: 2rem;
  ${theme.typography.middleSebang};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 0.5rem;
`;

const MenteeOthers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  text-align: left;
  ${theme.typography.smallSebang};
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: auto;
  height: auto;
  ${theme.typography.smallSebang}
  color: ${theme.colors.polarBlue};
  text-align: center;
`;

const MentoringInfoRow = styled.div`
  display: flex;
  ${theme.typography.smallSebang};
  color: ${props => props.color};
  padding: 0.3rem 0;
`;

const ModalBody = styled.div`
  text-align: left;
  width: 100%;
  height: auto;
  background-color: ${theme.colors.inputBoxColor};
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 0.3rem;
  overflow: hidden;
`;

const ModalBodyText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3rem;
  height: 3.9rem;
`;

const ModalExtendRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: auto;
`;

const ModalExtendButton = styled.div`
  font-family: ${theme.font.sebangGothic};
  font-size: ${theme.mobileFontSize.sizeSmall};
  cursor: pointer;
`;
