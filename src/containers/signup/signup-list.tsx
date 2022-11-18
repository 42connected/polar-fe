import styled from '@emotion/styled';
import addButtonImage from '@/assets/signup/addButton.png';

const AddButtonImage = styled.img`
  width: 1.8rem;
  height: 1.6rem;
  cursor: pointer;
  margin-top: 1.5rem;
`;

function GetColumns() {
  return (
    <>
      <AddButtonImage
        src={addButtonImage}
        alt="add-button-image"
        style={{ paddingLeft: '30rem' }}
      />
    </>
  );
}
