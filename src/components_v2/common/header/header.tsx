import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import defaultTheme from '@/styles/themeV2';
import Navigation from './navigation';
import logo from '../../../assets/logos/logo3.png';

const Container = styled.header`
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${defaultTheme.shadow.defaultShadow};
`;

const Title = styled.button`
  cursor: pointer;
  padding: 0;
  border: none;
  height: 4rem;
  background-color: transparent;
  font-size: ${defaultTheme.mobileFontSize.sizeLarge};
  font-style: ${defaultTheme.font.sebangGothic};
  color: ${defaultTheme.colors.polarBlue};
  font-weight: ${defaultTheme.fontWeight.weightBold};
`;

const Btn = styled.button`
  border: none;
  padding: 0;
  margin: 0 2%;
  color: black;
  cursor: pointer;
  background-color: transparent;
  width: 2rem;
  height: 2rem;
  font-size: ${defaultTheme.mobileFontSize.sizeMedium};
`;

function Header() {
  const [toggle, setToggle] = useState(false);
  const onClick = () => {
    setToggle(cur => !cur);
  };
  return (
    <Container>
      <Btn onClick={onClick}>
        <FontAwesomeIcon icon={faBars} />
      </Btn>
      {toggle ? <Navigation isLogin={false} toggleNav={onClick} /> : null}
      <Link to="/">
        <Title>
          <img
            src={logo}
            alt="polar-logo"
            style={{
              width: '3.6rem',
              height: '4rem',
            }}
          />
        </Title>
      </Link>
      <Btn>
        <Link
          to="/mentor-list/전체"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>
      </Btn>
    </Container>
  );
}

export default Header;
