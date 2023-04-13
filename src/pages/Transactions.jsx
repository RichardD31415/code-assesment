import "../styles/transactions.module.css";

function Transactions({ transactions }) {
  return (
    <>
      {transactions.map((transaction, index) => {
        return (
          <div key={index}>
            <div>Date: {transaction.date}</div>
            <div>Ammount: {transaction.amount}</div>
          </div>
        );
      })}
    </>
  );
}

export default Transactions;
