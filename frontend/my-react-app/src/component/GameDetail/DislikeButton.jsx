import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { uiAction } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';
const DislikeButton = ({dislike:initialDislike,gameId}) => {
  const dispatch = useDispatch()
  const [isDisliked, setIsDisliked] = useState(() => { 
    const dislikes = JSON.parse(localStorage.getItem('dislikes') || '{}');
    return dislikes[gameId] || false;
  });
  const [dislikeCount, setDislikeCount] = useState(initialDislike);

  const handleDislikeButton = async () => {
    const dislikes = JSON.parse(localStorage.getItem('dislikes') || '{}');
    const newState = !isDisliked
    dislikes[gameId] = newState;
   
    try {
      const url = `http://localhost:3000/games/${gameId}/${newState ? 'dislike' : 'canceldislike'}`;
      const response = await fetch(url, { method: 'PATCH' });

      if (response.ok) {
        localStorage.setItem('dislikes', JSON.stringify(dislikes));
        setIsDisliked(newState);
        setDislikeCount((prev) => prev + (newState ? 1 : -1));
        dispatch(uiAction.setShowHiddenDiv({status:'success',message: 'Thank you for your feedback'}))
      } else {
        dispatch(uiAction.setShowHiddenDiv({ status: 'error', message: 'API Call Failed' }));
        console.error('API Error:', response.status);
      }
    } catch (error) {
      console.error('API Call Failed:', error);
    }
  }

  return (
    <StyledDislike>
      <div className="dislike-button">
        <input className="dislike-on" id="dislikeheart" type="checkbox" checked={isDisliked} onChange={handleDislikeButton} />
        <label className="dislike" htmlFor="dislikeheart">
          <svg className="dislike-icon" fillRule="nonzero" viewBox="0 0 32 32  " xmlns="http://www.w3.org/2000/svg">
          <path d="M2.156,14.901l2.489-8.725C5.012,4.895,6.197,4,7.528,4h13.473C21.554,4,22,4.448,22,5v14  c0,0.215-0.068,0.425-0.197,0.597l-5.392,7.24C15.813,27.586,14.951,28,14.027,28c-1.669,0-3.026-1.357-3.026-3.026V20H5.999  c-1.265,0-2.427-0.579-3.188-1.589C2.047,17.399,1.809,16.12,2.156,14.901z" id="XMLID_259_" /><path d="M25.001,20h4C29.554,20,30,19.552,30,19V5c0-0.552-0.446-1-0.999-1h-4c-0.553,0-1,0.448-1,1v14  C24.001,19.552,24.448,20,25.001,20z M27.001,6.5c0.828,0,1.5,0.672,1.5,1.5c0,0.828-0.672,1.5-1.5,1.5c-0.828,0-1.5-0.672-1.5-1.5  C25.501,7.172,26.173,6.5,27.001,6.5z" id="XMLID_260_" />
          </svg>
          <span className="dislike-text">DisLike</span>
        </label>
        <span className="dislike-count one">{dislikeCount}</span>
        <span className="dislike-count two">{dislikeCount}</span>
      </div>
    </StyledDislike>
  );
}

const StyledDislike = styled.div`
  #dislikeheart {
    display: none;
  }

  .dislike-button {
    position: relative;
    cursor: pointer;
    display: flex;
    height: 48px;
    width: 136px;
    border-radius: 16px;
    border: none;
    background-color: #1d1d1d;
    overflow: hidden;
    box-shadow:
      inset -2px -2px 5px rgba(255, 255, 255, 0.2),
      inset 2px 2px 5px rgba(0, 0, 0, 0.1),
      4px 4px 10px rgba(0, 0, 0, 0.4),
      -2px -2px 8px rgba(255, 255, 255, 0.1);
  }

  .dislike {
    width: 70%;
    height: 100%;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: space-evenly;
  }

  .dislike-icon {
    fill: #505050;
    height: 28px;
    width: 28px;
  }

  .dislike-text {
    color: #fcfcfc;
    font-size: 16px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .dislike-count {
    position: absolute;
    right: 0;
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #717070;
    font-size: 16px;
    border-left: 2px solid #4e4e4e;
    transition: all 0.5s ease-out;
  }

  .dislike-count.two {
    transform: translateY(40px);
  }

  .dislike-on:checked ~ .dislike .dislike-icon {
    fill: #fc4e4e;
    animation: enlarge 0.2s ease-out 1;
    transition: all 0.2s ease-out;
  }

  .dislike-on:checked ~ .dislike-count.two {
    transform: translateX(0);
    color: #fcfcfc;
  }

  .dislike-on:checked ~ .dislike-count.one {
    transform: translateY(-40px);
  }

  @keyframes enlarge {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1.2);
    }
  }`;

export default DislikeButton;
