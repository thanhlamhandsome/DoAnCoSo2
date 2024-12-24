import React from "react";
import styles from './PurchaseHistory.module.css';  // Import CSS module
import TransactionChild from "./TransactionChild";

const PurchaseHistory = ({transactions}) => {
 console.log(transactions)
  return (
    <>
      <div className={styles.transactionContainer}>
        <h2>Purchase History</h2>
        <div className={styles.transactionList}>
            {transactions.map((transaction)=>{
              return <TransactionChild transaction={transaction} key={transaction._id}></TransactionChild>
            })}
        </div>
      </div>
    </>
  );
};

export default PurchaseHistory;
