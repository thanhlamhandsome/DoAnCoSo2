import React from "react";
import   './Swiper-slide.css'
import styled from "styled-components";
import ImageComponent from "./ImageComponent";
import { Link, useNavigate } from "react-router-dom";

const CardHome = ({game}) => {
  

  const user = JSON.parse(localStorage.getItem('user')); 
  return (
    <Link to={user ? '/store' : '/login' }>
    <StyledWrapper>
      <div className="cardBox"  >
        <div className="card" >
          <div>
           <ImageComponent gameId={game._id} />
          </div>
          <div className="h4">{game.name}</div>
          <div className="content">
            <div className="h3 text-red-500 z-50 text-3xl font-bold mb-6">
              {game.name}
            </div>
            <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#00BFFF] z-40">
              {game.description}
            </p>
          </div>
        </div>
      </div>
    </StyledWrapper>
    </Link>
  );
};

const StyledWrapper = styled.div`
  .cardBox {

    width: 300px;
    height: 350px;
    position: relative;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 10px 0px,
      rgba(0, 0, 0, 0.5) 0px 2px 25px 0px;
  }

  .card {
    position: absolute;
    width: 95%;
    
    height: 95%;
    background: #000814;
    border-radius: 20px;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    color: #ffffff;
    overflow: hidden;
    padding: 20px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.5) 0px 18px 36px -18px inset;
  }

  .card .h4 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 800;
    pointer-events: none;
    opacity: 0.7;
  }

  .card .content .h3 {
    font-size: 25px;
    font-weight: 800;
    margin-bottom: 10px;
    z-index: 10;
  }

  .card .content p {
    font-size: 14px;
    line-height: 1.4em;
  }

  .card .content {
    transform: translateY(100%);
    opacity: 0;
    transition: 0.3s ease-in-out;
  }

  .card:hover .content {
    transform: translateY(0);
    opacity: 1;
  }

  .card:hover .h4 {
    opacity: 0;
  }


  
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default CardHome;
