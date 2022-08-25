import styled from '@emotion/styled';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultTheme from '../../styles/theme';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  ${defaultTheme.font.nanumGothic};
  background-color: white;
  padding: 20px 0px;
`;

const ButtonNumber = styled.button`
  display: flex;
  border: none;
  background-color: white;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeMedium};
  margin: 10px;
`;

export function PageButton() {
  return (
    <Container>
      <FontAwesomeIcon
        icon={faAngleLeft}
        size={'2x'}
        style={{ marginRight: '10px' }}
      />
      <ButtonNumber>1</ButtonNumber>
      <ButtonNumber>2</ButtonNumber>
      <ButtonNumber>3</ButtonNumber>
      <ButtonNumber>4</ButtonNumber>
      <ButtonNumber>5</ButtonNumber>
      <FontAwesomeIcon
        icon={faAngleRight}
        size={'2x'}
        style={{ marginLeft: '10px' }}
      />
    </Container>
  );
}
