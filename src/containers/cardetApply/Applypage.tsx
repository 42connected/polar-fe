import styled from 'styled-components';
import theme from '../../styles/theme';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../context/axios-interface';
import Modal from '../../components/modal';
import React from 'react';

const Wrapper = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .modal button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
  .modal > section {
    width: 90%;
    max-width: 960px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
  }

  .modal > section > header {
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #f1f1f1;
    font-weight: 700;
    ${theme.fontFrame.titleLarge};
  }
  .modal > section > header button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
  }
  .modal > section > main {
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
  }
  .modal > section > footer {
    padding: 12px 16px;
    text-align: right;
  }
  .modal > section > footer button {
    padding: 6px 12px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 13px;
  }
  .modal.openModal {
    display: flex;
    align-items: center;
    /* 모달 애니메이션 */
    animation: modal-bg-show 0.3s;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ApplypageStyle = styled.body`
  width: 100vw;
  height: 60vw;
  display: flex;
  flex-direction: row;
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
  background-color: ${theme.colors.polarBackground};
`;
const Chooseplan = styled.body`
  flex: 1;
  display: flex;
  text-align: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;
const Content = styled.body`
  flex: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const PlanButton1 = styled.button`
  padding-left: 12rem;
  box-shadow: ${theme.shadow.buttonShadow};
  text-align: center;
  ${theme.font.sebangGothic};
  ${theme.fontSize.sizeExtraLarge};
  font-size: 3rem;
  color: ${theme.fontColor.whiteColor};
  margin-left: 17rem;
  background-color: ${theme.colors.polarSimpleMain};
  margin-top: 4rem;
  border-radius: 20px;
  width: 36rem;
  height: 12rem;
  cursor: pointer;
  line-height: 12.5rem;
  border: none;
`;
const PlanButton2 = styled.button`
  padding-left: 12rem;
  box-shadow: ${theme.shadow.buttonShadow};
  ${theme.font.sebangGothic};
  ${theme.fontSize.sizeExtraLarge};
  font-size: 3rem;
  text-align: center;
  line-height: 12.5rem;
  color: ${theme.fontColor.whiteColor};
  margin-left: 17rem;
  background-color: ${theme.colors.polarBrightMain};
  margin-top: 4rem;
  border-radius: 20px;
  width: 36rem;
  height: 12rem;
  cursor: pointer;
  border: none;
`;
const Line = styled.line`
  margin-top: 20rem;
  margin-left: 15rem;
  border-top: 0.3rem solid #000000;
  width: 70rem;
`;

const Line2 = styled.line`
  margin-top: 2rem;
  margin-left: 15rem;
  border-top: 0.1rem solid #000000;
  width: 70rem;
`;

const MainText = styled.text`
  margin-top: 2rem;
  margin-left: -27rem;
  text-align: center;
  ${theme.font.sebangGothic};
  ${theme.fontSize.sizeLarge};
`;

const MainText2 = styled.text`
  margin-top: 2rem;
  text-align: center;
  margin-left: -50rem;
  ${theme.font.sebangGothic};
  ${theme.fontSize.sizeLarge};
`;

const MiddleText = styled.text`
  margin-top: 4rem;
  margin-left: 16rem;
  ${theme.font.sebangGothic};
  color: ${theme.colors.grayTwo};
  ${theme.fontSize.sizeExtraSmall};
`;

const TextBox1 = styled.textarea`
  box-shadow: ${theme.shadow.buttonShadow};
  width: 50rem;
  height: 10rem;
  margin-left: 23rem;
  margin-top: 7rem;
  border-radius: 20px;
  ${theme.font.sebangGothic};
  ${theme.fontSize.sizeExtraSmall};
`;

const TextBox2 = styled.textarea`
  box-shadow: ${theme.shadow.buttonShadow};
  width: 50rem;
  height: 32rem;
  margin-left: 23rem;
  margin-top: 3rem;
  border-radius: 20px;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.sebangGothic};
`;

const ModalView = styled.div.attrs(props => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  color: #4000c7;
`;

const Applypage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="applypage">
      <ApplypageStyle>
        <Chooseplan>
          <Line> </Line>
          <MainText>일정 선택하기</MainText>
          <Line2> </Line2>
          <MiddleText>*최소 1개의 신청 시간을 선택해 주세요</MiddleText>
          <Wrapper>
            <PlanButton1 onClick={openModal}> 가능시간1</PlanButton1>
            <Modal
              open={modalOpen}
              close={closeModal}
              header="멘토링 일정 선택"
            ></Modal>
            <PlanButton2 onClick={openModal}> 가능시간2</PlanButton2>
            <Modal
              open={modalOpen}
              close={closeModal}
              header="멘토링 일정 선택"
            ></Modal>
            <PlanButton2 onClick={openModal}> 가능시간3</PlanButton2>
            <Modal
              open={modalOpen}
              close={closeModal}
              header="멘토링 일정 선택"
            ></Modal>
          </Wrapper>
        </Chooseplan>
        <Content>
          <Line> </Line>
          <MainText2>신청 정보</MainText2>
          <Line2> </Line2>
          <TextBox1> 멘토링 주제 |</TextBox1>
          <TextBox2> 궁금한 점 |</TextBox2>
        </Content>
      </ApplypageStyle>
    </div>
  );
};

export default Applypage;
