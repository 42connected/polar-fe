import styled from '@emotion/styled';
import axios from 'axios';
import defaultTheme from '../../styles/theme';
import singupImage from '../../assets/signup/signup.png';
import AuthStore from '../../states/auth/AuthStore';

// const UserMainImg = styled.img.attrs({
//   src: `${singupImage}`,
// })`
// 	생략...
// `;

export const Containers = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  gird-gap: 2000px;
`;

export const TopLetter = styled.h1`
  ${defaultTheme.font.sebangGothic}
  ${defaultTheme.fontFrame.titleMedium};
  font-family: ${defaultTheme.font.sebangGothic};
  display: flex;
  justify-content: center;
  padding-bottom: 20p;
  border-bottom: 0.5px solid;
`;

export const H2 = styled.h2`
  font-size: ${defaultTheme.fontFrame.titleSmall};
  font: ${defaultTheme.font.sebangGothic};
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  margin-left: 70px;
  width: 138.19px;
  height: 39.11px;
  background: ${defaultTheme.fontColor.blueColor};
  color: WHITE;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 27px;
  border-radius: 20px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Wrapper = styled.section`
  border: 5px solid purple;
`;

const Right = styled.main``;

const SingupImg = styled.img`
  width: 35rem;
  height: 18.5rem;
`;

export const NameInput = styled.input`
  width: 27rem;b
  height: 4rem;
  border-radius: 20px;
  align: center;
  margin-bottom: 10px;
`;

// onInputChange = event => {
//   this.setState({ input: event.target.value });
// };

async function onButtonSubmit() {
  try {
    axios.defaults.headers.common[
      'Authorization'
    ] = `bearer ${AuthStore.getAccessToken()}`;

    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/cadets/join`,
      {
        name: '강주현',
      },
    );
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

const SignUpCadet = () => {
  return (
    <div>
      <Containers>
        <div>
          <TopLetter>필수 정보 입력</TopLetter>
          <Right>
            <SingupImg src={singupImage} alt="singup-image" />
          </Right>
          <H2>본인 이름</H2>
          <NameInput></NameInput>
          <Button onClick={onButtonSubmit}>제출</Button>
        </div>
      </Containers>
    </div>
  );
};

export default SignUpCadet;
