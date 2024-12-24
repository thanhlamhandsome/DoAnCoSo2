import React from "react";
import styled from "styled-components";

const ButtonLogin = () => {
  return (
    <StyledWrapper>
      <button className="sci-fi-button">LOGIN</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .sci-fi-button {
    color: #ffffff;
    font-size: 22px;
    font-family: "Arial", sans-serif;
    text-align: center;
    padding: 6px 46px;
    background-color: #1a2332;
    border: 2px solid #00d4ff;
    border-radius: 10px;
    position: absolute;

    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.7), 0 0 20px rgba(0, 212, 255, 0.5),
      inset 0 0 15px rgba(0, 212, 255, 0.7);
    transition: all 0.3s ease;
  }
  .sci-fi-button:active {
    box-shadow: 0 0 5px rgba(0, 212, 255, 0.7), 0 0 10px rgba(0, 212, 255, 0.5),
      inset 0 0 15px rgba(0, 212, 255, 0.7);
    scale: 0.9;
  }

  .sci-fi-button::before,
  .sci-fi-button::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid #00d4ff;
    border-radius: 10px;
    box-sizing: border-box;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  .sci-fi-button::before {
    top: -8px;
    left: -8px;
    right: 8px;
    bottom: 8px;
  }

  .sci-fi-button::after {
    top: 8px;
    left: 8px;
    right: -8px;
    bottom: -8px;
  }

  .sci-fi-button:hover::before,
  .sci-fi-button:hover::after {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
  }
`;

export default ButtonLogin;
