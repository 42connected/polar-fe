import { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import theme from '../../styles/theme';
import { lighten } from '@mui/material';
import styled from 'styled-components';
import { axiosInstance } from '../../context/axios-interface';
import LoadingStore from '../../states/loading/LoadingStore';
import Button from '../button';
import AuthStore from '../../states/auth/AuthStore';
import { useParams } from 'react-router-dom';
import ButtonBoxComponent from './button-box';
import { TwoButtonModal } from '../modal/two-button-modal.tsx/two-button-modal';

const styles = {
  control: (base: any) => ({
    ...base,
    fontFamily: 'NanumGothic',
    fontWeight: 500,
    fontSize: '1.6rem',
  }),
  menu: (base: any) => ({
    ...base,
    fontFamily: 'NanumGothic',
    fontWeight: 500,
    fontSize: '1.4rem',
  }),
};

const Div = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

interface CategoryAndKeywords {
  name: string;
  keywords: string[];
}

interface GroupOption {
  label: string;
  options: Option[];
}

interface Option {
  value: string;
  label: string;
}

interface Props {
  isActivatedEdit: boolean;
  isActivateIntroductionEdit: boolean;
  setIsActivateDeleteModal: (b: boolean) => void;
  isActivateDeleteModal: boolean;
  setIsActivateIntroductionEdit: (b: boolean) => void;
  handleSubmitIntroductionTags: () => void;
  handleSubmitIntroductionTagsNo: () => void;
}

function SelectKeywords(props: Props) {
  const [categoryKeywords, setCategoryKeywords] = useState<
    CategoryAndKeywords[]
  >([]);
  const [mentorKeywords, setMentorKeywords] = useState<Option[]>([]);
  const mentorId = useParams().intraId;

  useEffect(() => {
    axiosInstance.get('categories/category/keywords').then(response => {
      setCategoryKeywords(response.data);
    });
    axiosInstance.get(`mentors/${mentorId}/keywords`).then(response => {
      const mentorKeywords: string[] = response.data;
      setMentorKeywords(
        mentorKeywords.map(data => {
          return { value: data, label: data };
        }),
      );
    });
  }, []);

  const handleSubmitNo = () => {
    axiosInstance.get('categories/category/keywords').then(response => {
      setCategoryKeywords(response.data);
    });
    axiosInstance.get(`mentors/${mentorId}/keywords`).then(response => {
      const mentorKeywords: string[] = response.data;
      setMentorKeywords(
        mentorKeywords.map(data => {
          return { value: data, label: data };
        }),
      );
    });
  };

  const groupOptions = useMemo(() => {
    LoadingStore.on();
    const groups: GroupOption[] = categoryKeywords.map(data => {
      const group: GroupOption = { label: data.name, options: [] };
      data.keywords.forEach(keyword =>
        group.options.push({ value: keyword, label: keyword }),
      );
      return group;
    });
    LoadingStore.off();
    return groups;
  }, [categoryKeywords]);

  const config = {
    headers: {
      Authorization: `bearer ${AuthStore.getAccessToken()}`,
    },
  };

  const ButtonBoxComponent = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  `;

  const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.2rem;
  `;

  function patchMentorKeywords(mentorKeywords: Option[]) {
    const newMentorKeywords: { keywords: string[] } = { keywords: [] };
    newMentorKeywords.keywords = mentorKeywords.map(data => {
      return data.value;
    });
    axiosInstance.patch(
      `mentors/${mentorId}/keywords`,
      newMentorKeywords,
      config,
    );
  }

  return (
    <Div>
      <Select
        isMulti
        isDisabled={!props.isActivatedEdit}
        value={mentorKeywords}
        onChange={keywords => {
          setMentorKeywords(
            keywords.map(data => {
              return { value: data.value, label: data.label };
            }),
          );
        }}
        closeMenuOnSelect={false}
        options={groupOptions}
        theme={defaultTheme => ({
          ...defaultTheme,
          borderRadius: 10,
          colors: {
            ...defaultTheme.colors,
            primary: lighten(theme.colors.polarBrightMain, 0.3),
            primary50: lighten(theme.colors.polarBrightMain, 0.5),
            primary25: lighten(theme.colors.polarBrightMain, 0.8),
            neutral10: lighten(theme.colors.polarBrightMain, 0.8),
          },
        })}
        styles={styles}
      />
      {props.isActivateIntroductionEdit && (
        <ButtonContainer>
          <Button
            text="수정완료"
            borderRadius="20px"
            onClick={() => {
              props.setIsActivateDeleteModal(true);
            }}
          />
        </ButtonContainer>
      )}
      {props.isActivateDeleteModal && (
        <TwoButtonModal
          Text="수정하시겠습니까?"
          TitleText="수정"
          XButtonFunc={() => {
            props.setIsActivateDeleteModal(false);
          }}
          Button1Func={() => {
            try {
              props.setIsActivateDeleteModal(false);
              props.setIsActivateIntroductionEdit(false);
            } catch (e) {
              // ErrorStore
            }
            props.handleSubmitIntroductionTags();
            patchMentorKeywords(mentorKeywords);
          }}
          Button2Func={() => {
            props.setIsActivateDeleteModal(false);
            props.setIsActivateIntroductionEdit(false);
            props.handleSubmitIntroductionTagsNo();
            handleSubmitNo();
          }}
          Button1Text="네"
          Button2Text="아니요"
          Button2bg={theme.colors.grayThree}
        />
      )}
    </Div>
  );
}

export default SelectKeywords;
