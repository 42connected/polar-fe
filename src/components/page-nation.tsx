import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { axiosInstance } from '../context/axios-interface';
import { MentoringLogProps } from '../interface/mentor-detail/mentoringLogProps';
import theme from '../styles/theme';

function PageNationComponent(intraId: any) {
  const [take, setTake] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [mentoringLog, setMentoringLog] = useState<MentoringLogProps[]>([]);

  const getParams = useParams();
  useEffect(() => {
    const params = {
      take: take,
      page: page,
    };
    const intraId = getParams.intraId;
    axiosInstance
      .get(`/mentors/simplelogs/${intraId}`, { params })
      .then(response => {
        console.log(response.data);
        setMentoringLog(response.data?.logs || []);
        setMaxPage(Math.ceil(response.data.total / take));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleClickPagePrev = () => {
    const params = {
      take: take,
      page: page - 1,
    };
    axiosInstance
      .get(`/mentors/simplelog/${intraId}`, { params })
      .then(response => {
        setMentoringLog(response.data.logs);
        setPage(page - 1);
        setMaxPage(Math.ceil(response.data.total / take));
      });
  };
  const handleClickPageNext = () => {
    const params = {
      take: take,
      page: page + 1,
    };
    axiosInstance
      .get(`/mentors/simplelog/${intraId}`, { params })
      .then(response => {
        setMentoringLog(response.data.logs);
        setPage(page + 1);
        setMaxPage(Math.ceil(response.data.total / take));
      });
  };

  const PageNationLog = mentoringLog?.map((log, index) => {
    return (
      <MenuBoxLog key={index}>
        <div>{log.topic}</div>
        <div className="status">{log.status}</div>
        <div>{`${log.meetingAt[0].substring(2, 4)}.${log.meetingAt[0].substring(
          5,
          7,
        )}.${log.meetingAt[0].substring(8, 10)}`}</div>
      </MenuBoxLog>
    );
  });

  return (
    <>
      {PageNationLog}
      <PageNation>
        {page > 1 && page < maxPage ? (
          <div
            onClick={() => {
              handleClickPagePrev();
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} className={'icon'} />
            prev
          </div>
        ) : (
          <div></div>
        )}
        {page < maxPage ? (
          <div
            onClick={() => {
              handleClickPageNext();
            }}
          >
            next <FontAwesomeIcon icon={faAngleRight} className={'icon'} />
          </div>
        ) : (
          <div></div>
        )}
      </PageNation>
    </>
  );
}
const PageNation = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${theme.colors.grayFour};
  div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .icon {
    margin: 0 5px;
  }
  margin-top: 1rem;
`;

const MenuBoxLog = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.grayFive};
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .status {
    color: ${props => props.theme.colors.polarSimpleMain};
  }
`;

export default PageNationComponent;
