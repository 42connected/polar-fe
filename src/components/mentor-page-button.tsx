import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

/* CSS */
/*
.button-17 {
	align-items: center;
	appearance: none;
	background-color: #fff;
	border-radius: 24px;
	border-style: none;
	box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
	box-sizing: border-box;
	color: #3c4043;
	cursor: pointer;
	display: inline-flex;
	fill: currentcolor;
	font-family: "Google Sans",Roboto,Arial,sans-serif;
	font-size: 14px;
	font-weight: 500;
	height: 48px;
	justify-content: center;
	letter-spacing: .25px;
	line-height: normal;
	max-width: 100%;
	overflow: visible;
	padding: 2px 24px;
	position: relative;
	text-align: center;
	text-transform: none;
	transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	width: auto;
	will-change: transform,opacity;
	z-index: 0;
  }
  
  .button-17:hover {
	background: #F6F9FE;
	color: #174ea6;
  }
  
  .button-17:active {
	box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
	outline: none;
  }
  
  .button-17:focus {
	outline: none;
	border: 2px solid #4285f4;
  }
  
  .button-17:not(:disabled) {
	box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }
  
  .button-17:not(:disabled):hover {
	box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
  }
  
  .button-17:not(:disabled):focus {
	box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }
  
  .button-17:not(:disabled):active {
	box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px;
  }
  
  .button-17:disabled {
	box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }
*/

function MentorPageButton() {
  const [color, setColor] = useState('red');

  const Button = styled.button`
    background-color: ${theme.colors.grayTwo};
    border: 0;
    border-radius: 100px;
    cursor: pointer;
    justify-content: center;
    color: ${theme.fontColor.whiteColor};
    width: 11rem;
    padding: 10px 20px;
    text-align: center;
    align-items: center;
    transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms,
      transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
      rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
    &:active {
      background-color: #232b5a;
      box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%),
        0 8px 12px 6px rgb(60 64 67 / 15%);
      outline: none;
    }
  `;
  return (
    <div>
      <Button>엉덩이</Button>
    </div>
  );
}

export default MentorPageButton;
