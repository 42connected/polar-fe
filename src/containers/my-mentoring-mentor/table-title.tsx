import styled from '@emotion/styled';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { InfomationModal } from '../../components/modal/infomation-modal/infomation-modal';
import defaultTheme from '../../styles/theme';

const TableColumnLine = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  height: 50px;
  font-weight: bold;
  ${defaultTheme.fontSize.sizeExtraSmall};
  ${defaultTheme.font.nanumGothic};
  @media screen and (max-width: 800px) {
    ${defaultTheme.fontSize.sizeSmall};
  }
  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
`;

const TableColumnDate = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const TableColumnUser = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const TableColumnTopic = styled.div`
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
`;

const TableColumnTime = styled.div`
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
`;

const TableColumnState = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const TableColumnReport = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  color: rgba(0, 0, 0, 0.2);
`;

const timeInfoText =
  '시작시간과 멘토링 진행 시간이 나타납니다.\n\n⚠️ 현재 방침에 따라, 멘토링 금액은 시간 단위로 (분은 버림 연산) 산정됩니다.';
const statusInfoText =
  '대기중: 멘토님께 온 카뎃의 멘토링 신청을 확인하고, 수락 및 거절할 수 있습니다.\n\n⚠️ 48시간 이내에 수락하지 않으면 자동취소가 이루어집니다.\n\n⚠️ 선택 가능한 시간이 존재하지 않으면 자동취소가 이루어집니다.\n\n확정: 멘토링이 확정된 상태이며, 부득이하게 멘토링을 진행하지 못할 시 취소하거나\n         멘토링이 끝난 뒤 완료할 수 있습니다\n\n완료: 멘토링 시작시간이 지난 후 주제를 클릭하고 변경 가능합니다.';
const reportInfoText =
  '작성불가: 멘토링 상태가 완료가 아닌 상태입니다. 완료는 멘토링 시작 시간 후 주제를 클릭해서 변경 가능합니다\n\n작성필요: 멘토링이 완료되어 보고서를 작성, 임시저장 및 제출할 수 있습니다.\n\n작성중: 임시저장된 보고서를 확인 및 수정하여 제출할 수 있습니다.\n\n작성완료: 보고서를 제출하게 되면, 더 이상 수정할 수 없는 작성완료 상태가 됩니다.';

export function TableTitle() {
  const [modal, setModal] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  return (
    <TableColumnLine>
      {modal && (
        <InfomationModal
          TitleText={'🌟 42폴라 안내'}
          Text={text}
          ButtonText={'닫기'}
          ButtonBg={defaultTheme.colors.polarSimpleMain}
          ButtonFunc={() => {
            setText('');
            setModal(false);
          }}
        />
      )}
      <TableColumnDate>신청 일시</TableColumnDate>
      <TableColumnUser>신청 카뎃</TableColumnUser>
      <TableColumnTopic>주제</TableColumnTopic>
      <TableColumnTime>
        멘토링 시간
        <IconWrapper
          onClick={() => {
            setText(timeInfoText);
            setModal(true);
          }}
        >
          <FontAwesomeIcon icon={faCircleQuestion} className="icon" />
        </IconWrapper>
      </TableColumnTime>
      <TableColumnState>
        상태
        <IconWrapper
          onClick={() => {
            setText(statusInfoText);
            setModal(true);
          }}
        >
          <FontAwesomeIcon icon={faCircleQuestion} className="icon" />
        </IconWrapper>
      </TableColumnState>
      <TableColumnReport>
        보고서
        <IconWrapper
          onClick={() => {
            setText(reportInfoText);
            setModal(true);
          }}
        >
          <FontAwesomeIcon icon={faCircleQuestion} className="icon" />
        </IconWrapper>
      </TableColumnReport>
    </TableColumnLine>
  );
}
