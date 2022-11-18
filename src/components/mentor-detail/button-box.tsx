import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface ButtonBoxProps {
  items: string[];
  setter: (item: any) => void;
  width?: string;
  height?: string;
  backgroundColor?: string;
}

function ButtonBoxComponent(props: ButtonBoxProps) {
  const handleRemoveTags = (index: number) => {
    const newTags = props.items.filter((tag, i) => i !== index);
    props.setter(newTags);
  };
  return (
    <ButtonBox>
      {props.items?.map((item, index) => (
        <Box
          key={index}
          onClick={() => {
            handleRemoveTags(index);
          }}
          {...props}
        >
          {item.padStart(item.length + 1, '#')}{' '}
          <FontAwesomeIcon icon={faXmark} className="icon" />
        </Box>
      ))}
    </ButtonBox>
  );
}

const ButtonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 1rem;
  text-align: center;
`;

const Box = styled.div<ButtonBoxProps>`
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  color: ${theme.colors.polarSimpleMain};
  ${theme.fontFrame.bodyMiddle};
  background-color: ${props => props.backgroundColor ?? 'none'};
  border: 1px solid ${theme.colors.fontGray};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  .icon {
    margin-left: 0.5rem;
  }
  cursor: pointer;
  :hover {
    background-color: ${theme.colors.grayFive};
  }
`;

export default ButtonBoxComponent;
