import React, { useState } from "react";
import { json } from "react-router-dom";

const TransactionChild = ({ transaction }) => {
  const [currentTransaction, setCurrentTransaction] = useState(transaction);

  const renderPaymentDetails = () => {
    if (currentTransaction.paymentMethod === "Credit Card") {
      return (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700">
            <span className="font-bold">Cardholder Name:</span>{" "}
            {currentTransaction.userNameCart}
          </p>
          <p className="text-sm font-semibold text-gray-700">
            <span className="font-bold">Card Number:</span> **** **** ****{" "}
            {currentTransaction.cardNumber.slice(-4)}
          </p>
        </div>
      );
    } else if (currentTransaction.paymentMethod === "Wire Transfer") {
      return (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700">
            <span className="font-bold">Transfer Image:</span>
          </p>
          <img
            src={currentTransaction.transferImage}
            alt="Transfer"
            className="mt-2 w-full h-auto max-w-xs rounded-lg shadow-md"
          />
        </div>
      );
    }
  };

  const renderStatus = () => {
    let statusClass = "";
    let statusText = "";

    switch (currentTransaction.status) {
      case "success":
        statusClass = "bg-green-200 text-green-700";
        statusText = "Success";
        break;
      case "failed":
        statusClass = "bg-red-200 text-red-700";
        statusText = "Failed";
        break;
      default:
        statusClass = "bg-yellow-200 text-yellow-700";
        statusText = "Pending";
    }

    return (
      <span
        className={`px-4 py-2 text-sm font-semibold rounded-full ${statusClass}`}
      >
        {statusText}
      </span>
    );
  };

  async function succesStatus(id) {
    const response = await fetch("http://localhost:3000/transaction", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, status: "success" }),
    });

    if (!response.ok) {
      throw json({ message: "Update failed" });
    }

    const resData = await response.json();

    setCurrentTransaction((prevTransaction) => ({
      ...prevTransaction,
      status: "success",
    }));

    return resData;
  }

  async function changeStatus(id, newStatus) {
    const response = await fetch("http://localhost:3000/transaction", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, status: newStatus }),
    });

    if (!response.ok) {
      throw json({ message: "Update failed" });
    }

    const resData = await response.json();

    setCurrentTransaction((prevTransaction) => ({
      ...prevTransaction,
      status: newStatus,
    }));

    return resData;
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto space-y-8 mt-10">
      <h2 className="text-3xl font-semibold text-gray-800">
        Transaction Details
      </h2>

      <div className="flex justify-between items-center">
        <p className="text-lg text-gray-700">
          <span className="font-bold">Transaction ID:</span>{" "}
          {currentTransaction._id}
        </p>
        <p className="text-lg text-gray-700">{renderStatus()}</p>
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => succesStatus(currentTransaction._id)}
        >
          Mark as Success
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => changeStatus(currentTransaction._id, "failed")}
        >
          Mark as Failed
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800">
          Games Purchased:
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          {currentTransaction.games.map((game, index) => (
            <li key={index} className="text-sm text-gray-700">
              {console.log(game)}
              {game?.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-800">
          <span className="font-bold">Total Price:</span> ${" "}
          {currentTransaction.totalPrice.toFixed(2)}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Payment Method:</h3>
        <p className="text-sm font-semibold text-gray-700">
          {currentTransaction.paymentMethod}
        </p>
        {renderPaymentDetails()}
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-700">
          <span className="font-bold">User ID:</span> {currentTransaction.userId}
        </p>
        <p className="text-sm font-semibold text-gray-700">
          <span className="font-bold">Transaction Date:</span>{" "}
          {new Date(currentTransaction.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TransactionChild;
