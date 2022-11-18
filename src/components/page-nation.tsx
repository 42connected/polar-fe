import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { axiosInstance } from '@/context/axios-interface';
import { MentoringLogProps } from '@/interfaces/mentor-detail/mentoringLogProps';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '@/states/error/ErrorStore';
import theme from '@/styles/theme';

function PageNationComponent() {
  const [take, setTake] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [mentoringLog, setMentoringLog] = useState<MentoringLogProps[]>([]);

  const getParams = useParams();
  const intraId = getParams.intraId;
  useEffect(() => {
    const params = {
      take: take,
      page: page,
    };
    axiosInstance
      .get(`/mentors/simplelogs/${intraId}`, { params })
      .then(response => {
        setMentoringLog(response.data?.logs || []);
        setMaxPage(Math.ceil(response.data.total / take));
      })
      .catch(err => {
        ErrorStore.on(err, ERROR_DEFAULT_VALUE.TITLE);
      });
  }, []);

  const handleClickPagePrev = () => {
    const params = {
      take: take,
      page: page - 1,
    };
    axiosInstance
      .get(`/mentors/simplelogs/${intraId}`, { params })
      .then(response => {
        setMentoringLog(response.data.logs);
        setPage(page - 1);
        setMaxPage(Math.ceil(response.data.total / take));
      })
      .catch(err => {
        ErrorStore.on(err, ERROR_DEFAULT_VALUE.TITLE);
      });
  };
  const handleClickPageNext = () => {
    const params = {
      take: take,
      page: page + 1,
    };
    axiosInstance
      .get(`/mentors/simplelogs/${intraId}`, { params })
      .then(response => {
        setMentoringLog(response.data?.logs || []);
        setPage(page + 1);
        setMaxPage(Math.ceil(response.data.total / take));
      })
      .catch(err => {
        ErrorStore.on(err, ERROR_DEFAULT_VALUE.TITLE);
      });
  };

  const PageNationLog = mentoringLog?.map((log, index) => {
    return (
      <MenuBoxLog key={index}>
        <div>{log.topic}</div>
        <div className="status">{log.status}</div>
        <div>{`${log?.meetingAt?.[0].substring(
          2,
          4,
        )}.${log?.meetingAt?.[0].substring(
          5,
          7,
        )}.${log?.meetingAt?.[0].substring(8, 10)}`}</div>
      </MenuBoxLog>
    );
  });

  return (
    <>
      {PageNationLog}
      <PageNation>
        {page > 1 ? (
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
  /* word-break: keep-all; */
  div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0;
  }
  .status {
    color: ${props => props.theme.colors.polarSimpleMain};
  }
`;

export default PageNationComponent;
