import styled from '@emotion/styled';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../../context/axios-interface';
import { Mentor } from '../../../states/my-mentoring-mentor/MentorStore';
import defaultTheme from '../../../styles/theme';
import { ModalType } from '../mentor-info-modal';
import { Info } from './info/info';
import {
  ApplyDetailModalProps,
  IRows,
  MentorsData,
} from './mentor-details-modal-inteface';
import { ModalFooter } from './modal-footer';
import { Time } from './time/time';

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const PageTitle = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 0.5px solid;
  width: 90%;
  padding-bottom: 2.5rem;
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeMedium};
`;

const StatusBox = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontFrame.titleLarge};
  ${defaultTheme.fontSize.sizeExtraSmall};
  color: ${defaultTheme.fontColor.whiteColor};
  display: flex;
  justify-content: center;
  width: 50px;
  padding: 0px 5px;
  margin-left: 20px;
  height: min-content;
  border-radius: 10px;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const ModalBody = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 20px 0px;
`;

const XButton = styled.div`
  display: flex;
  width: 90%;
  justify-content: right;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
`;

function getPageTitle(modalType: ModalType): string {
  if (modalType === ModalType.AVAILABLE_TIME) {
    return '가능시간 수정';
  } else {
    return '멘토 정보 수정';
  }
}

export function ApplyDetailModal(props: ApplyDetailModalProps) {
  const [name, setName] = useState<string>('');
  const [slackId, setSlackId] = useState<string>('');
  const [alreadyRegistered, setAlreadyRegistered] = useState<boolean>(false);
  const [isCodeSucess, setIsCodeSucesss] = useState(false);
  const [checked, setChecked] = useState<boolean>(true);
  const [rows, setRows] = useState<IRows[]>([
    {
      id: 0,
      date: [0, 0, 0, 0, 0],
    },
  ]);
  const [mentorsOriginData, setMentorsOriginData] = useState<MentorsData>({
    availableTime: [],
    introduction: '',
    isActive: true,
    tags: [],
    markdownContent: '',
    slackId: '',
    email: '',
    name: '',
  });

  useEffect(() => {
    axiosWithNoData(AXIOS_METHOD_WITH_NO_DATA.GET, `mentors/${props.intraId}`)
      .then(res => {
        const data: MentorsData = {
          availableTime: JSON.parse(res.data.availableTime),
          introduction: res.data.introduction,
          isActive: res.data.isActive,
          tags: res.data.tags,
          markdownContent: res.data.markdownContent,
          slackId: res.data.slackId,
          email: res.data.email,
          name: res.data.name,
        };
        setMentorsOriginData(data);
      })
      .catch(err => {
        alert('멘토의 정보를 받아오지 못했습니다');
        props.setApplyModal(false);
      });
  }, []);

  const onRowChange = (id: number, index: number, value: number) => {
    const firstIndex = 0;
    const row = rows.filter(rows => rows.id === id);
    row[firstIndex].date[index] = value;
  };

  return (
    <Box>
      <XButton>
        <FontAwesomeIcon
          icon={faX}
          size="2x"
          style={{ opacity: 0.2 }}
          onClick={() => props.setApplyModal(false)}
        />
      </XButton>
      <ModalHeader>
        <PageTitle>{getPageTitle(props.modalType)}</PageTitle>
      </ModalHeader>
      <ModalBody>
        {props.modalType === ModalType.MENTOR_INFO ? (
          <Info
            setName={setName}
            setSlackId={setSlackId}
            setAlreadyRegistered={setAlreadyRegistered}
            setIsCodeSucesss={setIsCodeSucesss}
            setMentorsData={setMentorsOriginData}
            alreadyRegistered={alreadyRegistered}
            isCodeSucess={isCodeSucess}
            MentorsData={mentorsOriginData}
          />
        ) : (
          <Time
            checked={checked}
            rows={rows}
            setChecked={setChecked}
            setRows={setRows}
            MentorsData={mentorsOriginData}
            setMentorsData={setMentorsOriginData}
            onRowChange={onRowChange}
          />
        )}
      </ModalBody>
      <ModalFooter
        modalType={props.modalType}
        intraId={props.intraId}
        name={name}
        slackId={slackId}
        alreadyRegistered={alreadyRegistered}
        isCodeSucess={isCodeSucess}
        checked={checked}
        rows={rows}
        setApplyModal={props.setApplyModal}
      />
    </Box>
  );
}
