import React from "react";
import styled, { keyframes } from "styled-components";
import { FaCartPlus } from "react-icons/fa";
import ButtonLetGoPlay from "./ButtonLetGoPlay";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cart-slice";
import { json } from "react-router-dom";
import { uiAction } from "../../store/ui-slice";
const Card = styled.div`
  background-color: #000;
  color: #fff;
  position: relative;
  border-radius: 8px;
  padding: 20px 17px;
  width: 270px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: fill;
  border-radius: 8px;
`;

const Title = styled.h3`
  background: linear-gradient(45deg, #ff6b6b, #f7ff00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.2rem;
  margin: 12px 0;
`;

const Description = styled.p`
  font-size: 12px;
  color: #ccc;
  margin-bottom: 30px;
  margin-top: 8px;
  line-height: 1.4;
  height: 70px;
`;

const Price = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: #f39c12;
  background: linear-gradient(90deg, #fc466b, #3f5efb);
  width: 80px;
  height: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 10px;

  transform: scale(1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const scaleDown = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

const AddToCartButton = styled.button`
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: absolute;
  bottom: 10px;
  right: 10px;

  transition: background 0.3s ease;
  animation: ${(props) => (props.isClicked ? scaleDown : "none")} 0.3s ease;

  &:hover {
    background-color: #f03e3e;
  }
`;
const GameCard = ({ id, image, title, price, description, isPaid }) => {
  const dispatch = useDispatch();

  async function handleAddShopingCart({ id, image, title, price }) {
    dispatch(
      cartAction.addItem({
        id: id,
        image: image,
        name: title,
        price: price,
      })
    );
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/addcart", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ id }),
      });
      const resData = await response.json();
      if (!response.ok) {
      return  dispatch(uiAction.setShowHiddenDiv({status : 'error',message: resData.message}));
      }
  
      return dispatch(uiAction.setShowHiddenDiv({status: 'success',message : resData.message}));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Card>
      <Image
        src={image}
        alt={title}
        onClick={() => {
          if (isPaid === true && price !== 0) {
            dispatch(
              uiAction.setShowHiddenDiv({
                status: "error",
                message: " You need to pay before you buy the game",
              })
            );
          }
        }}
      />
      <Title
        onClick={() => {
          if (isPaid === true && price !== 0) {
            dispatch(
              uiAction.setShowHiddenDiv({
                status: "error",
                message: " You need to pay before you buy the game",
              })
            );
          }
        }}
      >
        {title}
      </Title>
      <Description
        onClick={() => {
          if (isPaid === true && price !== 0) {
            dispatch(
              uiAction.setShowHiddenDiv({
                status: "error",
                message: " You need to pay before you buy the game",
              })
            );
          }
        }}
      >
        {description}
      </Description>
      <Price onClick={
      ()=>{
        if(isPaid === true && price!== 0){
          dispatch(uiAction.setShowHiddenDiv({status: "error",message:" You need to pay before you buy the game"}))
        }
      }
    }>{price}</Price>
      {price !== "Free" ? (
        <AddToCartButton
          onClick={() => handleAddShopingCart({ id, image, title, price })}
        >
          <FaCartPlus />
        </AddToCartButton>
      ) : (
        <div className="absolute right-0 bottom-3 mr-6">
          <ButtonLetGoPlay />
        </div>
      )}
    </Card>
  );
};

export default GameCard;
