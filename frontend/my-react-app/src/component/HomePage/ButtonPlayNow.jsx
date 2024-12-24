import React from 'react';
import styled from 'styled-components';

const ButtonPlayNow = () => {
  return (
    <StyledWrapper>
      <button  id="btn">Play Now </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  
  button {
    position : absolute;
    bottom:10px; 
    
    left:15%; 
    padding: 3px 40px;
    text-transform: uppercase;
    border-radius: 8px;
    font-size: 17px;
    font-weight: 500;
    color: #ffffff80;
    text-shadow: none;
    background: transparent;
    cursor: pointer;
    box-shadow: transparent;
    border: 1px solid #ffffff80;
    transition: 0.5s ease;
    user-select: none;
  }

  #btn:hover,
  :focus {

    color: #ffffff;
    background: #008cff;
    border: 1px solid #008cff;
    text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;
    box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff,
      0 0 100px #008cff;
  }`;

export default ButtonPlayNow;
