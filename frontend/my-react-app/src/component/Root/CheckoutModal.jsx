import { useState } from "react";
import CreditCard from "./CreditCard";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui-slice";
import CheckoutQR from "../../layouts/CheckoutQR";
import CheckoutBalen from "../StorePage/CheckoutBalance";
function CheckoutModal() {
  const [selectedMethod, setSelectedMethod] = useState("CreditCard"); // Phương thức thanh toán hiện tại
  const [isModalOpen, setIsModalOpen] = useState(true); // Trạng thái để mở/tắt modal
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(uiAction.hideShowCheckoutModal());
    dispatch(uiAction.hideShowItemShoppingLayout());
  };

  if (!isModalOpen) return null; // Không hiển thị modal khi trạng thái đóng
  // Không hiển thị modal khi trạng thái đóng

  return (
    <div
      className="fixed z-10 w-11/12 max-w-md mx-auto rounded-2xl py-8 px-8 shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      style={{
        background: "linear-gradient(135deg, #fef9c3, #facc15)", // Gradient màu nền
      }}
    >
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 bg-red-500 text-white text-lg rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="font-bold text-2xl text-gray-800 mb-6 text-center">
        Choose a Payment Method
      </h2>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mb-6 w-full">
        <button
          onClick={() => setSelectedMethod("CreditCard")}
          className={`py-3 px-6 rounded-lg text-white font-medium transition ${
            selectedMethod === "CreditCard"
              ? "bg-blue-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Credit Card
        </button>

        <button
          onClick={() => setSelectedMethod("BankTransfer")}
          className={`py-3 px-6 rounded-lg text-white font-medium transition ${
            selectedMethod === "BankTransfer"
              ? "bg-green-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Bank Transfer
        </button>

        <button
          onClick={() => setSelectedMethod("AccountBalance")}
          className={`py-3 px-6 rounded-lg text-white font-medium transition ${
            selectedMethod === "AccountBalance"
              ? "bg-yellow-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          Account Balance
        </button>
      </div>

      {/* Content */}
      <div className="w-full">
        {selectedMethod === "CreditCard" && (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4 text-white">
              Credit Card Payment
            </h3>
            <div className="mb-6">
              <CreditCard />
            </div>
          </div>
        )}

        {selectedMethod === "BankTransfer" && <CheckoutQR />}

        {selectedMethod === "AccountBalance" && <CheckoutBalen />}
      </div>
    </div>
  );
}
async function processCreditCardPayment({
  userNameCart,
  cardNumber,
  items,
  totalPrice,
}) {
  const token = localStorage.getItem("token");
  const parsedTotalPrice = JSON.parse(totalPrice);
  const parsedItems = JSON.parse(items);
  const itemsId = parsedItems.map((item) => {
    return item.id;
  });

  const transaction = {
    userNameCart: userNameCart,
    cardNumber: cardNumber,
    gameId: itemsId,
    totalPrice: parsedTotalPrice,
    paymentMethod: "credit card",
  };

  const response = await fetch("http://localhost:3000/transaction", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(transaction),
  });
  const resData = await response.json();
  if (!response.ok) {
    return { message: resData.message, status: "error" };
  }
  return { message: resData.message, status: "succces" };
}

async function processQRPayment(formData) {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/transaction", {
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });
  const resData = await response.json();
  if (!response.ok) {
    return { message: resData.message, status: "error" };
  }
  return { message: resData.message, status: "succces" };
}
async function processBalancePayment({ items, totalPrice }) {
  const token = localStorage.getItem("token");
  const parsedTotalPrice = JSON.parse(totalPrice);
  const parsedItems = JSON.parse(items);
  const itemsId = parsedItems.map((item) => {
    return item.id;
  });

  const transaction = {
    gameId: itemsId,
    totalPrice: parsedTotalPrice,
    paymentMethod: "balance",
  };

  const response = await fetch("http://localhost:3000/transaction", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(transaction),
  });
  const resData = await response.json();
  if (!response.ok) {
    return { message: resData.message, status: "error" };
  }
  return { message: resData.message, status: "succces" };
}
export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); 
  console.log(data)
  const checkoutBalance = formData.get("checkoutBalance");
  const image = formData.get("image");
  if (image) {
    const paymentResult = await processQRPayment(formData);
    return paymentResult;
  } else if (checkoutBalance) {
    const items = formData.get("items");
    const totalPrice = formData.get("totalPrice");
    const paymentResult = await processBalancePayment({
      items,
      totalPrice,
    });
    return paymentResult;
  } else {
    const userNameCart = formData.get("cardName");
    const items = formData.get("items");
    const totalPrice = formData.get("totalPrice");
    const cardNumber = formData.get("cardNumber");
    const paymentResult = await processCreditCardPayment({
      userNameCart,
      cardNumber,
      items,
      totalPrice,
    });

    return paymentResult;
  }
}

export default CheckoutModal;
