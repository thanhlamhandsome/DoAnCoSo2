import styles from "./PurchaseHistory.module.css"; // Import CSS module
function TransactionChild({ transaction }) {

  return (
    <div key={transaction._id} className={styles.transactionItem}>
      {/* Transaction ID */}
      <div className={styles.transactionRow}>
        <strong>Transaction ID:</strong>
        <span>{transaction._id}</span>
      </div>

      <div className={styles.transactionHeader}>
        <p className={styles.transactionDate}>
          <strong>Transaction Date:</strong>{" "}
          {new Date(transaction. createdAt).toLocaleString()}
        </p>
      </div>
      <div className={styles.transactionDetails}>
        <div className={styles.transactionRow}>
          <strong>Status:</strong>
          <span className={`${styles.status} ${styles[transaction.status]}`}>
            {transaction.status}
          </span>
        </div>
        <div className={styles.transactionRow}>
          <strong>Payment Method:</strong>
          <span>{transaction.paymentMethod}</span>
        </div>
        <div className={styles.transactionRow}>
          <strong>Total Price:</strong>
          <span className={styles.price}>${transaction.totalPrice}</span>
        </div>
        <div className={styles.transactionRow}>
          <strong>Games:</strong>
          <span>{transaction.gameId.map((game) => game.name).join(", ")}</span>
        </div>
      </div>
    </div>
  );
}
export default TransactionChild;
